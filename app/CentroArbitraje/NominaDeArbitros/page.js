"use client";
import { motion } from "framer-motion";
import { Aparecer } from "@/components/animaciones";
import { useState, useEffect } from "react";
import { Search, Users, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { nominaService } from "@/lib/NominaService";

export default function NominaClient() {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEmpleados, setTotalEmpleados] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);

  const pageSize = 10;

  useEffect(() => {
    loadEmpleados();
    loadTotalEmpleados();
  }, []);

  const loadEmpleados = async (
    reset = true,
    searchQuery = activeSearchTerm
  ) => {
    try {
      setLoading(true);
      const result = await nominaService.getEmpleadosOrganzados(
        pageSize,
        reset ? null : lastDoc,
        searchQuery
      );

      if (reset) {
        setEmpleados(result.empleados);
        setCurrentPage(1);
      } else {
        setEmpleados((prev) => [...prev, ...result.empleados]);
      }

      setLastDoc(result.lastDoc);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error("Error loading empleados:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTotalEmpleados = async (searchQuery = activeSearchTerm) => {
    try {
      // Assuming the service returns an object with empleados array, we count the length
      const result = await nominaService.getEmpleadosOrganzados(
        null, // No page size limit for total count
        null, // No pagination for total count
        searchQuery
      );
      // If the service returns a number directly, use it; otherwise count empleados
      const total =
        typeof result === "number"
          ? result
          : result.empleados
          ? result.empleados.length
          : 0;
      setTotalEmpleados(total);
    } catch (error) {
      console.error("Error loading total empleados:", error);
      setTotalEmpleados(0);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    setActiveSearchTerm(trimmedSearchTerm);
    setCurrentPage(1);
    setLastDoc(null);
    setHasMore(false);
    loadEmpleados(true, trimmedSearchTerm);
    loadTotalEmpleados(trimmedSearchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setActiveSearchTerm("");
    setCurrentPage(1);
    setLastDoc(null);
    setHasMore(false);
    loadEmpleados(true, "");
    loadTotalEmpleados("");
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setCurrentPage((prev) => prev + 1);
      loadEmpleados(false, activeSearchTerm);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b1a33]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/professional-legal-office-arbitration-center.webp')`,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,20,38,0.93)_0%,rgba(11,32,62,0.82)_45%,rgba(20,50,90,0.45)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-[#c9a45c]/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-20 lg:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-[#c9a45c]/40 bg-[#c9a45c]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f3e3bb]">
              Centro de arbitraje · Nómina oficial
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              Nómina de árbitros en materia de contratación pública
            </h1>
            <div className="mt-6 h-[3px] w-24 rounded-full bg-[#c9a45c]" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Conozca a los profesionales que integran nuestra nómina de
              árbitros especializados en contratación pública. Busque por nombre
              y descargue su hoja de vida.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Search Bar */}
        <Aparecer>
          <Card className="relative mb-8 overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white shadow-[0_18px_48px_-28px_rgba(14,31,58,0.35)]">
            <span
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
            />
            <CardContent className="p-6 sm:p-8">
              <form
                onSubmit={handleSearchSubmit}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a48041]" />
                  <Input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="h-12 border-[#e5e8ed] pl-10 text-base text-[#14243e] placeholder:text-[#727b89] focus-visible:border-[#c9a45c] focus-visible:ring-[#c9a45c]/40"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-12 rounded-xl bg-[#c9a45c] px-8 text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
                >
                  Buscar
                </Button>
                {activeSearchTerm && (
                  <Button
                    type="button"
                    onClick={handleClearSearch}
                    variant="outline"
                    className="h-12 rounded-xl border-[#e5e8ed] bg-transparent px-6 text-sm font-semibold text-[#14243e] hover:border-[#c9a45c]/60 hover:bg-[#faf7ef] hover:text-[#14243e]"
                  >
                    Limpiar
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </Aparecer>

        {/* Empleados Table */}
        <Aparecer retraso={0.1}>
          <Card className="relative overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white shadow-[0_18px_48px_-28px_rgba(14,31,58,0.35)]">
            <span
              aria-hidden="true"
              className="absolute inset-x-8 top-0 z-10 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
            />
            <CardHeader className="border-b border-[#eef1f5] bg-[#14243e] px-6 py-6 sm:px-8">
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <CardTitle className="font-[family-name:var(--font-playfair)] text-2xl font-medium tracking-[-0.02em] text-white">
                  Nómina de árbitros en materia de contratación pública
                </CardTitle>
                <span className="inline-flex items-center rounded-full border border-[#c9a45c]/40 bg-[#c9a45c]/15 px-3 py-1.5 text-[0.63rem] font-semibold uppercase tracking-[0.14em] text-[#f3e3bb]">
                  {totalEmpleados > 0
                    ? `${totalEmpleados} registrados`
                    : "Nómina oficial"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loading && empleados.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#c9a45c]"></div>
                  <p className="mt-4 text-[#5b6a7f]">Cargando empleados...</p>
                </div>
              ) : empleados.length === 0 ? (
                <div className="py-12 text-center">
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] ring-1 ring-[#c9a45c]/30">
                    <Users className="h-7 w-7" strokeWidth={1.4} />
                  </span>
                  <p className="mt-4 text-lg text-[#5b6a7f]">
                    {activeSearchTerm
                      ? `No se encontraron empleados para "${activeSearchTerm}"`
                      : "No se encontraron empleados"}
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#14243e] text-white">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#f3e3bb]">
                            ID
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#f3e3bb]">
                            Apellidos
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#f3e3bb]">
                            Nombre
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#f3e3bb]">
                            CV
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {empleados.map((empleado, index) => (
                          <tr
                            key={empleado.id}
                            className="border-b border-[#eef1f5] bg-white transition-colors last:border-0 hover:bg-[#faf7ef]"
                          >
                            <td className="px-6 py-4">
                              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#14243e] text-xs font-bold text-[#e2c488] ring-1 ring-[#c9a45c]/30">
                                {index + 1}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-medium uppercase text-[#14243e]">
                              {empleado.apellido || ""}
                            </td>
                            <td className="px-6 py-4 font-medium uppercase text-[#14243e]">
                              {empleado.nombre}
                            </td>
                            <td className="px-6 py-4">
                              {empleado.cvUrl ? (
                                <a
                                  href={empleado.cvUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#7a5f2a] transition-colors hover:border-[#c9a45c] hover:bg-[#c9a45c] hover:text-[#0b1a33]"
                                >
                                  <Download className="h-4 w-4" />
                                  Descargar CV
                                </a>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-[#eef1f5] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#727b89]">
                                  Sin CV
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Load More Button */}
                  {hasMore && (
                    <div className="border-t border-[#eef1f5] p-6 text-center">
                      <Button
                        onClick={loadMore}
                        disabled={loading}
                        className="h-12 rounded-xl bg-[#c9a45c] px-8 text-sm font-bold uppercase text-[#0b1a33] transition-all hover:cursor-pointer hover:bg-[#e8cf8f]"
                      >
                        {loading ? "Cargando..." : "Cargar más"}
                      </Button>
                    </div>
                  )}

                  {/* Results Info */}
                  <div className="border-t border-[#eef1f5] bg-[#faf7ef] px-6 py-4 text-center text-sm text-[#5b6a7f]">
                    Mostrando {empleados.length}
                    {activeSearchTerm && (
                      <span> para &quot;{activeSearchTerm}&quot;</span>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </Aparecer>

        {/* CTA */}
        <section className="relative mt-12 overflow-hidden rounded-3xl bg-[#0b1a33] px-6 py-12 sm:px-10 lg:px-14">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#c9a45c]/20 blur-3xl"
          />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c9a45c]">
                Centro de arbitraje
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl">
                ¿Necesita designar un árbitro?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                Contáctenos y lo asesoramos en la elección del profesional
                idóneo para su controversia en contratación pública.
              </p>
            </div>
            <Link
              href="/Contacto"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-8 font-sans text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
            >
              Solicitar asesoría
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
