"use client";

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  FileText,
  Calendar,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { db } from "@/firebase/firebaseClient";
import ModalSubirDocumentosFirmar from "./ModalSubirDocumentosFirmar";

const ESTADOS_EXPEDIENTE = {
  PENDIENTE_FIRMA: {
    label: "Pendiente de Firma",
    color: "bg-orange-100 text-orange-800",
  },
  EN_REVISION: { label: "En Revisión", color: "bg-blue-100 text-blue-800" },
  FIRMADO: { label: "Firmado", color: "bg-green-100 text-green-800" },
  RECHAZADO: { label: "Rechazado", color: "bg-red-100 text-red-800" },
  ARCHIVADO: { label: "Archivado", color: "bg-gray-100 text-gray-800" },
};

export default function TableEscritos({ onEdit, user, claims }) {
  const [expedientes, setExpedientes] = useState([]);
  const [filteredExpedientes, setFilteredExpedientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("todos");
  const [tipoServicioFilter, setTipoServicioFilter] = useState("todos");
  const [estadoModalOpen, setEstadoModalOpen] = useState({
    isOpen: false,
    expediente: {},
  });

  useEffect(() => {
    let q = null;

    if (claims?.isAdmin || claims?.isSuperAdmin) {
      q = query(
        collection(db, "expedientes"),
        orderBy("fechaCreacion", "desc") // si luego quieres ordenar
      );
    } else {
      q = query(
        collection(db, "expedientes"),
        where("ClienteSelector.id", "==", `${user.uid}`)
      );
    }

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const expedientesData = [];
        querySnapshot.forEach((doc) => {
          expedientesData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setExpedientes(expedientesData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching expedientes:", error);
        toast.error("Error al cargar los expedientes");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [claims, user]);

  useEffect(() => {
    let filtered = expedientes;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (expediente) =>
          expediente.numeroExpediente
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          expediente.materia
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          expediente.tipoServicio
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          expediente.partes?.some((parte) =>
            parte.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filtrar por estado
    if (estadoFilter !== "todos") {
      filtered = filtered.filter(
        (expediente) => expediente.estado === estadoFilter
      );
    }

    // Filtrar por tipo de servicio
    if (tipoServicioFilter !== "todos") {
      filtered = filtered.filter(
        (expediente) => expediente.tipoServicio === tipoServicioFilter
      );
    }

    setFilteredExpedientes(filtered);
  }, [expedientes, searchTerm, estadoFilter, tipoServicioFilter]);

  const handleDelete = async (expedienteId) => {
    try {
      await deleteDoc(doc(db, "expedientes", expedienteId));
      toast.success("Expediente eliminado exitosamente");
    } catch (error) {
      console.error("Error deleting expediente:", error);
      toast.error("Error al eliminar el expediente");
    }
  };

  const handleChangeEstado = (expediente) => {
    setExpedienteParaCambioEstado(expediente);
    setEstadoModalOpen(true);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getFirmantesNames = (partes) => {
    if (!partes || partes.length === 0) return "Sin firmantes";
    const nombresValidos = partes.filter(
      (parte) => parte.nombre && parte.nombre.trim() !== ""
    );
    if (nombresValidos.length === 0) return "Sin firmantes";
    if (nombresValidos.length === 1) return nombresValidos[0].nombre;
    return `${nombresValidos[0].nombre} +${nombresValidos.length - 1} más`;
  };

  const getDocumentInfo = (expediente) => {
    const documentos = expediente.documentos || [];
    const anexos = expediente.anexos || [];
    const totalDocs = documentos.length + anexos.length;

    if (totalDocs === 0) return "Sin documentos";

    const pdfCount = [...documentos, ...anexos].filter((doc) =>
      doc.nombre?.toLowerCase().endsWith(".pdf")
    ).length;
    const imgCount = [...documentos, ...anexos].filter((doc) =>
      doc.nombre?.toLowerCase().match(/\.(jpg|jpeg|png)$/i)
    ).length;

    const parts = [];
    if (pdfCount > 0) parts.push(`${pdfCount} PDF`);
    if (imgCount > 0) parts.push(`${imgCount} IMG`);

    return parts.length > 0 ? parts.join(", ") : `${totalDocs} archivos`;
  };

  const tiposServicioUnicos = [
    ...new Set(expedientes.map((exp) => exp.tipoServicio).filter(Boolean)),
  ];

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Cargando expedientes...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Expedientes de Firma Digital ({filteredExpedientes.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por número, materia, tipo de servicio o firmantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={estadoFilter} onValueChange={setEstadoFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              {Object.entries(ESTADOS_EXPEDIENTE).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={tipoServicioFilter}
            onValueChange={setTipoServicioFilter}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrar por servicio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los servicios</SelectItem>
              {tiposServicioUnicos.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabla */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Expediente</TableHead>
                <TableHead>Tipo Servicio</TableHead>
                <TableHead>Materia</TableHead>
                <TableHead>Firmantes</TableHead>
                <TableHead>Estado de Firma</TableHead>
                <TableHead>Fecha Creación</TableHead>
                <TableHead>Documentos</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpedientes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {expedientes.length === 0
                          ? "No hay expedientes de firma registrados"
                          : "No se encontraron expedientes con los filtros aplicados"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredExpedientes.map((expediente) => (
                  <TableRow key={expediente.id}>
                    <TableCell className="font-medium">
                      {expediente.numeroExpediente || "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {expediente.tipoServicio || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div
                        className="max-w-48 truncate"
                        title={expediente.materia}
                      >
                        {expediente.materia || "Sin materia"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {getFirmantesNames(expediente.partes)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          ESTADOS_EXPEDIENTE[expediente.estado]?.color ||
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {ESTADOS_EXPEDIENTE[expediente.estado]?.label ||
                          expediente.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {formatDate(expediente.fechaCreacion)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium text-foreground">
                          {getDocumentInfo(expediente)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Para firma digital
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              setEstadoModalOpen({ isOpen: true, expediente })
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalles
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {estadoModalOpen.isOpen && (
        <ModalSubirDocumentosFirmar
          expediente={estadoModalOpen.expediente}
          onClose={() => setEstadoModalOpen({ isOpen: false, expediente: {} })}
          isOpen={estadoModalOpen.isOpen}
        />
      )}
    </Card>
  );
}
