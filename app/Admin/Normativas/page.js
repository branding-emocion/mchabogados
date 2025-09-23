"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  Edit,
  Plus,
  FileText,
  ImageIcon,
  Download,
} from "lucide-react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/firebase/firebaseClient";

export default function ISOAdmin() {
  const [isos, setIsos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingISO, setEditingISO] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    imagenFile: null,
    pdfFile: null,
  });

  // Cargar ISOs al montar el componente
  useEffect(() => {
    loadISOs();
  }, []);

  const loadISOs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "isos"));
      const isosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIsos(isosData);
    } catch (error) {
      console.error("Error cargando ISOs:", error);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [`${type}File`]: file,
      }));
    }
  };

  const uploadFile = async (file, path) => {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.imagenFile || !formData.pdfFile) {
      alert("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      // Subir archivos
      const imagenURL = await uploadFile(
        formData.imagenFile,
        `isos/imagenes/${Date.now()}_${formData.imagenFile.name}`
      );
      const pdfURL = await uploadFile(
        formData.pdfFile,
        `isos/pdfs/${Date.now()}_${formData.pdfFile.name}`
      );

      const isoData = {
        nombre: formData.nombre,
        imagenURL,
        pdfURL,
        fechaCreacion: new Date().toISOString(),
      };

      if (editingISO) {
        // Actualizar ISO existente
        await updateDoc(doc(db, "isos", editingISO.id), isoData);
      } else {
        // Crear nuevo ISO
        await addDoc(collection(db, "isos"), isoData);
      }

      // Resetear formulario
      setFormData({ nombre: "", imagenFile: null, pdfFile: null });
      setIsModalOpen(false);
      setEditingISO(null);
      loadISOs();
    } catch (error) {
      console.error("Error guardando ISO:", error);
      alert("Error al guardar el ISO");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (iso) => {
    setEditingISO(iso);
    setFormData({
      nombre: iso.nombre,
      imagenFile: null,
      pdfFile: null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (iso) => {
    if (!confirm("¿Estás seguro de eliminar este ISO?")) return;

    try {
      // Eliminar archivos del storage
      if (iso.imagenURL) {
        const imagenRef = ref(storage, iso.imagenURL);
        await deleteObject(imagenRef);
      }
      if (iso.pdfURL) {
        const pdfRef = ref(storage, iso.pdfURL);
        await deleteObject(pdfRef);
      }

      // Eliminar documento de Firestore
      await deleteDoc(doc(db, "isos", iso.id));
      loadISOs();
    } catch (error) {
      console.error("Error eliminando ISO:", error);
      alert("Error al eliminar el ISO");
    }
  };

  const openModal = () => {
    setEditingISO(null);
    setFormData({ nombre: "", imagenFile: null, pdfFile: null });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Administración de ISOs
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Gestiona los documentos ISO de tu organización
              </p>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={openModal}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo ISO
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">
                    {editingISO ? "Editar ISO" : "Nuevo ISO"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-foreground">
                      Nombre del ISO <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="nombre"
                      placeholder="Ingresa el título del ISO"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          nombre: e.target.value,
                        }))
                      }
                      className="bg-background border-input text-foreground"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imagen" className="text-foreground">
                      Imagen ISO
                    </Label>
                    <div className="relative">
                      <Input
                        id="imagen"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "imagen")}
                        className="bg-muted border-input text-foreground file:bg-secondary file:text-secondary-foreground file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
                        required={!editingISO}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pdf" className="text-foreground">
                      PDF ISO
                    </Label>
                    <div className="relative">
                      <Input
                        id="pdf"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(e, "pdf")}
                        className="bg-muted border-input text-foreground file:bg-secondary file:text-secondary-foreground file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
                        required={!editingISO}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {loading
                        ? "Guardando..."
                        : editingISO
                        ? "Actualizar ISO"
                        : "Publicar ISO"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 border-border text-foreground hover:bg-accent"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {isos.length === 0 ? (
          <Card className="text-center py-12 bg-card border-border">
            <CardContent>
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No hay ISOs registrados
              </h3>
              <p className="text-muted-foreground mb-4">
                Comienza agregando tu primer documento ISO
              </p>
              <Button
                onClick={openModal}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear primer ISO
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isos.map((iso) => (
              <Card
                key={iso.id}
                className="bg-card border-border hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-foreground line-clamp-2">
                      {iso.nombre}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-secondary text-secondary-foreground"
                    >
                      ISO
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Preview de imagen */}
                  {iso.imagenURL && (
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img
                        src={iso.imagenURL || "/placeholder.svg"}
                        alt={iso.nombre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Información */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ImageIcon className="w-4 h-4" />
                      <span>Imagen incluida</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      <span>PDF disponible</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Creado:{" "}
                      {new Date(iso.fechaCreacion).toLocaleDateString("es-ES")}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(iso.pdfURL, "_blank")}
                      className="flex-1 border-border text-foreground hover:bg-accent"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Ver PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(iso)}
                      className="border-border text-foreground hover:bg-accent"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(iso)}
                      className="border-border text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
