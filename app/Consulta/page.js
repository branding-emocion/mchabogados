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
import { db } from "@/firebase/firebaseReader";
import { motion } from "framer-motion";
import { Aparecer, Escalonar, Elemento } from "@/components/animaciones";

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
      ACTIVO: "border border-[#c9a45c]/40 bg-[#14243e] text-[#e2c488]",
      EN_PROCESO: "border border-[#e6dcc5] bg-[#c9a45c]/15 text-[#7a5f2a]",
      SUSPENDIDO: "border border-[#e6dcc5] bg-[#faf7ef] text-[#7a5f2a]",
      FINALIZADO: "border border-[#e5e8ed] bg-[#f6f4ef] text-[#14243e]",
      ARCHIVADO: "border border-[#c9a45c]/30 bg-[#0b1a33] text-[#f3e3bb]",
    };
    return colores[estado] || "border border-[#e5e8ed] bg-[#f6f4ef] text-[#14243e]";
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#0b1a33]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('/professional-legal-office-arbitration-center.webp')`,
          }}
          aria-hidden="true"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,20,38,0.92)_0%,rgba(11,32,62,0.78)_45%,rgba(20,50,90,0.45)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#c9a45c]/20 blur-3xl"
        />

        <div className="home-shell relative pb-12 pt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#c9a45c]/40 bg-[#c9a45c]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f3e3bb]">
              <Search className="h-4 w-4" aria-hidden="true" />
              Consulta en línea
            </span>
            <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl">
              Consulta de expediente
            </h1>
            <div
              aria-hidden="true"
              className="mx-auto mb-5 mt-6 h-[3px] w-24 rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
            />
            <p className="mx-auto max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Ingrese el número de expediente y su documento para ver el estado
              de su procedimiento.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="home-shell">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="text-center">
              <p className="home-kicker">Seguimiento de casos</p>
              <h2 className="home-title mt-3">Encuentre su expediente</h2>
              <p className="home-copy mx-auto mt-4 max-w-2xl">
                La información mostrada corresponde al registro oficial del
                centro. Mantenga sus datos a la mano para futuras consultas.
              </p>
            </div>

            {/* Formulario de búsqueda */}
            <Aparecer>
              <Card className="relative overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                />
                <CardContent className="space-y-5 p-8">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="numeroExpediente" className="font-semibold text-[#14243e]">Número de Expediente</Label>
                      <Input
                        id="numeroExpediente"
                        placeholder="Ej: EXP-2024-123456"
                        value={numeroExpediente}
                        onChange={(e) => setNumeroExpediente(e.target.value)}
                        className="h-12 border-[#e5e8ed] bg-white text-[#14243e] placeholder:text-[#8a94a3] focus-visible:border-[#c9a45c] focus-visible:ring-[#c9a45c]/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numeroDocumento" className="font-semibold text-[#14243e]">Número de Documento</Label>
                      <Input
                        id="numeroDocumento"
                        placeholder="Ej: 12345678"
                        value={numeroDocumento}
                        onChange={(e) => setNumeroDocumento(e.target.value)}
                        className="h-12 border-[#e5e8ed] bg-white text-[#14243e] placeholder:text-[#8a94a3] focus-visible:border-[#c9a45c] focus-visible:ring-[#c9a45c]/30"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={buscarExpediente}
                    disabled={loading}
                    className="min-h-12 w-full rounded-xl bg-[#c9a45c] font-bold text-[#0b1a33] transition-all hover:bg-[#a48041] hover:text-white hover:shadow-[0_15px_40px_-12px_rgba(201,164,92,0.8)]"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {loading ? "Buscando..." : "Buscar Expediente"}
                  </Button>
                </CardContent>
              </Card>
            </Aparecer>

            {/* Resultados */}
            {expediente && (
              <Escalonar className="space-y-6">
                {/* Información general */}
                <Elemento>
                  <Card className="relative overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white shadow-[0_18px_48px_-28px_rgba(14,31,58,0.35)] transition-colors hover:border-[#c9a45c]/60">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                    />
                    <CardHeader className="pt-8">
                      <CardTitle className="flex items-center justify-between gap-4 font-[family-name:var(--font-playfair)] text-2xl font-medium tracking-[-0.02em] text-[#14243e]">
                        <span>Expediente {expediente.numeroExpediente}</span>
                        <Badge className={getEstadoBadge(expediente.estado)}>
                          {expediente.estado}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-8 pt-2">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <Label className="text-sm font-medium text-[#5b6a7f]">
                            Tipo de Servicio
                          </Label>
                          <p className="font-medium text-[#14243e]">{expediente.tipoServicio}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-[#5b6a7f]">
                            Materia
                          </Label>
                          <p className="font-medium text-[#14243e]">{expediente.materia}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-[#5b6a7f]">
                            Fecha de Presentación
                          </Label>
                          <p className="font-medium text-[#14243e]">
                            {formatearFecha(expediente.fechaPresentacion)}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-[#5b6a7f]">
                            Fecha de Creación
                          </Label>
                          <p className="font-medium text-[#14243e]">
                            {formatearFecha(expediente.fechaCreacion)}
                          </p>
                        </div>
                      </div>

                      {expediente.descripcion && (
                        <div>
                          <Label className="text-sm font-medium text-[#5b6a7f]">
                            Descripción
                          </Label>
                          <p className="mt-2 rounded-xl border border-[#e5e8ed] bg-[#f6f4ef] p-4 text-sm leading-6 text-[#14243e]">
                            {expediente.descripcion}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Elemento>

                {/* Información del consultante */}
                <Elemento>
                  <Card className="relative overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white shadow-[0_18px_48px_-28px_rgba(14,31,58,0.35)] transition-colors hover:border-[#c9a45c]/60">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                    />
                    <CardHeader className="pt-8">
                      <CardTitle className="flex items-center gap-4 font-[family-name:var(--font-playfair)] text-2xl font-medium tracking-[-0.02em] text-[#14243e]">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30">
                          <User className="h-6 w-6" strokeWidth={1.4} />
                        </span>
                        Su Información en el Expediente
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-2">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <Label className="text-sm font-medium text-[#5b6a7f]">
                            Nombre
                          </Label>
                          <p className="font-medium text-[#14243e]">
                            {expediente.parteConsultante.nombre}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-[#5b6a7f]">
                            Documento
                          </Label>
                          <p className="font-medium text-[#14243e]">
                            {expediente.parteConsultante.tipoDocumento}:{" "}
                            {expediente.parteConsultante.numeroDocumento}
                          </p>
                        </div>
                        {expediente.parteConsultante.direccion && (
                          <div className="md:col-span-2">
                            <Label className="text-sm font-medium text-[#5b6a7f]">
                              Dirección
                            </Label>
                            <p className="font-medium text-[#14243e]">
                              {expediente.parteConsultante.direccion}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Elemento>

                {/* Documentos */}
                {(expediente.documentos?.length > 0 ||
                  expediente.anexos?.length > 0) && (
                  <Elemento>
                    <Card className="relative overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white shadow-[0_18px_48px_-28px_rgba(14,31,58,0.35)] transition-colors hover:border-[#c9a45c]/60">
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                      />
                      <CardHeader className="pt-8">
                        <CardTitle className="flex items-center gap-4 font-[family-name:var(--font-playfair)] text-2xl font-medium tracking-[-0.02em] text-[#14243e]">
                          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30">
                            <FileText className="h-6 w-6" strokeWidth={1.4} />
                          </span>
                          Documentos del Expediente
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 p-8 pt-2">
                        {expediente.documentos?.length > 0 && (
                          <div>
                            <Label className="text-sm font-medium text-[#5b6a7f]">
                              Documentos Principales
                            </Label>
                            <div className="mt-2 space-y-2">
                              {expediente.documentos.map((doc, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 rounded-xl border border-[#e5e8ed] bg-white p-3 transition-colors hover:bg-[#faf7ef]"
                                >
                                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#14243e] text-[#e2c488]">
                                    <FileText className="h-4 w-4" />
                                  </span>
                                  <span className="text-sm font-medium text-[#14243e]">{doc.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {expediente.anexos?.length > 0 && (
                          <div>
                            <Label className="text-sm font-medium text-[#5b6a7f]">
                              Anexos
                            </Label>
                            <div className="mt-2 space-y-2">
                              {expediente.anexos.map((anexo, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 rounded-xl border border-[#e5e8ed] bg-white p-3 transition-colors hover:bg-[#faf7ef]"
                                >
                                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#14243e] text-[#e2c488]">
                                    <FileText className="h-4 w-4" />
                                  </span>
                                  <span className="text-sm font-medium text-[#14243e]">{anexo.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Elemento>
                )}

                {/* Información de contacto */}
                <Elemento>
                  <Card className="relative overflow-hidden rounded-3xl border border-[#c9a45c]/30 bg-[#0b1a33] text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#c9a45c]/15 blur-3xl"
                    />
                    <CardHeader className="relative pt-8">
                      <CardTitle className="flex items-center gap-4 font-[family-name:var(--font-playfair)] text-2xl font-medium tracking-[-0.02em] text-[#e2c488]">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#c9a45c] text-[#0b1a33] shadow-lg">
                          <AlertCircle className="h-6 w-6" strokeWidth={1.6} />
                        </span>
                        Información Importante
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative p-8 pt-2">
                      <div className="space-y-2 text-sm leading-6 text-white/75">
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
                </Elemento>
              </Escalonar>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
