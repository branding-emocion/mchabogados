"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw, Calendar, FileText } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";

const NormativaSection = () => {
  const [isos, setIsos] = useState([]);
  const [loading, setLoading] = useState(false);

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
      console.error("Error cargando isos:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isos.length == 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No hay normativas disponibles
          </h3>
          <p className="text-gray-600">
            Aún no se han publicado normativas ISO.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4 uppercase">
            Normativas ISO
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Consulta las últimas normativas y estándares ISO disponibles
          </p>
        </div>

        {/* Grid de normativas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isos?.map((iso) => (
            <Card
              key={iso.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
            >
              <CardHeader className="pb-4">
                {iso.imagenURL && (
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={iso.imagenURL || ""}
                      alt={iso.nombre}
                      className="w-full h-48 object-contain aspect-square transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {iso.nombre}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    ISO
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <a
                    href={`${iso?.pdfURL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 bg-transparent hover:cursor-pointer"
                    >
                      Ver detalles
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NormativaSection;
