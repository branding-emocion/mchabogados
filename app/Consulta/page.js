"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, User, AlertCircle } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/firebase/firebaseClient";
import { motion } from "framer-motion";

export default function ConsultaExpediente() {
  const [numeroExpediente, setNumeroExpediente] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [expediente, setExpediente] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarExpediente = async () => {
    if (!numeroExpediente.trim() || !numeroDocumento.trim()) {
      toast.error("Por favor ingrese el número de expediente y documento");
      return;
    }

    setLoading(true);
    try {
      // Buscar expediente por número
      const expedientesRef = collection(db, "expedientes");
      const q = query(
        expedientesRef,
        where("numeroExpediente", "==", numeroExpediente.trim())
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("No se encontró el expediente");
        setExpediente(null);
        return;
      }

      const expedienteData = querySnapshot.docs[0].data();

      // Verificar si el documento pertenece a alguna de las partes
      const todasLasPartes = [
        ...(expedienteData.clientesPrincipales || []),
        ...(expedienteData.partesAdicionales || []),
      ];
      const parteEncontrada = todasLasPartes.find(
        (parte) => parte.numeroDocumento === numeroDocumento.trim()
      );

      if (!parteEncontrada) {
        toast.error(
          "El número de documento no coincide con ninguna parte del expediente"
        );
        setExpediente(null);
        return;
      }

      setExpediente({
        id: querySnapshot.docs[0].id,
        ...expedienteData,
        parteConsultante: parteEncontrada,
      });
      toast.success("Expediente encontrado");
    } catch (error) {
      console.error("Error al buscar expediente:", error);
      toast.error("Error al buscar el expediente");
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "No disponible";
    const date = fecha.toDate ? fecha.toDate() : new Date(fecha);
    return date.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEstadoBadge = (estado) => {
    const colores = {
      ACTIVO: "bg-green-100 text-green-800",
      EN_PROCESO: "bg-blue-100 text-blue-800",
      SUSPENDIDO: "bg-yellow-100 text-yellow-800",
      FINALIZADO: "bg-gray-100 text-gray-800",
      ARCHIVADO: "bg-red-100 text-red-800",
    };
    return colores[estado] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100  ">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/professional-legal-office-arbitration-center.png')`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
              Consulta de Expediente
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          </motion.div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto space-y-6 pt-5">
        {/* Formulario de búsqueda */}
        <Card>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numeroExpediente">Número de Expediente</Label>
                <Input
                  id="numeroExpediente"
                  placeholder="Ej: EXP-2024-123456"
                  value={numeroExpediente}
                  onChange={(e) => setNumeroExpediente(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="numeroDocumento">Número de Documento</Label>
                <Input
                  id="numeroDocumento"
                  placeholder="Ej: 12345678"
                  value={numeroDocumento}
                  onChange={(e) => setNumeroDocumento(e.target.value)}
                />
              </div>
            </div>
            <Button
              onClick={buscarExpediente}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Buscando..." : "Buscar Expediente"}
            </Button>
          </CardContent>
        </Card>

        {/* Resultados */}
        {expediente && (
          <div className="space-y-6">
            {/* Información general */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Expediente {expediente.numeroExpediente}</span>
                  <Badge className={getEstadoBadge(expediente.estado)}>
                    {expediente.estado}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Tipo de Servicio
                    </Label>
                    <p className="font-medium">{expediente.tipoServicio}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Materia
                    </Label>
                    <p className="font-medium">{expediente.materia}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Fecha de Presentación
                    </Label>
                    <p className="font-medium">
                      {formatearFecha(expediente.fechaPresentacion)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Fecha de Creación
                    </Label>
                    <p className="font-medium">
                      {formatearFecha(expediente.fechaCreacion)}
                    </p>
                  </div>
                </div>

                {expediente.descripcion && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Descripción
                    </Label>
                    <p className="text-sm bg-muted p-3 rounded-md">
                      {expediente.descripcion}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Información del consultante */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Su Información en el Expediente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Nombre
                    </Label>
                    <p className="font-medium">
                      {expediente.parteConsultante.nombre}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Documento
                    </Label>
                    <p className="font-medium">
                      {expediente.parteConsultante.tipoDocumento}:{" "}
                      {expediente.parteConsultante.numeroDocumento}
                    </p>
                  </div>
                  {expediente.parteConsultante.direccion && (
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Dirección
                      </Label>
                      <p className="font-medium">
                        {expediente.parteConsultante.direccion}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Documentos */}
            {(expediente.documentos?.length > 0 ||
              expediente.anexos?.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documentos del Expediente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {expediente.documentos?.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Documentos Principales
                      </Label>
                      <div className="space-y-2 mt-2">
                        {expediente.documentos.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-muted rounded"
                          >
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{doc.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {expediente.anexos?.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Anexos
                      </Label>
                      <div className="space-y-2 mt-2">
                        {expediente.anexos.map((anexo, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-muted rounded"
                          >
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{anexo.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Información de contacto */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Información Importante
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    • Para consultas adicionales, comuníquese con nuestro
                    bufete.
                  </p>
                  <p>
                    • Mantenga su número de expediente y documento de identidad
                    para futuras consultas.
                  </p>
                  <p>• El estado del expediente se actualiza regularmente.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
