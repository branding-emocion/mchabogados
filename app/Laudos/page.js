"use client";
import { motion } from "framer-motion";
import { Aparecer } from "@/components/animaciones";
import { useState, useEffect } from "react";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  Scale,
  FileSearch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { laudosService } from "@/lib/LaudosService";

export default function HomePage() {
  const [laudos, setLaudos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadLaudos();
  }, []);

  const loadLaudos = async () => {
    try {
      setLoading(true);
      const laudosData = await laudosService.getAllLaudos();
      setLaudos(laudosData);
    } catch (error) {
      console.error("Error cargando laudos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLaudos = laudos.filter(
    (laudo) =>
      laudo.contratista.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laudo.entidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laudo.controversia.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLaudos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLaudos = filteredLaudos.slice(startIndex, endIndex);

  const handleDownload = (laudo) => {
    if (laudo.pdfUrl) {
      window.open(laudo.pdfUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section
          aria-label="Banco de Laudos"
          className="relative isolate overflow-hidden bg-[#0b1a33] text-white"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/professional-legal-office-arbitration-center.webp')`,
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,26,51,0.96)_0%,rgba(11,26,51,0.84)_42%,rgba(11,26,51,0.45)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,26,51,0.9)_0%,transparent_50%,rgba(11,26,51,0.25)_100%)]" />
            <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#c9a45c]/20 blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#c9a45c]/15 blur-3xl" />
          </div>

          <div className="home-shell relative pb-24 pt-36 lg:pb-28 lg:pt-44">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#e2c68d]">
                <Scale className="h-4 w-4" aria-hidden="true" /> Centro de arbitraje
              </p>
              <h1 className="home-hero-title mt-6 text-white">
                Banco de{" "}
                <span className="font-normal italic text-[#ddc18a]">Laudos</span>
              </h1>
              <div
                aria-hidden="true"
                className="mt-7 h-[3px] w-24 rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
              />
            </motion.div>
          </div>
        </section>

        {/* Skeletons de carga */}
        <section className="relative overflow-hidden bg-white pb-20 pt-16 lg:pb-24 lg:pt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#f6f1e3] blur-3xl"
          />
          <div className="home-shell relative" role="status" aria-label="Cargando laudos">
            <div className="mx-auto h-6 w-48 animate-pulse rounded-full bg-[#eef1f5]" />
            <div className="mx-auto mt-6 h-12 w-full max-w-md animate-pulse rounded-xl bg-[#eef1f5]" />
            <div className="mt-10 overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-6">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="flex items-center gap-4 border-b border-[#eef1f5] py-4 last:border-0">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-[#eef1f5]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 animate-pulse rounded-md bg-[#eef1f5]" />
                    <div className="h-3 w-1/2 animate-pulse rounded-md bg-[#eef1f5]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        aria-label="Banco de Laudos"
        className="relative isolate overflow-hidden bg-[#0b1a33] text-white"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/professional-legal-office-arbitration-center.webp')`,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,26,51,0.96)_0%,rgba(11,26,51,0.84)_42%,rgba(11,26,51,0.45)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,26,51,0.9)_0%,transparent_50%,rgba(11,26,51,0.25)_100%)]" />
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#c9a45c]/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#c9a45c]/15 blur-3xl" />
        </div>

        <div className="home-shell relative pb-24 pt-36 lg:pb-28 lg:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#e2c68d]">
              <Scale className="h-4 w-4" aria-hidden="true" /> Centro de arbitraje
            </p>
            <h1 className="home-hero-title mt-6 text-white">
              Banco de{" "}
              <span className="font-normal italic text-[#ddc18a]">Laudos</span>
            </h1>
            <div
              aria-hidden="true"
              className="mt-7 h-[3px] w-24 rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
            />
            <p className="mt-7 max-w-xl text-base leading-8 text-white/80 sm:text-lg sm:leading-8">
              Consulte los laudos publicados por nuestro centro de arbitraje.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white pb-20 pt-16 lg:pb-24 lg:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#f6f1e3] blur-3xl"
        />
        <div className="home-shell relative">
          {/* Header */}
          <Aparecer className="mb-10 text-center lg:mb-12">
            <p className="home-kicker">Biblioteca de laudos</p>
            <h2 className="home-title mt-3">Banco de Laudos</h2>
            <p className="home-copy mx-auto mt-4 max-w-2xl">
              Explore y descargue los laudos disponibles. Utilice el buscador
              para filtrar por contratista, entidad o controversia.
            </p>

            <p className="mx-auto mt-6 inline-flex items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#7a5f2a]">
              N° DE LAUDOS: {filteredLaudos.length}
            </p>

            {/* Buscador */}
            <div className="mx-auto mt-6 max-w-md relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a48041]" />
              <Input
                type="text"
                placeholder="Buscar por contratista, entidad o controversia..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="border-[#e5e8ed] bg-white pl-11 text-[#14243e] placeholder:text-[#87919d] focus:border-[#c9a45c] focus:ring-[#c9a45c]/30"
              />
            </div>
          </Aparecer>

          {/* Tabla de laudos */}
          {filteredLaudos.length === 0 ? (
            <div
              className="rounded-3xl border border-dashed border-[#c9a45c]/50 bg-[#faf7ef] p-10 text-center"
              role="status"
            >
              <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] ring-1 ring-[#c9a45c]/30">
                <FileSearch className="h-7 w-7" strokeWidth={1.4} aria-hidden="true" />
              </span>
              <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[#7a5f2a]">
                No se encontraron laudos con los criterios de búsqueda.
              </p>
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#14243e] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#c9a45c] hover:text-[#0b1a33]"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            <Aparecer
              retraso={0.1}
              className="relative overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white transition-all duration-300 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-8 top-0 z-10 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
              />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0b1a33] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#e2c68d]">
                        ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#e2c68d]">
                        CONTRATISTA
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#e2c68d]">
                        ENTIDAD
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#e2c68d]">
                        CONTROVERSIA
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-[#e2c68d]">
                        LAUDO
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eef1f5]">
                    {currentLaudos.map((laudo, index) => (
                      <tr
                        key={laudo.id}
                        className="transition-colors hover:bg-[#faf7ef]"
                      >
                        <td className="px-6 py-4 font-[family-name:var(--font-playfair)] text-sm font-semibold text-[#a48041]">
                          {String(startIndex + index + 1).padStart(2, "0")}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium uppercase text-[#14243e]">
                          {laudo.contratista}
                        </td>
                        <td className="px-6 py-4 text-sm uppercase text-[#5b6a7f]">
                          {laudo.entidad}
                        </td>
                        <td className="px-6 py-4 text-sm uppercase text-[#5b6a7f]">
                          {laudo.controversia}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(laudo)}
                            aria-label={`Descargar laudo de ${laudo.contratista}`}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#14243e] p-0 text-[#e2c488] transition-all duration-300 hover:bg-[#c9a45c] hover:text-[#0b1a33]"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Aparecer>
          )}

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm leading-6 text-[#6a7788]">
                Mostrando {startIndex + 1} de{" "}
                {Math.min(endIndex, filteredLaudos.length)} de{" "}
                {filteredLaudos.length} resultados
              </p>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="border-[#e5e8ed] bg-white text-[#14243e] hover:border-[#c9a45c]/60 hover:text-[#7a5f2a]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "border-[#14243e] bg-[#14243e] text-white hover:bg-[#c9a45c] hover:text-[#0b1a33]"
                          : "border-[#e5e8ed] bg-white text-[#14243e] hover:border-[#c9a45c]/60 hover:text-[#7a5f2a]"
                      }
                    >
                      {page}
                    </Button>
                  )
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="border-[#e5e8ed] bg-white text-[#14243e] hover:border-[#c9a45c]/60 hover:text-[#7a5f2a]"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
