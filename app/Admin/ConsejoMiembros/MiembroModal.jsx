"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload, FileText, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";
import { storage } from "@/firebase/firebaseClient";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export function MiembroModal({ isOpen, onClose, miembro, onSave }) {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    image: "",
    cv: "",
    order: 0,
    active: true,
  });

  useEffect(() => {
    if (miembro) {
      setFormData({
        name: miembro.name || "",
        position: miembro.position || "",
        image: miembro.image || "",
        cv: miembro.cv || "",
        order: miembro.order || 0,
        active: miembro.active !== undefined ? miembro.active : true,
      });
    } else {
      setFormData({
        name: "",
        position: "",
        image: "",
        cv: "",
        order: 0,
        active: true,
      });
    }
  }, [miembro, isOpen]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor selecciona una imagen válida");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen no debe superar los 5MB");
      return;
    }

    try {
      setUploadingImage(true);
      const timestamp = Date.now();
      const fileName = `consejo-miembros/${timestamp}-${file.name}`;
      const storageRef = ref(storage, fileName);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      setFormData((prev) => ({ ...prev, image: downloadURL }));
      toast.success("Imagen subida exitosamente");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCVUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      toast.error("Por favor selecciona un archivo PDF");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("El CV no debe superar los 10MB");
      return;
    }

    try {
      setUploadingCV(true);
      const timestamp = Date.now();
      const fileName = `consejo-cvs/${timestamp}-${file.name}`;
      const storageRef = ref(storage, fileName);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      setFormData((prev) => ({ ...prev, cv: downloadURL }));
      toast.success("CV subido exitosamente");
    } catch (error) {
      console.error("Error uploading CV:", error);
      toast.error("Error al subir el CV");
    } finally {
      setUploadingCV(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.position) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    if (!formData.image) {
      toast.error("Por favor sube una imagen del miembro");
      return;
    }

    try {
      setLoading(true);

      const url = miembro
        ? `/api/consejo-miembros/${miembro.id}`
        : "/api/consejo-miembros";

      const method = miembro ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          miembro
            ? "Miembro actualizado exitosamente"
            : "Miembro creado exitosamente"
        );
        onSave();
      } else {
        toast.error(data.error || "Error al guardar el miembro");
      }
    } catch (error) {
      console.error("Error saving member:", error);
      toast.error("Error al guardar el miembro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {miembro ? "Editar Miembro" : "Agregar Miembro"}
          </DialogTitle>
          <DialogDescription>
            {miembro
              ? "Actualiza la información del miembro del consejo"
              : "Agrega un nuevo miembro al consejo superior de arbitraje"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Nombre Completo <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Ej: Juan Pérez García"
              required
            />
          </div>

          {/* Position */}
          <div className="space-y-2">
            <Label htmlFor="position">
              Cargo <span className="text-destructive">*</span>
            </Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, position: e.target.value }))
              }
              placeholder="Ej: PRESIDENTE DEL CONSEJO SUPERIOR DE ARBITRAJE"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>
              Fotografía <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
                id="image-upload"
              />
              <Label
                htmlFor="image-upload"
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploadingImage ? "Subiendo..." : "Seleccionar Imagen"}
              </Label>
              {formData.image && (
                <div className="flex items-center gap-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="h-16 w-16 object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image: "" }))
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Tamaño máximo: 5MB. Formatos: JPG, PNG, WEBP
            </p>
          </div>

          {/* CV Upload */}
          <div className="space-y-2">
            <Label>Curriculum Vitae (PDF)</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="application/pdf"
                onChange={handleCVUpload}
                disabled={uploadingCV}
                className="hidden"
                id="cv-upload"
              />
              <Label
                htmlFor="cv-upload"
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                <FileText className="h-4 w-4 mr-2" />
                {uploadingCV ? "Subiendo..." : "Seleccionar PDF"}
              </Label>
              {formData.cv && (
                <div className="flex items-center gap-2">
                  <a
                    href={formData.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Ver CV
                  </a>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, cv: "" }))
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Tamaño máximo: 10MB. Solo archivos PDF
            </p>
          </div>

          {/* Order */}
          <div className="space-y-2">
            <Label htmlFor="order">Orden de Aparición</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  order: parseInt(e.target.value) || 0,
                }))
              }
              min="0"
            />
            <p className="text-xs text-muted-foreground">
              Menor número aparece primero
            </p>
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="active">Estado</Label>
              <p className="text-xs text-muted-foreground">
                Activa o desactiva la visualización del miembro
              </p>
            </div>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, active: checked }))
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || uploadingImage || uploadingCV}
            >
              {loading ? "Guardando..." : miembro ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}