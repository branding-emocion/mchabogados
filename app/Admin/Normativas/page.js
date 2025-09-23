"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, BookOpen, Upload, Loader2 } from "lucide-react";

import ModalNormativa from "@/components/ModalNormativa";
import {
  createISO,
  getISOs,
  updateISO,
  uploadImage,
  uploadImagePDF,
} from "@/lib/BlogISOS";

export default function AdminISO() {
  const [ISOs, setISOs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingISO, setEditingISO] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPDF, setUploadingPDF] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    imagen: "",
    imagenPath: "", // Agregando imagenPath como en noticias
    contenido: "",
  });
  console.log("formData", formData);

  useEffect(() => {
    loadISOs();
  }, []);

  const loadISOs = async () => {
    try {
      setLoading(true);
      const ISOsData = await getISOs();
      setISOs(ISOsData);
    } catch (error) {
      console.error("Error cargando ISOs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const imageData = await uploadImage(file, "ISOs");
      setFormData({
        ...formData,
        imagen: imageData.url,
        imagenPath: imageData.path,
      });
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("Error al subir la imagen");
    } finally {
      setUploadingImage(false);
    }
  };
  const handleImageUploadPDF = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingPDF(true);
      const imageData = await uploadImagePDF(file, "ISOs");
      setFormData({
        ...formData,
        PDFIso: imageData.url,
        PDFIsoPath: imageData.path,
      });
    } catch (error) {
      console.error("Error subiendo pdf:", error);
      alert("Error al subir la pdf");
    } finally {
      setUploadingPDF(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titulo.trim()) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      setSaving(true);

      const ISOData = {
        titulo: formData.titulo,
        imagen: formData.imagen,
        imagenPath: formData.imagenPath,
        contenido: formData.contenido,
      };

      if (editingISO) {
        await updateISO(editingISO.id, ISOData);
      } else {
        await createISO(ISOData);
      }

      await loadISOs();
      resetForm();
    } catch (error) {
      console.error("Error guardando ISO:", error);
      alert("Error al guardar el ISOS");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (ISO) => {
    setFormData({
      titulo: ISO.titulo,
      imagen: ISO.imagen,
      imagenPath: ISO.imagenPath || "", // Incluyendo imagenPath
      contenido: ISO.contenido,
    });
    setEditingISO(ISO);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este ISOS del ISO?")) {
      try {
        await deleteISO(id);
        await loadISOs();
      } catch (error) {
        console.error("Error eliminando ISO:", error);
        alert("Error al eliminar el ISOS");
      }
    }
  };

  const resetForm = () => {
    setFormData({ titulo: "", imagen: "", imagenPath: "", contenido: "" }); // Incluyendo imagenPath
    setEditingISO(null);
    setShowModal(false);
  };

  const renderFormattedContent = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br />");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Cargando ISOS del ISO...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Administrar ISO
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestiona los ISOS del ISO de la fundación
            </p>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo ISOS
          </Button>
        </div>

        <ModalNormativa
          isOpen={showModal}
          onClose={resetForm}
          title={editingISO ? "Editar ISOS" : "Nuevo ISOS"}
          size="lg"
        >
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="titulo" className="text-card-foreground">
                Nombre del ISO*
              </Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                placeholder="Ingresa el título del ISOS"
                required
                className="bg-input border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-card-foreground">Imagen iso</Label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="bg-input border-border text-foreground"
                    disabled={uploadingImage}
                  />
                  {uploadingImage && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <Upload className="w-4 h-4 inline mr-1" />
                      Subiendo imagen...
                    </p>
                  )}
                </div>
              </div>
              {formData.imagen && (
                <div className="mt-2">
                  <img
                    src={formData.imagen || "/placeholder.svg"}
                    alt="Preview"
                    className="w-32 h-24 object-cover rounded-md border border-border"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=96&width=128";
                    }}
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-card-foreground">PDF iso</Label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={handleImageUploadPDF}
                    className="bg-input border-border text-foreground"
                    disabled={uploadingImage}
                  />
                  {uploadingPDF && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <Upload className="w-4 h-4 inline mr-1" />
                      Subiendo PDF...
                    </p>
                  )}
                </div>
              </div>
              {formData.PDFIsoPath && (
                <div className="mt-2">
                  <p>PDFIsoPath: {formData.PDFIsoPath}</p>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4 border-t border-border">
              <Button
                type="submit"
                disabled={saving}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {editingISO ? "Actualizando..." : "Publicando..."}
                  </>
                ) : (
                  <>{editingISO ? "Actualizar" : "Publicar"} ISOS</>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={saving}
                className="border-border text-foreground hover:bg-muted bg-transparent"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </ModalNormativa>

        <div className="grid gap-6">
          <h2 className="text-2xl font-semibold text-foreground">
            ISOS Publicados
          </h2>

          {ISOs.length === 0 ? (
            <Card className="border-border">
              <CardContent className="p-12 text-center bg-card">
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-card-foreground mb-2">
                  No hay ISOS
                </h3>
                <p className="text-muted-foreground">
                  Comienza escribiendo tu primer ISOS del ISO
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {ISOs.map((ISO) => (
                <Card key={ISO.id} className="border-border">
                  <CardContent className="p-6 bg-card">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={ISO.imagen || ""}
                          alt={ISO.titulo}
                          className="w-40 h-28 object-cover rounded-lg border border-border"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-card-foreground mb-2">
                          {ISO.titulo}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          Publicado el{" "}
                          {ISO.createdAt?.toLocaleDateString() ||
                            "Fecha no disponible"}
                        </p>
                        <div
                          className="text-card-foreground line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: renderFormattedContent(ISO.contenido),
                          }}
                        />
                        <div className="mt-3">
                          <span className="inline-block bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                            ISOS de ISO
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(ISO)}
                          className="border-border text-foreground hover:bg-muted"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(ISO.id)}
                          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
