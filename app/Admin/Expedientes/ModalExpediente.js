"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, X, FileText, Plus, User, Search, PenTool } from "lucide-react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "sonner";
import { db, storage } from "@/firebase/firebaseClient";

const TIPOS_SERVICIO = ["ARBITRAJE", "RECUSACIÓN"];

const TIPOS_DOCUMENTO = ["DNI", "RUC", "Pasaporte", "Carnet de Extranjería"];

export default function ExpedienteModal({
  isOpen,
  onClose,
  expedienteToEdit = null,
  isEditMode = false,
}) {
  const [formData, setFormData] = useState({
    tipoServicio: "",
    materia: "",
    descripcion: "",
    clientesPrincipales: [],
    partesAdicionales: [],
    fechaPresentacion: new Date().toISOString().slice(0, 16),
    adjudicadorUnico: "",
    jrdJprdColegiada: "",
    arbitroUnico: "",
    tribunalArbitral: "",
  });

  const [documentosParaFirmar, setDocumentosParaFirmar] = useState([]);
  const [anexos, setAnexos] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [clientesDisponibles, setClientesDisponibles] = useState([]);
  const [searchCliente, setSearchCliente] = useState("");
  const [showClienteSelector, setShowClienteSelector] = useState(false);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [ClienteSelector, setClienteSelector] = useState({});

  useEffect(() => {
    if (isEditMode && expedienteToEdit) {
      console.log(
        "[v0] Cargando datos del expediente para editar:",
        expedienteToEdit
      );

      setFormData({
        tipoServicio: expedienteToEdit.tipoServicio || "",
        materia: expedienteToEdit.materia || "",
        descripcion: expedienteToEdit.descripcion || "",
        clientesPrincipales: expedienteToEdit.clientesPrincipales || [],
        partesAdicionales: expedienteToEdit.partesAdicionales || [],
        fechaPresentacion:
          expedienteToEdit.fechaPresentacion ||
          new Date().toISOString().slice(0, 16),
        adjudicadorUnico: expedienteToEdit.adjudicadorUnico || "",
        jrdJprdColegiada: expedienteToEdit.jrdJprdColegiada || "",
        arbitroUnico: expedienteToEdit.arbitroUnico || "",
        tribunalArbitral: expedienteToEdit.tribunalArbitral || "",
        ClienteSelector: expedienteToEdit.ClienteSelector || {},
      });

      if (expedienteToEdit.documentosParaFirmar) {
        const docsExistentes = expedienteToEdit.documentosParaFirmar.map(
          (doc) => ({
            name: doc.name,
            size: doc.size || 0,
            type: doc.type || "application/pdf",
            url: doc.url,
            isExisting: true,
          })
        );
        setDocumentosParaFirmar(docsExistentes);
      }

      if (expedienteToEdit.anexos) {
        const anexosExistentes = expedienteToEdit.anexos.map((doc) => ({
          name: doc.name,
          size: doc.size || 0,
          type: doc.type || "application/pdf",
          url: doc.url,
          isExisting: true,
        }));
        setAnexos(anexosExistentes);
      }
    } else {
      setFormData({
        tipoServicio: "",
        materia: "",
        descripcion: "",
        clientesPrincipales: [],
        partesAdicionales: [],
        fechaPresentacion: new Date().toISOString().slice(0, 16),
        adjudicadorUnico: "",
        jrdJprdColegiada: "",
        arbitroUnico: "",
        tribunalArbitral: "",
        ClienteSelector: {},
      });
      setDocumentosParaFirmar([]);
      setAnexos([]);
    }
  }, [isEditMode, expedienteToEdit]);

  useEffect(() => {
    const loadClientes = async () => {
      try {
        setLoadingClientes(true);
        console.log("[v0] Cargando clientes desde Firebase...");

        const querySnapshot = await getDocs(collection(db, "Usuarios"));
        const clientesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(
          "[v0] Clientes cargados:",
          clientesData.length,
          clientesData
        );
        setClientesDisponibles(clientesData);
      } catch (error) {
        console.error("[v0] Error al cargar clientes:", error);
        toast.error("Error al cargar los clientes");
      } finally {
        setLoadingClientes(false);
      }
    };

    if (isOpen) {
      loadClientes();
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddClienteExistente = (cliente) => {
    const clienteData = {
      ...cliente,
      esClienteExistente: true,
    };
    setClienteSelector(clienteData);

    setFormData((prev) => ({
      ...prev,
      clientesPrincipales: [...prev.clientesPrincipales, clienteData],
    }));
    setSearchCliente("");
    setShowClienteSelector(false);
  };

  const handleAddParteAdicional = () => {
    const nuevaParte = {
      nombre: "",
      tipoDocumento: "",
      numeroDocumento: "",
      direccion: "",
      esClienteExistente: false,
    };

    setFormData((prev) => ({
      ...prev,
      partesAdicionales: [...prev.partesAdicionales, nuevaParte],
    }));
  };

  const handleRemoveCliente = (index, tipo) => {
    if (tipo === "principal") {
      setFormData((prev) => ({
        ...prev,
        clientesPrincipales: prev.clientesPrincipales.filter(
          (_, i) => i !== index
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        partesAdicionales: prev.partesAdicionales.filter((_, i) => i !== index),
      }));
    }
  };

  const handleParteAdicionalChange = (index, field, value) => {
    const newPartes = [...formData.partesAdicionales];
    newPartes[index] = { ...newPartes[index], [field]: value };
    setFormData((prev) => ({ ...prev, partesAdicionales: newPartes }));
  };

  const handleFileUpload = (files, type) => {
    const fileArray = Array.from(files);

    if (type === "documentos") {
      const invalidFiles = fileArray.filter(
        (file) =>
          !file.type.includes("pdf") &&
          !file.type.includes("image/jpeg") &&
          !file.type.includes("image/jpg") &&
          !file.type.includes("image/png")
      );
      if (invalidFiles.length > 0) {
        toast.error(
          `Solo se permiten archivos PDF e imágenes (JPG, PNG) para documentos de firma. Archivos rechazados: ${invalidFiles
            .map((f) => f.name)
            .join(", ")}`
        );
        return;
      }
    }

    if (type === "documentos") {
      setDocumentosParaFirmar((prev) => [...prev, ...fileArray]);
    } else {
      setAnexos((prev) => [...prev, ...fileArray]);
    }
  };

  const removeFile = (index, type) => {
    if (type === "documentos") {
      setDocumentosParaFirmar((prev) => prev.filter((_, i) => i !== index));
    } else {
      setAnexos((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const uploadFilesToStorage = async (files, folder) => {
    const uploadPromises = files.map(async (file) => {
      if (file.isExisting && file.url) {
        return {
          name: file.name,
          url: file.url,
          size: file.size,
          type: file.type,
        };
      }

      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `expedientes/${folder}/${fileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return {
        name: file.name,
        url: downloadURL,
        size: file.size,
        type: file.type,
      };
    });
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tipoServicio || !formData.materia) {
      toast.error("Por favor complete los campos obligatorios");
      return;
    }

    if (formData.clientesPrincipales.length === 0) {
      toast.error("Debe agregar al menos un cliente principal");
      return;
    }

    if (documentosParaFirmar.length === 0) {
      toast.error("Debe subir al menos un documento para firmar");
      return;
    }

    setUploading(true);

    try {
      const documentosUrls =
        documentosParaFirmar.length > 0
          ? await uploadFilesToStorage(
              documentosParaFirmar,
              "documentos-para-firmar"
            )
          : [];
      const anexosUrls =
        anexos.length > 0 ? await uploadFilesToStorage(anexos, "anexos") : [];

      const numeroExpediente =
        expedienteToEdit?.numeroExpediente ||
        `EXP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

      const expedienteData = {
        ...formData,
        documentosParaFirmar: documentosUrls,
        anexos: anexosUrls,
        fechaCreacion: expedienteToEdit?.fechaCreacion || new Date(),
        fechaActualizacion: new Date(),
        estado: expedienteToEdit?.estado || "PENDIENTE_FIRMA",
        numeroExpediente,
        partes: [
          ...formData.clientesPrincipales,
          ...formData.partesAdicionales,
        ],
        procesoFirma: {
          fechaCreacion:
            expedienteToEdit?.procesoFirma?.fechaCreacion || new Date(),
          documentosPendientes: documentosUrls.length,
          firmasCompletadas:
            expedienteToEdit?.procesoFirma?.firmasCompletadas || 0,
          estadoGeneral:
            expedienteToEdit?.procesoFirma?.estadoGeneral || "PENDIENTE",
        },
        ClienteSelector: ClienteSelector,
      };

      if (isEditMode && expedienteToEdit) {
        await updateDoc(
          doc(db, "expedientes", expedienteToEdit.id),
          expedienteData
        );
        toast.success("Expediente actualizado exitosamente");
      } else {
        await addDoc(collection(db, "expedientes"), expedienteData);
        toast.success(
          "Expediente creado exitosamente - Listo para proceso de firma"
        );
      }

      onClose();
    } catch (error) {
      console.error("Error al guardar expediente:", error);
      toast.error("Error al guardar el expediente");
    } finally {
      setUploading(false);
    }
  };

  const clientesFiltrados =
    searchCliente.trim() === ""
      ? clientesDisponibles
      : clientesDisponibles.filter(
          (cliente) =>
            `${cliente.nombres || cliente.nombre || ""} ${
              cliente.apellidos || ""
            }`
              .toLowerCase()
              .includes(searchCliente.toLowerCase()) ||
            cliente.email
              ?.toLowerCase()
              .includes(searchCliente.toLowerCase()) ||
            (cliente.numeroDocumento || cliente.numeroIdentificacion)?.includes(
              searchCliente
            )
        );

  const FileUploadArea = ({
    files,
    onFileChange,
    onRemove,
    label,
    accept = "*",
    isRequired = false,
    description = "",
  }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium">{label}</Label>
        {isRequired && <span className="text-red-500">*</span>}
        {label.includes("Firmar") && (
          <PenTool className="h-4 w-4 text-primary" />
        )}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
        <input
          type="file"
          multiple
          accept={accept}
          onChange={(e) => onFileChange(e.target.files)}
          className="hidden"
          id={`file-${label}`}
        />
        <label htmlFor={`file-${label}`} className="cursor-pointer">
          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Haz clic para seleccionar archivos o arrastra aquí
          </p>
          {isRequired && (
            <p className="text-xs text-red-500 mt-1">
              Debe subir al menos un documento PDF o imagen
            </p>
          )}
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-muted p-2 rounded"
            >
              <div className="flex items-center space-x-2">
                <div className="flex items-center gap-1">
                  <FileText
                    className={`h-4 w-4 ${
                      file.type.includes("pdf")
                        ? "text-red-500"
                        : file.type.includes("image")
                        ? "text-green-500"
                        : "text-muted-foreground"
                    }`}
                  />
                  {file.type.includes("pdf") && (
                    <span className="text-xs bg-red-100 text-red-700 px-1 rounded">
                      PDF
                    </span>
                  )}
                  {file.type.includes("image") && (
                    <span className="text-xs bg-green-100 text-green-700 px-1 rounded">
                      IMG
                    </span>
                  )}
                </div>
                <span className="text-sm truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-auto w-[90%] md:w-full max-h-[95vh] overflow-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <PenTool className="h-5 w-5 text-primary" />
            {isEditMode
              ? "Editar Expediente de Firma"
              : "Crear Nuevo Expediente para Firma Digital"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {isEditMode
              ? "Modifica los datos del expediente y documentos para firma digital."
              : "Crea un expediente para subir documentos que requieren firma digital. Los usuarios podrán firmar estos documentos en el módulo de firmas."}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-lg">
                  1. Selección de Clientes y Firmantes
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Selecciona los clientes y partes que necesitan firmar los
                documentos que subirás.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Clientes Principales (Firmantes) *
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowClienteSelector(!showClienteSelector)}
                    className="gap-2"
                  >
                    <User className="h-4 w-4" />
                    Agregar Cliente
                  </Button>
                </div>

                {showClienteSelector && (
                  <div className="border rounded-lg p-4 space-y-3 bg-muted/50">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Buscar cliente por nombre, email o documento..."
                        value={searchCliente}
                        onChange={(e) => setSearchCliente(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {loadingClientes ? (
                        <div className="text-center py-4">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Cargando clientes...
                          </p>
                        </div>
                      ) : clientesFiltrados.length > 0 ? (
                        clientesFiltrados.map((cliente) => (
                          <div
                            key={cliente.id}
                            className="flex items-center justify-between p-3 bg-background rounded border hover:bg-muted/50 cursor-pointer"
                            onClick={() => handleAddClienteExistente(cliente)}
                          >
                            <div>
                              <p className="font-medium">
                                {cliente.nombre} {cliente.apellidos}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {cliente.tipoDocumento}:{" "}
                                {cliente.numeroDocumento ||
                                  cliente.numeroIdentificacion}{" "}
                                | {cliente.email}
                              </p>
                            </div>
                            <Button type="button" size="sm" variant="ghost">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : clientesDisponibles.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">
                          No hay clientes registrados en la base de datos
                        </p>
                      ) : (
                        <p className="text-center text-muted-foreground py-4">
                          No se encontraron clientes que coincidan con &quot;
                          {searchCliente}&quot;
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {formData.clientesPrincipales.map((cliente, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-primary/5 rounded border"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="gap-1">
                          <PenTool className="h-3 w-3" />
                          Firmante
                        </Badge>
                        <div>
                          <p className="font-medium">{cliente.nombre}</p>
                          <p className="text-sm text-muted-foreground">
                            {cliente.tipoDocumento}: {cliente.numeroDocumento} |{" "}
                            {cliente.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCliente(index, "principal")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Partes Adicionales (Firmantes)
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddParteAdicional}
                    className="gap-2 bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar Parte
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.partesAdicionales.map((parte, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
                          <PenTool className="h-3 w-3" />
                          Firmante Adicional {index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleRemoveCliente(index, "adicional")
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          placeholder="Nombre completo"
                          value={parte.nombre}
                          onChange={(e) =>
                            handleParteAdicionalChange(
                              index,
                              "nombre",
                              e.target.value
                            )
                          }
                        />

                        <Select
                          value={parte.tipoDocumento}
                          onValueChange={(value) =>
                            handleParteAdicionalChange(
                              index,
                              "tipoDocumento",
                              value
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Tipo Documento" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIPOS_DOCUMENTO.map((tipo) => (
                              <SelectItem key={tipo} value={tipo}>
                                {tipo}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Input
                          placeholder="N° de Documento"
                          value={parte.numeroDocumento}
                          onChange={(e) =>
                            handleParteAdicionalChange(
                              index,
                              "numeroDocumento",
                              e.target.value
                            )
                          }
                        />

                        <Input
                          placeholder="Dirección"
                          value={parte.direccion}
                          onChange={(e) =>
                            handleParteAdicionalChange(
                              index,
                              "direccion",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-lg">
                  2. Información del Expediente
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipoServicio">Tipo Servicio *</Label>
                  <Select
                    value={formData.tipoServicio}
                    onValueChange={(value) =>
                      handleInputChange("tipoServicio", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPOS_SERVICIO.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="materia">Materia *</Label>
                  <Input
                    id="materia"
                    value={formData.materia}
                    onChange={(e) =>
                      handleInputChange("materia", e.target.value)
                    }
                    placeholder="Ingrese la materia del expediente"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="fechaPresentacion">
                    Fecha y Hora de Presentación *
                  </Label>
                  <Input
                    id="fechaPresentacion"
                    type="datetime-local"
                    value={formData.fechaPresentacion}
                    onChange={(e) =>
                      handleInputChange("fechaPresentacion", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) =>
                    handleInputChange("descripcion", e.target.value)
                  }
                  placeholder="Descripción del proceso de firma y documentos involucrados..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-lg text-primary">
                  3. Subir Documentos (PDFs e Imágenes)
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Sube los documentos que los usuarios descargarán, firmarán
                digitalmente y volverán a subir en el módulo de firmas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUploadArea
                  files={documentosParaFirmar}
                  onFileChange={(files) =>
                    handleFileUpload(files, "documentos")
                  }
                  onRemove={(index) => removeFile(index, "documentos")}
                  label="Documentos para Firmar"
                  accept=".pdf,.jpg,.jpeg,.png"
                  isRequired={true}
                  description="PDFs e imágenes que requieren firma digital. Los usuarios los descargarán, firmarán y subirán de vuelta."
                />

                <FileUploadArea
                  files={anexos}
                  onFileChange={(files) => handleFileUpload(files, "anexos")}
                  onRemove={(index) => removeFile(index, "anexos")}
                  label="Documentos de Referencia"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  description="Documentos adicionales de referencia (opcional) - PDFs, DOC, imágenes"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <div className="bg-blue-500 text-white rounded-full p-1">
                    <FileText className="h-3 w-3" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">
                      Flujo de Firma Digital:
                    </p>
                    <ol className="text-blue-700 mt-1 space-y-1 text-xs">
                      <li>
                        1. Los usuarios descargan los PDFs/imágenes desde sus
                        módulos
                      </li>
                      <li>2. Firman digitalmente los documentos</li>
                      <li>
                        3. Suben los archivos firmados en el módulo de firmas
                      </li>
                      <li>
                        4. El expediente se actualiza con los documentos
                        firmados
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {formData.tipoServicio === "ARBITRAJE" && (
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-medium text-lg">
                  Información de Arbitraje (Opcional)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="adjudicadorUnico">Adjudicador Único</Label>
                    <Input
                      id="adjudicadorUnico"
                      value={formData.adjudicadorUnico}
                      onChange={(e) =>
                        handleInputChange("adjudicadorUnico", e.target.value)
                      }
                      placeholder="Nombre del adjudicador único"
                    />
                  </div>

                  <div>
                    <Label htmlFor="jrdJprdColegiada">JRD/JPRD Colegiada</Label>
                    <Input
                      id="jrdJprdColegiada"
                      value={formData.jrdJprdColegiada}
                      onChange={(e) =>
                        handleInputChange("jrdJprdColegiada", e.target.value)
                      }
                      placeholder="JRD/JPRD Colegiada"
                    />
                  </div>

                  <div>
                    <Label htmlFor="arbitroUnico">Árbitro Único</Label>
                    <Input
                      id="arbitroUnico"
                      value={formData.arbitroUnico}
                      onChange={(e) =>
                        handleInputChange("arbitroUnico", e.target.value)
                      }
                      placeholder="Nombre del árbitro único"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tribunalArbitral">Tribunal Arbitral</Label>
                    <Input
                      id="tribunalArbitral"
                      value={formData.tribunalArbitral}
                      onChange={(e) =>
                        handleInputChange("tribunalArbitral", e.target.value)
                      }
                      placeholder="Nombre del tribunal arbitral"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={uploading} className="gap-2">
              <PenTool className="h-4 w-4" />
              {uploading
                ? isEditMode
                  ? "Actualizando expediente..."
                  : "Creando expediente..."
                : isEditMode
                ? "Actualizar Expediente"
                : "Crear Expediente para Firma"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
