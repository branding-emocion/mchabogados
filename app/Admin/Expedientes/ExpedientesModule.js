"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { toast } from "sonner";
import ExpedientesTable from "./ExpedientesTable";
import ExpedienteModal from "./ExpedienteModal";
import { auth, db } from "@/firebase/firebaseClient";
import useAuthState from "@/lib/useAuthState";

export default function ExpedientesModule() {
  const [{ user, claims }, error] = useAuthState(auth);

  const [expedientes, setExpedientes] = useState([]);
  const [filteredExpedientes, setFilteredExpedientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExpediente, setEditingExpediente] = useState(null);
  const [filters, setFilters] = useState({
    fechaPresentacion: "",
    numeroExpediente: "",
  });

  // Cargar expedientes al montar el componente
  useEffect(() => {
    if (!user?.email) return;

    loadExpedientes();
  }, [claims, user]);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    applyFilters();
  }, [expedientes, filters]);

  const loadExpedientes = async () => {
    try {
      setLoading(true);
      const expedientesRef = collection(db, "expedientes");

      let q = null;

      if (claims?.isAdmin || claims?.isSuperAdmin) {
        q = query(expedientesRef, orderBy("creacion", "desc"));
      } else {
        q = query(
          collection(db, "expedientes"),
          where("correos", "array-contains", `${user.email}`)
        );
      }
      const querySnapshot = await getDocs(q);

      const expedientesData = [];
      querySnapshot.forEach((doc) => {
        expedientesData.push({
          id: doc.id,
          ...doc.data(),
          // Convertir timestamps de Firestore a strings para el frontend
          creacion:
            doc.data().creacion?.toDate?.()?.toISOString() ||
            doc.data().creacion,
        });
      });

      setExpedientes(expedientesData);
    } catch (error) {
      console.error("Error loading expedientes:", error);
      toast("No se pudieron cargar los expedientes");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...expedientes];

    if (filters.fechaPresentacion) {
      filtered = filtered.filter(
        (exp) => exp.fechaPresentacion === filters.fechaPresentacion
      );
    }

    if (filters.numeroExpediente) {
      filtered = filtered.filter((exp) =>
        exp.numeroExpediente
          .toLowerCase()
          .includes(filters.numeroExpediente.toLowerCase())
      );
    }

    setFilteredExpedientes(filtered);
  };

  const handleSaveExpediente = async (expedienteData) => {
    try {
      if (editingExpediente) {
        // Actualizar expediente existente
        const expedienteRef = doc(db, "expedientes", editingExpediente.id);
        await updateDoc(expedienteRef, {
          ...expedienteData,
          updatedAt: serverTimestamp(),
        });
        toast("Expediente actualizado correctamente");
      } else {
        // Crear nuevo expediente
        await addDoc(collection(db, "expedientes"), {
          ...expedienteData,
          creacion: serverTimestamp(),
          createdAt: serverTimestamp(),
        });
        toast("Expediente creado correctamente");
      }

      await loadExpedientes();
      setModalOpen(false);
      setEditingExpediente(null);
    } catch (error) {
      console.error("Error saving expediente:", error);
      toast("No se pudo guardar el expediente");
    }
  };

  const handleEditExpediente = (expediente) => {
    setEditingExpediente(expediente);
    setModalOpen(true);
  };

  const handleDeleteExpediente = async (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar este expediente?")) {
      try {
        await deleteDoc(doc(db, "expedientes", id));
        await loadExpedientes();
        toast("Expediente eliminado correctamente");
      } catch (error) {
        console.error("Error deleting expediente:", error);
        toast("No se pudo eliminar el expediente");
      }
    }
  };

  const handleNewExpediente = () => {
    setEditingExpediente(null);
    setModalOpen(true);
  };

  const clearFilters = () => {
    setFilters({
      fechaPresentacion: "",
      numeroExpediente: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header con botón de nuevo expediente */}
      {/* <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Expedientes</h2>
          <p className="text-muted-foreground">
            Administra los expedientes de arbitraje
          </p>
        </div>
        {(claims?.isAdmin || claims?.isSuperAdmin) && (
          <Button
            onClick={handleNewExpediente}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nuevo Expediente
          </Button>
        )}
      </div> */}
      <header className="bg-[#a57f3e]  shadow-md">
        <div className="container  w-full  mx-auto px-5 py-11 flex items-center justify-between ">
          <h1 className="text-4xl font-bold text-white tracking-wide uppercase ">
            Expedientes{" "}
          </h1>
          {(claims?.isAdmin || claims?.isSuperAdmin) && (
            <Button
              onClick={handleNewExpediente}
              className="flex items-center gap-2 hover:cursor-pointer  "
            >
              <Plus className="h-4 w-4" />
              Nuevo Expediente
            </Button>
          )}
        </div>
      </header>
      {/* Filtros */}
      <Card className={"container mx-auto"}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="filter-fecha">Fecha de Presentación</Label>
              <Input
                id="filter-fecha"
                type="date"
                value={filters.fechaPresentacion}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    fechaPresentacion: e.target.value,
                  }))
                }
              />
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

      {/* Tabla de expedientes */}
      <Card className={"container mx-auto"}>
        <CardHeader>
          <CardTitle>Expedientes ({filteredExpedientes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpedientesTable
            expedientes={filteredExpedientes}
            loading={loading}
            onEdit={handleEditExpediente}
            onDelete={handleDeleteExpediente}
          />
        </CardContent>
      </Card>

      {/* Modal para crear/editar expediente */}
      <ExpedienteModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        expediente={editingExpediente}
        onSave={handleSaveExpediente}
      />
    </div>
  );
}
