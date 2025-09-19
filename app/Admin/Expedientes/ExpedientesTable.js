"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Edit,
  Trash2,
  Mail,
  Calendar,
  Clock,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function ExpedientesTable({
  expedientes,
  loading,
  onEdit,
  onDelete,
}) {
  const [sortField, setSortField] = useState("creacion");
  const [sortDirection, setSortDirection] = useState("desc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedExpedientes = [...expedientes].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "creacion" || sortField === "fechaPresentacion") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: es });
    } catch {
      return dateString;
    }
  };

  const formatDateTime = (dateString) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: es });
    } catch {
      return dateString;
    }
  };

  const EmailsHoverCard = ({ correos }) => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer hover:bg-muted/50 p-1 rounded">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <Badge variant="outline">{correos?.length || 0}</Badge>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Correos Electrónicos
          </h4>
          {correos && correos.length > 0 ? (
            <div className="space-y-1">
              {correos.map((email, index) => (
                <div
                  key={index}
                  className="text-sm p-2 bg-muted/50 rounded flex items-center gap-2"
                >
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="font-mono">{email}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No hay correos registrados
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );

  const FilesHoverCard = ({ archivos }) => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer hover:bg-muted/50 p-1 rounded">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <Badge variant="outline">{archivos?.length || 0}</Badge>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Archivos PDF
          </h4>
          {archivos && archivos.length > 0 ? (
            <div className="space-y-1">
              {archivos.map((archivo, index) => (
                <div key={index} className="text-sm p-2 bg-muted/50 rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileText className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <span className="truncate" title={archivo.name}>
                        {archivo.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => window.open(archivo.url, "_blank")}
                        title="Ver archivo"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No hay archivos registrados
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (expedientes.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No hay expedientes para mostrar</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort("numeroExpediente")}
            >
              N° Expediente
              {sortField === "numeroExpediente" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead>Tipo de Servicio</TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort("fechaPresentacion")}
            >
              Fecha Presentación
              {sortField === "fechaPresentacion" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Tribunal Arbitral</TableHead>
            <TableHead>Secretario</TableHead>
            <TableHead>Correos</TableHead>
            <TableHead>Archivos</TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort("creacion")}
            >
              Creación
              {sortField === "creacion" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead className="text-center">Operaciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedExpedientes.map((expediente) => (
            <TableRow key={expediente.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                {expediente.numeroExpediente}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{expediente.tipoServicio}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {formatDate(expediente.fechaPresentacion)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {expediente.horaPresentacion}
                </div>
              </TableCell>
              <TableCell>{expediente.tribunalArbitral}</TableCell>
              <TableCell>{expediente.secretario}</TableCell>
              <TableCell>
                <EmailsHoverCard correos={expediente.correos} />
              </TableCell>
              <TableCell>
                <FilesHoverCard archivos={expediente.archivos} />
              </TableCell>
              <TableCell>
                <div className="text-sm text-muted-foreground">
                  {formatDateTime(expediente.creacion)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(expediente)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(expediente.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
