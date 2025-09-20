"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FileUpload } from "./file-upload";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { auth, db } from "@/firebase/firebaseClient";
import useAuthState from "@/lib/useAuthState";

const PARTES_PROCESALES = [
  "Demandante",
  "Demandado",
  "Tercero Interviniente",
  "Perito",
  "Testigo",
  "Apoderado",
  "Representante Legal",
];

export function AddEscritoModal({ onEscritoAdded }) {
  const [{ user }, loading] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [expedientes, setExpedientes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  console.log("user", user);

  const [formData, setFormData] = useState({
    expedienteId: "",
    numeroEscrito: "",
    parteProcesal: "",
    descripcion: "",
    contenido: "",
  });

  // Load expedientes when modal opens
  useEffect(() => {
    if (!open || !user?.email) return;

    const loadExpedientes = async () => {
      try {
        const q = query(
          collection(db, "expedientes"),
          where("correos", "array-contains", user.email)
        );
        const snapshot = await getDocs(q);
        const expedientesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExpedientes(expedientesData);
      } catch (error) {
        console.error("Error loading expedientes:", error);
        toast.error("Error al cargar expedientes");
      }
    };

    loadExpedientes();
  }, [open, user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Usuario no autenticado");
      return;
    }

    if (
      !formData.expedienteId ||
      !formData.numeroEscrito ||
      !formData.parteProcesal ||
      !formData.contenido
    ) {
      toast.error("Por favor complete todos los campos obligatorios");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create escrito document
      const escritoData = {
        userEmail: user.email,
        expedienteId: formData.expedienteId,
        numeroEscrito: formData.numeroEscrito,
        parteProcesal: formData.parteProcesal,
        descripcion: formData.descripcion,
        contenido: formData.contenido,
        documentos: uploadedFiles.map((file) => ({
          name: file.name,
          url: file.url,
          path: file.path,
          size: file.size,
        })),
        fechaCreacion: serverTimestamp(),
        estado: "pendiente",
      };

      const docRef = await addDoc(collection(db, "escritos"), escritoData);

      toast.success("Escrito creado exitosamente");

      // Reset form
      setFormData({
        expedienteId: "",
        numeroEscrito: "",
        parteProcesal: "",
        descripcion: "",
        contenido: "",
      });
      setUploadedFiles([]);
      setOpen(false);

      // Notify parent component
      onEscritoAdded?.();
    } catch (error) {
      console.error("Error creating escrito:", error);
      toast.error("Error al crear el escrito");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Agregar Escrito
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Escrito</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expediente">N° de Expediente *</Label>
              <Select
                value={formData.expedienteId}
                onValueChange={(value) =>
                  handleInputChange("expedienteId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar expediente" />
                </SelectTrigger>
                <SelectContent>
                  {expedientes.map((expediente) => (
                    <SelectItem key={expediente.id} value={expediente.id}>
                      {expediente.numero}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroEscrito">Número de Escrito *</Label>
              <Input
                id="numeroEscrito"
                value={formData.numeroEscrito}
                onChange={(e) =>
                  handleInputChange("numeroEscrito", e.target.value)
                }
                placeholder="Ej: 001-2024"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="parteProcesal">Parte o Sujeto Procesal *</Label>
            <Select
              value={formData.parteProcesal}
              onValueChange={(value) =>
                handleInputChange("parteProcesal", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar parte procesal" />
              </SelectTrigger>
              <SelectContent>
                {PARTES_PROCESALES.map((parte) => (
                  <SelectItem key={parte} value={parte}>
                    {parte}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => handleInputChange("descripcion", e.target.value)}
              placeholder="Descripción breve del escrito (opcional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contenido">Contenido *</Label>
            <Textarea
              id="contenido"
              value={formData.contenido}
              onChange={(e) => handleInputChange("contenido", e.target.value)}
              placeholder="Contenido del escrito..."
              className="min-h-[120px]"
              required
            />
          </div>

          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium">Documentos y Anexos</Label>
              <p className="text-xs text-muted-foreground mb-4">
                Máximo 5 archivos PDF, cada uno hasta 200 MB
              </p>
              <FileUpload
                onFilesChange={setUploadedFiles}
                maxFiles={5}
                maxSizePerFile={200 * 1024 * 1024}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Escrito"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
