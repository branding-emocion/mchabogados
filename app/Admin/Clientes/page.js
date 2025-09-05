"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/firebase/firebaseClient";
import ClientModal from "./ClienteModal";
import DeleteClientDialog from "./DeleteClienteDialog";

export default function ClientsDataTable() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    client: null,
  });

  // Cargar clientes desde Firebase
  const loadClients = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "clientes"));
      const clientsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClients(clientsData);
      setFilteredClients(clientsData);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
      toast.error("Error al cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    let filtered = clients;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (client) =>
          (client.nombres || client.nombre)
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          client.apellidos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.telefono?.includes(searchTerm) ||
          (client.numeroDocumento || client.numeroIdentificacion)?.includes(
            searchTerm
          ) ||
          client.profesion?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredClients(filtered);
  }, [clients, searchTerm]);

  const handleEdit = (client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleDelete = (client) => {
    setDeleteDialog({ open: true, client });
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "clientes", deleteDialog.client.id));
      toast.success("Cliente eliminado exitosamente");
      loadClients();
      setDeleteDialog({ open: false, client: null });
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      toast.error("Error al eliminar el cliente");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingClient(null);
    loadClients();
  };

  const formatAddress = (client) => {
    const parts = [];
    if (client.direccion) parts.push(client.direccion);
    if (client.distrito) parts.push(client.distrito);
    if (client.provincia) parts.push(client.provincia);
    if (client.departamento) parts.push(client.departamento);
    return parts.length > 0 ? parts.join(", ") : "Sin dirección";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con título y botón nuevo cliente */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Gestión de Clientes
          </h1>
          <p className="text-muted-foreground">
            Administra la información de todos tus clientes
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Búsqueda de Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, email, teléfono, documento o profesión..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabla de clientes */}
      <Card>
        <CardHeader>
          <CardTitle>Clientes Registrados ({filteredClients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredClients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No se encontraron clientes
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Identificación</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Profesión</TableHead>
                    <TableHead>Fecha Registro</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {client.nombres || client.nombre} {client.apellidos}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {client.email || "Sin email"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {client.telefono || "Sin teléfono"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-mono">
                            {client.numeroDocumento ||
                              client.numeroIdentificacion ||
                              "Sin documento"}
                          </div>
                          <div className="text-muted-foreground capitalize">
                            {client.tipoDocumento?.replace("-", " ") ||
                              "Sin especificar"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className="text-sm max-w-xs truncate"
                          title={formatAddress(client)}
                        >
                          {formatAddress(client)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {client.profesion || "Sin especificar"}
                        </div>
                      </TableCell>
                      <TableCell>
                        {client.fechaRegistro
                          ? client.fechaRegistro.seconds
                            ? new Date(
                                client.fechaRegistro.seconds * 1000
                              ).toLocaleDateString("es-PE")
                            : new Date(client.fechaRegistro).toLocaleDateString(
                                "es-PE"
                              )
                          : new Date().toLocaleDateString("es-PE")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(client)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(client)}
                            className="text-red-600 hover:text-red-700"
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
          )}
        </CardContent>
      </Card>

      {/* Modal de cliente */}
      <ClientModal
        open={isModalOpen}
        onOpenChange={handleModalClose}
        client={editingClient}
      />

      {/* Diálogo de eliminación */}
      <DeleteClientDialog
        open={deleteDialog.open}
        onOpenChange={() => setDeleteDialog({ open: false, client: null })}
        client={deleteDialog.client}
        onClientDeleted={confirmDelete}
        clientName={
          deleteDialog.client
            ? `${deleteDialog.client.nombres || deleteDialog.client.nombre} ${
                deleteDialog.client.apellidos
              }`
            : ""
        }
      />
    </div>
  );
}
