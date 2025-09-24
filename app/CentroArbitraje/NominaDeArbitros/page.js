"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Users, Calendar, Download } from "lucide-react";
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

  console.log("empleados", empleados);

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
      const result = await nominaService.getEmpleados(
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
      const total = await nominaService.getTotalEmpleados(searchQuery);
      setTotalEmpleados(total);
    } catch (error) {
      console.error("Error loading total empleados:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearchTerm(searchTerm);
    loadEmpleados(true, searchTerm);
    loadTotalEmpleados(searchTerm);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setCurrentPage((prev) => prev + 1);
      loadEmpleados(false, activeSearchTerm);
    }
  };
  return (
    <div className="min-h-screen ">
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
              NÓMINA DE ÁRBITROS
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8" />
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSearchSubmit} className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button
                type="submit"
                className="h-12 px-8 bg-[#a5803d] hover:bg-[#8a6b32]"
              >
                Buscar
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Empleados Table */}
        <Card className="shadow-lg">
          <CardHeader className="bg-[#a5803d] text-white">
            <CardTitle className="text-2xl font-bold text-center">
              NÓMINA DE ÁRBITROS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading && empleados.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a5803d] mx-auto"></div>
                <p className="mt-4 text-gray-600">Cargando empleados...</p>
              </div>
            ) : empleados.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  {activeSearchTerm
                    ? `No se encontraron empleados para "${activeSearchTerm}"`
                    : "No se encontraron empleados"}
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#8a6b32] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">
                          ID
                        </th>
                        <th className="px-6 py-4 text-left font-semibold">
                          NOMBRE
                        </th>
                        <th className="px-6 py-4 text-left font-semibold">
                          CV
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {empleados
                        .sort((a, b) => a.nombre.localeCompare(b.nombre)) // orden alfabético por nombre
                        .map((empleado, index) => (
                          <tr
                            key={empleado.id}
                            className={`border-b hover:bg-amber-50 transition-colors ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }`}
                          >
                            <td className="px-6 py-4 font-medium text-[#a5803d]">
                              {(currentPage - 1) * pageSize + index + 1}
                            </td>
                            <td className="px-6 py-4 font-medium uppercase">
                              {empleado.nombre}
                            </td>
                            <td className="px-6 py-4">
                              {empleado.cvUrl ? (
                                <a
                                  href={empleado.cvUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-[#a5803d] hover:text-[#8a6b32] font-medium"
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Descargar CV
                                </a>
                              ) : (
                                <span className="text-gray-400">Sin CV</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="p-6 text-center border-t">
                    <Button
                      onClick={loadMore}
                      disabled={loading}
                      className="bg-[#a5803d] hover:bg-[#8a6b32] uppercase hover:cursor-pointer"
                    >
                      {loading ? "Cargando..." : "Cargar más"}
                    </Button>
                  </div>
                )}

                {/* Results Info */}
                <div className="px-6 py-4 bg-gray-50 border-t text-center text-gray-600">
                  Mostrando {empleados.length} de {totalEmpleados} nómina
                  {activeSearchTerm && (
                    <span> para &quot;{activeSearchTerm}&quot;</span>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
