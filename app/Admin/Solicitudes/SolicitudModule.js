"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import SolicitudesTable from "./SolicitudTable";
import SolicitudModal from "./SolicitudModal";

export default function SolicitudesModule() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSolicitud, setEditingSolicitud] = useState(null);
  const [filters, setFilters] = useState({
    fechaCreacion: "",
    estado: "",
    numeroExpediente: "",
  });

  // Aplicar filtros cuando cambien
  useEffect(() => {
    applyFilters();
  }, [solicitudes, filters]);

  const applyFilters = () => {
    let filtered = [...solicitudes];

    if (filters.fechaCreacion) {
      filtered = filtered.filter((sol) =>
        sol.createdAt.startsWith(filters.fechaCreacion)
      );
    }

    if (filters.estado) {
      filtered = filtered.filter((sol) => sol.estado === filters.estado);
    }

    if (filters.numeroExpediente) {
      filtered = filtered.filter((sol) =>
        sol.numeroExpediente
          .toLowerCase()
          .includes(filters.numeroExpediente.toLowerCase())
      );
    }

    setFilteredSolicitudes(filtered);
  };

  const handleSaveSolicitud = async (solicitudData) => {
    try {
      if (editingSolicitud) {
        // Actualizar solicitud existente
        const updatedSolicitudes = solicitudes.map((sol) =>
          sol.id === editingSolicitud.id
            ? { ...sol, ...solicitudData, updatedAt: new Date().toISOString() }
            : sol
        );
        setSolicitudes(updatedSolicitudes);
        toast("Solicitud actualizada correctamente");
      } else {
        // Crear nueva solicitud
        const newSolicitud = {
          ...solicitudData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          numeroExpediente: `SOL-${new Date().getFullYear()}-${String(
            solicitudes.length + 1
          ).padStart(3, "0")}`,
          estado: "Pendiente",
        };
        setSolicitudes([...solicitudes, newSolicitud]);

        // Simular notificación al administrador
        toast("Se ha enviado una notificación al administrador");
      }

      setModalOpen(false);
      setEditingSolicitud(null);
    } catch (error) {
      console.error("Error saving solicitud:", error);
      toast("No se pudo guardar la solicitud");
    }
  };

  const handleEditSolicitud = (solicitud) => {
    setEditingSolicitud(solicitud);
    setModalOpen(true);
  };

  const handleDeleteSolicitud = async (id) => {
    if (confirm("¿Está seguro de que desea eliminar esta solicitud?")) {
      try {
        const updatedSolicitudes = solicitudes.filter((sol) => sol.id !== id);
        setSolicitudes(updatedSolicitudes);
        toast("Solicitud eliminada correctamente");
      } catch (error) {
        console.error("Error deleting solicitud:", error);
        toast("No se pudo eliminar la solicitud");
      }
    }
  };

  const handleNewSolicitud = () => {
    setEditingSolicitud(null);
    setModalOpen(true);
  };

  const clearFilters = () => {
    setFilters({
      fechaCreacion: "",
      estado: "",
      numeroExpediente: "",
    });
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Módulo de Solicitudes - Sistema de gestión de solicitudes de arbitraje
          con notificaciones automáticas.
        </AlertDescription>
      </Alert>

      {/* Header con botón de nueva solicitud */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Solicitudes</h2>
          <p className="text-muted-foreground">
            Administra las solicitudes de arbitraje
          </p>
        </div>
        <Button
          onClick={handleNewSolicitud}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nueva Solicitud
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="filter-fecha">Fecha de Creación</Label>
              <Input
                id="filter-fecha"
                type="date"
                value={filters.fechaCreacion}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    fechaCreacion: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="filter-estado">Estado</Label>
              <Select
                value={filters.estado}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    estado: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="En revisión">En revisión</SelectItem>
                  <SelectItem value="Aprobada">Aprobada</SelectItem>
                  <SelectItem value="Rechazada">Rechazada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="filter-numero">Número de Expediente</Label>
              <Input
                id="filter-numero"
                placeholder="Buscar por número..."
                value={filters.numeroExpediente}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    numeroExpediente: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters}>
                Limpiar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de solicitudes */}
      <Card>
        <CardHeader>
          <CardTitle>Solicitudes ({filteredSolicitudes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <SolicitudesTable
            solicitudes={filteredSolicitudes}
            loading={loading}
            onEdit={handleEditSolicitud}
            onDelete={handleDeleteSolicitud}
          />
        </CardContent>
      </Card>

      {/* Modal para crear/editar solicitud */}
      <SolicitudModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        solicitud={editingSolicitud}
        onSave={handleSaveSolicitud}
      />
    </div>
  );
}
