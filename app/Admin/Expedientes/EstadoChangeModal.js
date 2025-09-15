"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, AlertCircle } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/firebase/firebaseClient";

const ESTADOS_EXPEDIENTE = {
  PENDIENTE_FIRMA: {
    label: "Pendiente de Firma",
    color: "bg-orange-100 text-orange-800",
  },
  EN_REVISION: { label: "En Revisión", color: "bg-blue-100 text-blue-800" },
  FIRMADO: { label: "Firmado", color: "bg-green-100 text-green-800" },
  RECHAZADO: { label: "Rechazado", color: "bg-red-100 text-red-800" },
  ARCHIVADO: { label: "Archivado", color: "bg-gray-100 text-gray-800" },
};

export default function EstadoChangeModal({ isOpen, onClose, expediente }) {
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [comentario, setComentario] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nuevoEstado) {
      toast.error("Por favor selecciona un nuevo estado");
      return;
    }

    if (nuevoEstado === expediente?.estado) {
      toast.error("El estado seleccionado es el mismo que el actual");
      return;
    }

    setUpdating(true);

    try {
      const expedienteRef = doc(db, "expedientes", expediente.id);

      const updateData = {
        estado: nuevoEstado,
        fechaActualizacion: new Date(),
        historialEstados: [
          ...(expediente.historialEstados || []),
          {
            estadoAnterior: expediente.estado,
            estadoNuevo: nuevoEstado,
            fecha: new Date(),
            comentario: comentario.trim() || "Sin comentarios",
            usuario: "Sistema", // Aquí podrías poner el usuario actual
          },
        ],
      };

      // Actualizar información específica del proceso de firma según el estado
      if (nuevoEstado === "FIRMADO") {
        updateData.procesoFirma = {
          ...expediente.procesoFirma,
          estadoGeneral: "COMPLETADO",
          fechaCompletado: new Date(),
          firmasCompletadas: expediente.procesoFirma?.documentosPendientes || 0,
        };
      } else if (nuevoEstado === "RECHAZADO") {
        updateData.procesoFirma = {
          ...expediente.procesoFirma,
          estadoGeneral: "RECHAZADO",
          fechaRechazo: new Date(),
          motivoRechazo: comentario.trim() || "Sin motivo especificado",
        };
      }

      await updateDoc(expedienteRef, updateData);

      toast.success(
        `Estado del expediente actualizado a: ${ESTADOS_EXPEDIENTE[nuevoEstado].label}`
      );

      // Limpiar formulario
      setNuevoEstado("");
      setComentario("");
      onClose();
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      toast.error("Error al actualizar el estado del expediente");
    } finally {
      setUpdating(false);
    }
  };

  const getEstadosDisponibles = () => {
    if (!expediente?.estado) return Object.keys(ESTADOS_EXPEDIENTE);

    const estadoActual = expediente.estado;

    // Definir transiciones válidas según el flujo de firma
    const transicionesValidas = {
      PENDIENTE_FIRMA: ["EN_REVISION", "RECHAZADO", "ARCHIVADO"],
      EN_REVISION: ["FIRMADO", "PENDIENTE_FIRMA", "RECHAZADO", "ARCHIVADO"],
      FIRMADO: ["ARCHIVADO"],
      RECHAZADO: ["PENDIENTE_FIRMA", "ARCHIVADO"],
      ARCHIVADO: ["PENDIENTE_FIRMA", "EN_REVISION"],
    };

    return transicionesValidas[estadoActual] || Object.keys(ESTADOS_EXPEDIENTE);
  };

  const estadosDisponibles = getEstadosDisponibles();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Cambiar Estado del Expediente
          </DialogTitle>
        </DialogHeader>

        {expediente && (
          <div className="space-y-4">
            {/* Información del expediente */}
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">
                  {expediente.numeroExpediente || "N/A"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {expediente.materia || "Sin materia"}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Estado actual:
                </span>
                <Badge
                  className={
                    ESTADOS_EXPEDIENTE[expediente.estado]?.color ||
                    "bg-gray-100 text-gray-800"
                  }
                >
                  {ESTADOS_EXPEDIENTE[expediente.estado]?.label ||
                    expediente.estado}
                </Badge>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selector de nuevo estado */}
              <div className="space-y-2">
                <Label htmlFor="nuevoEstado">Nuevo Estado *</Label>
                <Select value={nuevoEstado} onValueChange={setNuevoEstado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar nuevo estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estadosDisponibles.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              ESTADOS_EXPEDIENTE[estado]?.color?.split(
                                " "
                              )[0] || "bg-gray-500"
                            }`}
                          />
                          {ESTADOS_EXPEDIENTE[estado]?.label || estado}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Comentario */}
              <div className="space-y-2">
                <Label htmlFor="comentario">
                  Comentario{" "}
                  {nuevoEstado === "RECHAZADO" && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Textarea
                  id="comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder={
                    nuevoEstado === "RECHAZADO"
                      ? "Especifica el motivo del rechazo..."
                      : "Comentario opcional sobre el cambio de estado..."
                  }
                  rows={3}
                  required={nuevoEstado === "RECHAZADO"}
                />
              </div>

              {/* Advertencia para estados críticos */}
              {(nuevoEstado === "FIRMADO" || nuevoEstado === "ARCHIVADO") && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">
                      {nuevoEstado === "FIRMADO"
                        ? "Confirmar Firma Completada"
                        : "Confirmar Archivado"}
                    </p>
                    <p className="text-yellow-700 text-xs mt-1">
                      {nuevoEstado === "FIRMADO"
                        ? "Este cambio marcará el expediente como completamente firmado."
                        : "Este expediente será archivado y no aparecerá en las listas activas."}
                    </p>
                  </div>
                </div>
              )}

              {/* Botones */}
              <div className="flex justify-end space-x-2 pt-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={updating || !nuevoEstado}
                  className="gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  {updating ? "Actualizando..." : "Cambiar Estado"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
