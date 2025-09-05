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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Edit, Trash2, Plus, Filter } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/firebase/firebaseClient";
import ClientModal from "./ClienteModal";
import DeleteClientDialog from "./DeleteClienteDialog";

export function ClientsDataTable() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("todos");
  const [filterStatus, setFilterStatus] = useState("todos");
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

  // Filtrar clientes
  useEffect(() => {
    let filtered = clients;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (client) =>
          client.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.apellidos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.telefono?.includes(searchTerm) ||
          client.numeroIdentificacion?.includes(searchTerm)
      );
    }

    // Filtro por tipo
    if (filterType !== "todos") {
      filtered = filtered.filter((client) => client.tipoCliente === filterType);
    }

    // Filtro por estado
    if (filterStatus !== "todos") {
      filtered = filtered.filter(
        (client) => client.estadoCivil === filterStatus
      );
    }

    setFilteredClients(filtered);
  }, [clients, searchTerm, filterType, filterStatus]);

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

  const getClientTypeColor = (type) => {
    switch (type) {
      case "persona-fisica":
        return "bg-blue-100 text-blue-800";
      case "persona-juridica":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
        <Button
          onClick={(e) => {
            e.preventDefault();
            alert("Hola");
            setIsModalOpen(true);
          }}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, email, teléfono o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Tipo de cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="persona-fisica">Persona Física</SelectItem>
                <SelectItem value="persona-juridica">
                  Persona Jurídica
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Estado civil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="soltero">Soltero/a</SelectItem>
                <SelectItem value="casado">Casado/a</SelectItem>
                <SelectItem value="divorciado">Divorciado/a</SelectItem>
                <SelectItem value="viudo">Viudo/a</SelectItem>
                <SelectItem value="union-libre">Unión Libre</SelectItem>
              </SelectContent>
            </Select>
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
                    <TableHead>Tipo</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Identificación</TableHead>
                    <TableHead>Estado Civil</TableHead>
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
                            {client.nombre} {client.apellidos}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {client.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getClientTypeColor(client.tipoCliente)}
                        >
                          {client.tipoCliente === "persona-fisica"
                            ? "Persona Física"
                            : "Persona Jurídica"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{client.telefono}</div>
                          {client.telefonoSecundario && (
                            <div className="text-muted-foreground">
                              {client.telefonoSecundario}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-mono">
                            {client.numeroIdentificacion}
                          </div>
                          <div className="text-muted-foreground capitalize">
                            {client.tipoIdentificacion?.replace("-", " ")}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">
                          {client.estadoCivil?.replace("-", " ")}
                        </span>
                      </TableCell>
                      <TableCell>
                        {client.fechaRegistro
                          ? new Date(
                              client.fechaRegistro.seconds * 1000
                            ).toLocaleDateString("es-ES")
                          : "N/A"}
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
        isOpen={isModalOpen}
        onClose={handleModalClose}
        client={editingClient}
      />

      {/* Diálogo de eliminación */}
      <DeleteClientDialog
        isOpen={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, client: null })}
        onConfirm={confirmDelete}
        clientName={
          deleteDialog.client
            ? `${deleteDialog.client.nombre} ${deleteDialog.client.apellidos}`
            : ""
        }
      />
    </div>
  );
}
