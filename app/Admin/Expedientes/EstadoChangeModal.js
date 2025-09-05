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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/firebase/firebaseClient";

const ESTADOS_EXPEDIENTE = {
  ACTIVO: {
    label: "Activo",
    color: "bg-green-100 text-green-800",
    description: "Expediente en curso normal",
  },
  EN_PROCESO: {
    label: "En Proceso",
    color: "bg-blue-100 text-blue-800",
    description: "Expediente siendo trabajado activamente",
  },
  SUSPENDIDO: {
    label: "Suspendido",
    color: "bg-yellow-100 text-yellow-800",
    description: "Expediente temporalmente pausado",
  },
  CERRADO: {
    label: "Cerrado",
    color: "bg-gray-100 text-gray-800",
    description: "Expediente finalizado exitosamente",
  },
  ARCHIVADO: {
    label: "Archivado",
    color: "bg-purple-100 text-purple-800",
    description: "Expediente archivado para referencia",
  },
};

export default function EstadoChangeModal({ isOpen, onClose, expediente }) {
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeEstado = async () => {
    if (!nuevoEstado || nuevoEstado === expediente?.estado) {
      toast.error("Debe seleccionar un estado diferente");
      return;
    }

    setLoading(true);

    try {
      const actividad = {
        tipo: "CAMBIO_ESTADO",
        estadoAnterior: expediente.estado,
        estadoNuevo: nuevoEstado,
        observaciones: observaciones || "",
        fecha: new Date(),
        usuario: "Sistema", // En una implementación real, sería el usuario actual
      };

      await updateDoc(doc(db, "expedientes", `${expediente.id}`), {
        estado: nuevoEstado,
        fechaUltimaModificacion: new Date(),
        historialActividades: arrayUnion(actividad),
      });

      toast.success(
        `Estado cambiado a ${ESTADOS_EXPEDIENTE[nuevoEstado].label}`
      );
      onClose();
      setNuevoEstado("");
      setObservaciones("");
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      toast.error("Error al cambiar el estado del expediente");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cambiar Estado del Expediente</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información actual */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">
              Expediente: {expediente?.numeroExpediente}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {expediente?.materia}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm">Estado actual:</span>
              <Badge className={ESTADOS_EXPEDIENTE[expediente?.estado]?.color}>
                {ESTADOS_EXPEDIENTE[expediente?.estado]?.label}
              </Badge>
            </div>
          </div>

          {/* Nuevo estado */}
          <div className="space-y-3">
            <Label>Nuevo Estado *</Label>
            <Select value={nuevoEstado} onValueChange={setNuevoEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar nuevo estado" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ESTADOS_EXPEDIENTE).map(([key, value]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    disabled={key === expediente?.estado}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          value.color.split(" ")[0]
                        }`}
                      />
                      <div>
                        <div className="font-medium">{value.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {value.description}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Observaciones */}
          <div className="space-y-3">
            <Label>Observaciones</Label>
            <Textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Motivo del cambio de estado, observaciones adicionales..."
              rows={3}
            />
          </div>

          {/* Historial reciente */}
          {expediente?.historialActividades &&
            expediente.historialActividades.length > 0 && (
              <div className="space-y-3">
                <Label>Historial Reciente</Label>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {expediente.historialActividades
                    .slice(-3)
                    .reverse()
                    .map((actividad, index) => (
                      <div
                        key={index}
                        className="text-sm p-2 bg-muted/30 rounded"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-3 w-3" />
                          <span className="font-medium">
                            {actividad.tipo.replace("_", " ")}
                          </span>
                          <span className="text-muted-foreground">
                            {formatDate(actividad.fecha)}
                          </span>
                        </div>
                        {actividad.tipo === "CAMBIO_ESTADO" && (
                          <p className="text-muted-foreground">
                            {
                              ESTADOS_EXPEDIENTE[actividad.estadoAnterior]
                                ?.label
                            }{" "}
                            → {ESTADOS_EXPEDIENTE[actividad.estadoNuevo]?.label}
                          </p>
                        )}
                        {actividad.observaciones && (
                          <p className="text-muted-foreground italic">
                            &ldquo;{actividad.observaciones}&ldquo;
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

          {/* Botones */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleChangeEstado}
              disabled={loading || !nuevoEstado}
            >
              {loading ? "Cambiando..." : "Cambiar Estado"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
