"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Upload, X } from "lucide-react";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { toast } from "sonner";
import { storage } from "@/firebase/firebaseClient";

export default function ExpedienteModal({
  open,
  onOpenChange,
  expediente,
  onSave,
}) {
  const [formData, setFormData] = useState({
    tipoServicio: "Arbitraje",
    fechaPresentacion: "",
    horaPresentacion: "",
    numeroExpediente: "",
    tribunalArbitral: "",
    tribunalUnico: "",
    secretario: "",
    correos: [""],
    archivos: [],
  });
  const [loading, setLoading] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);

  // Resetear formulario cuando se abre/cierra el modal o cambia el expediente
  useEffect(() => {
    if (open) {
      if (expediente) {
        setFormData({
          tipoServicio: expediente.tipoServicio || "Arbitraje",
          fechaPresentacion: expediente.fechaPresentacion || "",
          horaPresentacion: expediente.horaPresentacion || "",
          numeroExpediente: expediente.numeroExpediente || "",
          tribunalArbitral: expediente.tribunalArbitral || "",
          tribunalUnico: expediente.tribunalUnico || "",
          secretario: expediente.secretario || "",
          secretarioGeneral: expediente.secretarioGeneral || "",
          correos: expediente.correos || [""],
          archivos: expediente.archivos || [],
          LinkURL: expediente.LinkURL || "",
        });
      } else {
        setFormData({
          tipoServicio: "Arbitraje",
          fechaPresentacion: "",
          horaPresentacion: "",
          numeroExpediente: "",
          tribunalArbitral: "",
          tribunalUnico: "",
          secretario: "",
          secretarioGeneral: "",
          correos: [""],
          archivos: [],
          LinkURL: "",
        });
      }
    }
  }, [open, expediente]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCorreoChange = (index, value) => {
    const newCorreos = [...formData.correos];
    newCorreos[index] = value;
    setFormData((prev) => ({
      ...prev,
      correos: newCorreos,
    }));
  };

  const addCorreo = () => {
    setFormData((prev) => ({
      ...prev,
      correos: [...prev.correos, ""],
    }));
  };

  const removeCorreo = (index) => {
    if (formData.correos.length > 1) {
      const newCorreos = formData.correos.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        correos: newCorreos,
      }));
    }
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length !== files.length) {
      toast("Solo se permiten archivos PDF");
    }

    if (formData.archivos.length + pdfFiles.length > 5) {
      toast("Máximo 5 archivos permitidos");
      return;
    }

    setUploadingFiles(true);
    try {
      const uploadPromises = pdfFiles.map(async (file) => {
        // Crear referencia única para el archivo
        const timestamp = Date.now();
        const fileName = `expedientes/${timestamp}_${file.name}`;
        const storageRef = ref(storage, fileName);

        // Subir archivo
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return {
          name: file.name,
          size: file.size,
          url: downloadURL,
          storagePath: fileName,
          uploadedAt: new Date().toISOString(),
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      setFormData((prev) => ({
        ...prev,
        archivos: [...prev.archivos, ...uploadedFiles],
      }));

      toast(`${uploadedFiles.length} archivo(s) subido(s) correctamente`);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast("Error al subir los archivos");
    } finally {
      setUploadingFiles(false);
    }
  };

  const removeArchivo = async (index) => {
    const archivo = formData.archivos[index];

    try {
      // Si el archivo tiene storagePath, eliminarlo de Firebase Storage
      if (archivo.storagePath) {
        const storageRef = ref(storage, archivo.storagePath);
        await deleteObject(storageRef);
      }

      const newArchivos = formData.archivos.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        archivos: newArchivos,
      }));

      toast("Archivo eliminado correctamente");
    } catch (error) {
      console.error("Error deleting file:", error);
      toast("Error al eliminar el archivo");
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "fechaPresentacion",
      "horaPresentacion",
      "numeroExpediente",
      "tribunalArbitral",
      "secretario",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast(`El campo ${field} es requerido`);
        return false;
      }
    }

    // Validar correos
    const validCorreos = formData.correos.filter(
      (correo) => correo.trim() !== ""
    );
    if (validCorreos.length === 0) {
      toast("Debe agregar al menos un correo electrónico");
      return false;
    }

    // Validar formato de correos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const correo of validCorreos) {
      if (!emailRegex.test(correo)) {
        toast(`El correo "${correo}" no tiene un formato válido`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Filtrar correos vacíos
      const validCorreos = formData.correos.filter(
        (correo) => correo.trim() !== ""
      );

      const expedienteData = {
        ...formData,
        correos: validCorreos,
      };

      await onSave(expedienteData);
    } catch (error) {
      toast("No se pudo guardar el expediente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-auto w-[90%] md:w-full max-h-[95vh] overflow-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {expediente ? "Editar Expediente" : "Nuevo Expediente"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tipo de Servicio */}
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
                  <SelectItem value="ArbitrajeEmergencia">Arbitraje de Emergencia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fecha de Presentación */}
            <div className="space-y-2">
              <Label htmlFor="fechaPresentacion">Fecha de Presentación *</Label>
              <Input
                id="fechaPresentacion"
                type="date"
                value={formData.fechaPresentacion}
                onChange={(e) =>
                  handleInputChange("fechaPresentacion", e.target.value)
                }
                required
              />
            </div>

            {/* Hora de Presentación */}
            <div className="space-y-2">
              <Label htmlFor="horaPresentacion">Hora de Presentación *</Label>
              <Input
                id="horaPresentacion"
                type="time"
                value={formData.horaPresentacion}
                onChange={(e) =>
                  handleInputChange("horaPresentacion", e.target.value)
                }
                required
              />
            </div>

            {/* Número de Expediente */}
            <div className="space-y-2">
              <Label htmlFor="numeroExpediente">N° de Expediente *</Label>
              <Input
                id="numeroExpediente"
                placeholder="Ej: ARB-2024-001"
                value={formData.numeroExpediente}
                onChange={(e) =>
                  handleInputChange("numeroExpediente", e.target.value)
                }
              />
            </div>

            {/* Tribunal Arbitral */}
            <div className="space-y-2">
              <Label htmlFor="tribunalArbitral">Tribunal Arbitral *</Label>
              <Input
                id="tribunalArbitral"
                placeholder="Nombre del tribunal"
                value={formData.tribunalArbitral}
                onChange={(e) =>
                  handleInputChange("tribunalArbitral", e.target.value)
                }
              />
            </div>

            {/* Tribunal Arbitral */}
            <div className="space-y-2">
              <Label htmlFor="tribunalUnico">Arbitro único *</Label>
              <Input
                id="tribunalUnico"
                placeholder="Nombre del tribunal"
                value={formData.tribunalUnico}
                onChange={(e) =>
                  handleInputChange("tribunalUnico", e.target.value)
                }
                required
              />
            </div>

            {/* Secretario */}
            <div className="space-y-2">
              <Label htmlFor="secretario">Secretaria Arbitral </Label>
              <Input
                id="secretario"
                placeholder="Nombre del secretario"
                value={formData.secretario}
                onChange={(e) =>
                  handleInputChange("secretario", e.target.value)
                }
              />
            </div>
            {/* Secretario */}
            <div className="space-y-2">
              <Label htmlFor="secretarioGeneral">Secretaria General </Label>
              <Input
                id="secretarioGeneral"
                placeholder="Nombre del secretarioGeneral"
                value={formData.secretarioGeneral}
                onChange={(e) =>
                  handleInputChange("secretarioGeneral", e.target.value)
                }
              />
            </div>
          </div>

          {/* Correos Electrónicos */}
          <div className="space-y-2">
            <Label>Correos Electrónicos *</Label>
            <div className="space-y-2">
              {formData.correos.map((correo, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={correo}
                    onChange={(e) => handleCorreoChange(index, e.target.value)}
                    className="flex-1"
                  />
                  {formData.correos.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeCorreo(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addCorreo}
                className="flex items-center gap-2 bg-transparent"
              >
                <Plus className="h-4 w-4" />
                Agregar Correo
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="LinkURL">Link URL Archivos </Label>
            <Input
              id="LinkURL"
              placeholder="LinkArchivos"
              value={formData.LinkURL}
              onChange={(e) => handleInputChange("LinkURL", e.target.value)}
            />
          </div>
          {/* Archivos Adjuntos */}
          <div className="space-y-2">
            <Label>Archivos Adjuntos (Máximo 5 PDFs)</Label>
            <div className="space-y-2">
              <Input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileUpload}
                disabled={uploadingFiles}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
              />

              {uploadingFiles && (
                <p className="text-sm text-muted-foreground">
                  Subiendo archivos...
                </p>
              )}

              {formData.archivos.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Archivos seleccionados ({formData.archivos.length}/5):
                  </p>
                  {formData.archivos.map((archivo, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        <span className="text-sm">{archivo.name}</span>
                        <Badge variant="secondary">
                          {(archivo.size / 1024 / 1024).toFixed(2)} MB
                        </Badge>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArchivo(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading || uploadingFiles}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || uploadingFiles}>
              {loading ? "Guardando..." : expediente ? "Actualizar" : "Crear"}{" "}
              Expediente
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
