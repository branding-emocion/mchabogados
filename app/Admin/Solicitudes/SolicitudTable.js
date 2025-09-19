"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Eye,
  FileText,
  Plus,
  Search,
  Filter,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { deleteSolicitud, getSolicitudes } from "./services";
import { auth } from "@/firebase/firebaseClient";
import useAuthState from "@/lib/useAuthState";

const ESTADOS = [
  {
    value: "Pendiente",
    label: "Pendiente",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "En revisión",
    label: "En revisión",
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "Aprobada",
    label: "Aprobada",
    color: "bg-green-100 text-green-800",
  },
  { value: "Rechazada", label: "Rechazada", color: "bg-red-100 text-red-800" },
];

export function SolicitudesTable({ onEdit, onView, onNew }) {
  const [{ user, claims }, loading, error] = useAuthState(auth);
  const [solicitudes, setSolicitudes] = useState([]);
  const [loadingSolicitudes, setLoadingSolicitudes] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    estado: "Todos los estados",
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {
    if (user && claims) {
      loadSolicitudes();
    }
  }, [filters, user, claims]);

  const loadSolicitudes = async () => {
    try {
      setLoadingSolicitudes(true);
      const data = await getSolicitudes(filters, claims.role, user.uid);
      setSolicitudes(data);
    } catch (error) {
      console.error("Error loading solicitudes:", error);
    } finally {
      setLoadingSolicitudes(false);
    }
  };

  const filteredSolicitudes = solicitudes.filter((solicitud) => {
    const matchesSearch =
      !filters.search ||
      solicitud.materia
        ?.toLowerCase()
        .Dincludes(filters.search.toLowerCase()) ||
      solicitud.id.toLowerCase().includes(filters.search.toLowerCase());

    const matchesEstado =
      filters.estado === "Todos los estados" ||
      solicitud.estado === filters.estado;

    return matchesSearch && matchesEstado;
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("es-ES");
  };

  const getEstadoBadge = (estado) => {
    const estadoConfig = ESTADOS.find((e) => e.value === estado) || ESTADOS[0];
    return (
      <Badge className={`${estadoConfig.color} border-0`}>
        {estadoConfig.label}
      </Badge>
    );
  };

  const DocumentsHoverCard = ({ documents, title }) => {
    if (!documents || documents.length === 0) {
      return <span className="text-muted-foreground">Sin archivos</span>;
    }

    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="sm" className="h-auto p-1">
            <FileText className="h-4 w-4 mr-1" />
            {documents.length} archivo{documents.length !== 1 ? "s" : ""}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">{title}</h4>
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <span className="truncate flex-1">{doc.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(doc.url, "_blank")}
                  className="h-6 px-2"
                >
                  Ver
                </Button>
              </div>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  const handleDelete = async (solicitud) => {
    try {
      await deleteSolicitud(solicitud.id);
      toast.success("Solicitud eliminada exitosamente");
      loadSolicitudes();
    } catch (error) {
      console.error("Error deleting solicitud:", error);
      toast.error("Error al eliminar la solicitud");
    }
  };

  // Show loading state while auth is loading
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground mt-2">Cargando...</p>
      </div>
    );
  }

  // Show error if auth failed
  if (error || !user) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">
          Error de autenticación. Por favor, inicia sesión.
        </p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Gestión de Solicitudes
            {claims?.role === "cliente" && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                (Mis solicitudes)
              </span>
            )}
          </CardTitle>
          <Button onClick={onNew} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Solicitud
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por materia o ID..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="pl-10"
            />
          </div>

          <Select
            value={filters.estado}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, estado: value }))
            }
          >
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos los estados">
                Todos los estados
              </SelectItem>
              {ESTADOS.map((estado) => (
                <SelectItem key={estado.value} value={estado.value}>
                  {estado.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Input
              type="date"
              placeholder="Fecha desde"
              value={filters.dateFrom}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))
              }
              className="w-full sm:w-40"
            />
            <Input
              type="date"
              placeholder="Fecha hasta"
              value={filters.dateTo}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, dateTo: e.target.value }))
              }
              className="w-full sm:w-40"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {loadingSolicitudes ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">
              Cargando solicitudes...
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Materia</TableHead>
                  <TableHead>Tipo de Servicio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Documentos</TableHead>
                  <TableHead>Anexos</TableHead>
                  <TableHead>Fecha Creación</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSolicitudes.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No se encontraron solicitudes
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSolicitudes.map((solicitud) => (
                    <TableRow key={solicitud.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">
                        {solicitud.id.slice(-8)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {solicitud.materia}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {solicitud.tipoServicio}
                        </Badge>
                      </TableCell>
                      <TableCell>{getEstadoBadge(solicitud.estado)}</TableCell>
                      <TableCell>
                        <DocumentsHoverCard
                          documents={solicitud.documentos}
                          title="Documentos"
                        />
                      </TableCell>
                      <TableCell>
                        <DocumentsHoverCard
                          documents={solicitud.anexos}
                          title="Anexos"
                        />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(solicitud.created_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(solicitud)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(solicitud)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {claims?.role !== "cliente" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(solicitud)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
