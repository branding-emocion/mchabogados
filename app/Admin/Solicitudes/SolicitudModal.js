"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Save, X } from "lucide-react";
import {
  createSolicitud,
  updateSolicitud,
  sendNotificationToAdmins,
} from "./services";
import { toast } from "sonner";
import FileUpload from "./FileUpload";
import useAuthState from "@/lib/useAuthState";
import { auth } from "@/firebase/firebaseClient";

const TIPOS_DOCUMENTO = [
  { value: "carnet_extranjeria", label: "Carnet de extranjería" },
  { value: "dni", label: "DNI" },
  { value: "pasaporte", label: "Pasaporte" },
  { value: "ruc", label: "RUC" },
];

const ESTADOS = [
  { value: "Pendiente", label: "Pendiente" },
  { value: "En revisión", label: "En revisión" },
  { value: "Aprobada", label: "Aprobada" },
  { value: "Rechazada", label: "Rechazada" },
];

export function SolicitudModal({ isOpen, onClose, solicitud = null, onSave }) {
  const [{ user, claims }, loading, error] = useAuthState(auth);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    tipoServicio: "Arbitraje",
    materia: "",
    descripcion: "",
    documentos: [],
    anexos: [],
    partesContratantes: [
      {
        nombre: "",
        tipoDocumento: "",
        direccion: "",
      },
    ],
    estado: "Pendiente",
    comentarios: "",
  });

  const isAdmin = claims?.role === "superAdmin";

  useEffect(() => {
    if (solicitud) {
      setFormData({
        tipoServicio: solicitud.tipoServicio || "Arbitraje",
        materia: solicitud.materia || "",
        descripcion: solicitud.descripcion || "",
        documentos: solicitud.documentos || [],
        anexos: solicitud.anexos || [],
        partesContratantes: solicitud.partesContratantes || [
          { nombre: "", tipoDocumento: "", direccion: "" },
        ],
        estado: solicitud.estado || "Pendiente",
        comentarios: solicitud.comentarios || "",
      });
    } else {
      // Reset form for new solicitud
      setFormData({
        tipoServicio: "Arbitraje",
        materia: "",
        descripcion: "",
        documentos: [],
        anexos: [],
        partesContratantes: [{ nombre: "", tipoDocumento: "", direccion: "" }],
        estado: "Pendiente",
        comentarios: "",
      });
    }
  }, [solicitud, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleParteChange = (index, field, value) => {
    const newPartes = [...formData.partesContratantes];
    newPartes[index] = {
      ...newPartes[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      partesContratantes: newPartes,
    }));
  };

  const addParte = () => {
    setFormData((prev) => ({
      ...prev,
      partesContratantes: [
        ...prev.partesContratantes,
        { nombre: "", tipoDocumento: "", direccion: "" },
      ],
    }));
  };

  const removeParte = (index) => {
    if (formData.partesContratantes.length > 1) {
      const newPartes = formData.partesContratantes.filter(
        (_, i) => i !== index
      );
      setFormData((prev) => ({
        ...prev,
        partesContratantes: newPartes,
      }));
    }
  };

  const validateForm = () => {
    if (!formData.materia.trim()) {
      toast.error("La materia es obligatoria");
      return false;
    }

    for (let i = 0; i < formData.partesContratantes.length; i++) {
      const parte = formData.partesContratantes[i];
      if (
        !parte.nombre.trim() ||
        !parte.tipoDocumento ||
        !parte.direccion.trim()
      ) {
        toast.error(
          `Complete todos los campos de la parte/contratante ${i + 1}`
        );
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      if (solicitud) {
        // Update existing solicitud
        await updateSolicitud(solicitud.id, formData);
        toast.success("Solicitud actualizada correctamente");
      } else {
        const solicitudId = await createSolicitud(formData, user.uid);

        await sendNotificationToAdmins(
          `Nueva solicitud creada: ${formData.materia}`,
          solicitudId
        );

        toast.success("Solicitud creada correctamente");
      }

      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving solicitud:", error);
      toast.error("Error al guardar la solicitud");
    } finally {
      setSaving(false);
    }
  };

  // Show loading if auth is not ready
  if (loading || !user) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {solicitud ? "Editar Solicitud" : "Nueva Solicitud"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoServicio">Tipo de Servicio</Label>
                  <Select
                    value={formData.tipoServicio}
                    onValueChange={(value) =>
                      handleInputChange("tipoServicio", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arbitraje">Arbitraje</SelectItem>
                      <SelectItem value="ArbitrajeEmergencia">
                        Arbitraje de Emergencia
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="materia">Materia *</Label>
                  <Input
                    id="materia"
                    value={formData.materia}
                    onChange={(e) =>
                      handleInputChange("materia", e.target.value)
                    }
                    placeholder="Ingrese la materia"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) =>
                    handleInputChange("descripcion", e.target.value)
                  }
                  placeholder="Descripción opcional de la solicitud"
                  rows={3}
                />
              </div>

              {/* Admin only fields */}
              {isAdmin && (
                <>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <Select
                        value={formData.estado}
                        onValueChange={(value) =>
                          handleInputChange("estado", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ESTADOS.map((estado) => (
                            <SelectItem key={estado.value} value={estado.value}>
                              {estado.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comentarios">Comentarios</Label>
                    <Textarea
                      id="comentarios"
                      value={formData.comentarios}
                      onChange={(e) =>
                        handleInputChange("comentarios", e.target.value)
                      }
                      placeholder="Comentarios del administrador"
                      rows={3}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documentos</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  files={formData.documentos}
                  onFilesChange={(files) =>
                    handleInputChange("documentos", files)
                  }
                  maxFiles={5}
                  label="Documentos PDF"
                  folder="documentos"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Anexos</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  files={formData.anexos}
                  onFilesChange={(files) => handleInputChange("anexos", files)}
                  maxFiles={5}
                  label="Anexos PDF"
                  folder="anexos"
                />
              </CardContent>
            </Card>
          </div>

          {/* Partes o Contratantes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg uppercase">
                  Partes Procesales
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addParte}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                  Agregar nuevo
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.partesContratantes.map((parte, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Demanante: {index + 1}</h4>
                    {formData.partesContratantes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeParte(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="estado">Tipo </Label>
                      <Select
                        value={formData.estado}
                        onValueChange={(value) =>
                          handleInputChange("estado", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"Demandante"}>
                            Demandante
                          </SelectItem>
                          <SelectItem value={"Demandado"}>Demandado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Nombre *</Label>
                      <Input
                        value={parte.nombre}
                        onChange={(e) =>
                          handleParteChange(index, "nombre", e.target.value)
                        }
                        placeholder="Nombre completo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Correo electrónico*</Label>
                      <Input
                        value={parte.Correo}
                        onChange={(e) =>
                          handleParteChange(index, "Correo", e.target.value)
                        }
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tipo de documento *</Label>
                      <Select
                        value={parte.tipoDocumento}
                        onValueChange={(value) =>
                          handleParteChange(index, "tipoDocumento", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIPOS_DOCUMENTO.map((tipo) => (
                            <SelectItem key={tipo.value} value={tipo.value}>
                              {tipo.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Dirección *</Label>
                      <Input
                        value={parte.direccion}
                        onChange={(e) =>
                          handleParteChange(index, "direccion", e.target.value)
                        }
                        placeholder="Dirección completa"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={saving}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary hover:bg-primary/90"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {solicitud ? "Actualizar" : "Crear"} Solicitud
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
