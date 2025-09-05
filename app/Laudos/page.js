"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
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
      <>
        {/* Hero Section */}
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
                Banco de Laudos
                <br />
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto mb-8" />
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
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
              Banco de Laudos
              <br />
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground mb-8">
              N° DE LAUDOS: {filteredLaudos.length}
            </p>

            {/* Buscador */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar por contratista, entidad o controversia..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabla de laudos */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#a5803d] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      CONTRATISTA
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      ENTIDAD
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      CONTROVERSIA
                    </th>

                    <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                      LAUDO
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentLaudos.map((laudo, index) => (
                    <tr
                      key={laudo.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 uppercase">
                        {laudo.contratista}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 uppercase">
                        {laudo.entidad}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 uppercase">
                        {laudo.controversia}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(laudo)}
                          className="text-[#a5803d] hover:text-blue-800"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
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
                          ? "bg-[#a5803d] hover:bg-blue-800"
                          : ""
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
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>{" "}
    </main>
  );
}
