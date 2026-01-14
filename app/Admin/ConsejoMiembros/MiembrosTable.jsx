"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";

export function MiembrosTable({ onNew, onEdit }) {
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchMiembros();
  }, []);

  const fetchMiembros = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/consejo-miembros");
      const data = await response.json();

      if (data.success) {
        setMiembros(data.members);
      } else {
        toast.error("Error al cargar los miembros");
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      toast.error("Error al cargar los miembros");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/consejo-miembros/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Miembro eliminado exitosamente");
        fetchMiembros();
      } else {
        toast.error("Error al eliminar el miembro");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error("Error al eliminar el miembro");
    }
    setDeleteId(null);
  };

  const toggleActive = async (miembro) => {
    try {
      const response = await fetch(`/api/consejo-miembros/${miembro.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...miembro,
          active: !miembro.active,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          miembro.active
            ? "Miembro desactivado exitosamente"
            : "Miembro activado exitosamente"
        );
        fetchMiembros();
      } else {
        toast.error("Error al cambiar el estado");
      }
    } catch (error) {
      console.error("Error toggling active:", error);
      toast.error("Error al cambiar el estado");
    }
  };

  const moveOrder = async (miembro, direction) => {
    const currentIndex = miembros.findIndex((m) => m.id === miembro.id);
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= miembros.length) return;

    try {
      // Swap orders
      const updates = [
        {
          id: miembros[currentIndex].id,
          order: miembros[newIndex].order,
        },
        {
          id: miembros[newIndex].id,
          order: miembros[currentIndex].order,
        },
      ];

      await Promise.all(
        updates.map((update) =>
          fetch(`/api/consejo-miembros/${update.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ order: update.order }),
          })
        )
      );

      toast.success("Orden actualizado");
      fetchMiembros();
    } catch (error) {
      console.error("Error moving order:", error);
      toast.error("Error al actualizar el orden");
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Cargando miembros...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Miembros del Consejo</CardTitle>
          <Button onClick={onNew}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Miembro
          </Button>
        </CardHeader>
        <CardContent>
          {miembros.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay miembros registrados. Agrega el primer miembro.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">Orden</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {miembros.map((miembro, index) => (
                    <TableRow key={miembro.id}>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => moveOrder(miembro, "up")}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => moveOrder(miembro, "down")}
                            disabled={index === miembros.length - 1}
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {miembro.name}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {miembro.position}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={miembro.active ? "default" : "secondary"}
                        >
                          {miembro.active ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleActive(miembro)}
                            title={
                              miembro.active ? "Desactivar" : "Activar"
                            }
                          >
                            {miembro.active ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(miembro)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(miembro.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              el miembro del consejo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(deleteId)}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}