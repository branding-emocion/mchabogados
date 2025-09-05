"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Users, Calendar, Activity } from "lucide-react";
import { db } from "@/firebase/firebaseClient";
import ExpedienteModal from "./ModalExpediente";
import ExpedientesDataTable from "./DataTable";

export default function ExpedientesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpediente, setEditingExpediente] = useState(null);
  const [expedientes, setExpedientes] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    activos: 0,
    clientesConExpedientes: 0,
    esteMes: 0,
  });

  useEffect(() => {
    const q = query(collection(db, "expedientes"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const expedientesData = [];
      querySnapshot.forEach((doc) => {
        expedientesData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setExpedientes(expedientesData);

      // Calcular estadísticas
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const activos = expedientesData.filter(
        (exp) => exp.estado === "ACTIVO" || exp.estado === "EN_PROCESO"
      ).length;
      const esteMes = expedientesData.filter((exp) => {
        const fechaCreacion = exp.fechaCreacion?.toDate
          ? exp.fechaCreacion.toDate()
          : new Date(exp.fechaCreacion);
        return fechaCreacion >= startOfMonth;
      }).length;

      // Contar clientes únicos con expedientes
      const clientesUnicos = new Set();
      expedientesData.forEach((exp) => {
        if (exp.partes) {
          exp.partes.forEach((parte) => {
            if (parte.nombre && parte.nombre.trim() !== "") {
              clientesUnicos.add(parte.nombre.toLowerCase());
            }
          });
        }
      });

      setStats({
        total: expedientesData.length,
        activos,
        clientesConExpedientes: clientesUnicos.size,
        esteMes,
      });
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (expediente) => {
    setEditingExpediente(expediente);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingExpediente(null);
  };

  const handleView = (expediente) => {
    // TODO: Implementar vista de detalles del expediente
    console.log("Ver expediente:", expediente);
  };

  return (
    <>
      {" "}
      <ExpedienteModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        expediente={editingExpediente}
      />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestión de Expedientes
            </h1>
            <p className="text-muted-foreground mt-1">
              Administra los expedientes legales de tu bufete
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Expediente
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expedientes
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Expedientes registrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activos</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activos}</div>
              <p className="text-xs text-muted-foreground">En proceso</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.clientesConExpedientes}
              </div>
              <p className="text-xs text-muted-foreground">Con expedientes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.esteMes}</div>
              <p className="text-xs text-muted-foreground">
                Nuevos expedientes
              </p>
            </CardContent>
          </Card>
        </div>

        <ExpedientesDataTable onEdit={handleEdit} onView={handleView} />
      </div>
    </>
  );
}
