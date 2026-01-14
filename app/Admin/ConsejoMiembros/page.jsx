"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Settings } from "lucide-react";
import { Toaster } from "sonner";
import useAuthState from "@/lib/useAuthState";
import { auth } from "@/firebase/firebaseClient";
import { MiembrosTable } from "./MiembrosTable";
import { MiembroModal } from "./MiembroModal";

export default function ConsejoMiembrosPage() {
  const [{ user, claims }, loading, error] = useAuthState(auth);
  const [selectedMiembro, setSelectedMiembro] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTable, setRefreshTable] = useState(0);

  const handleNewMiembro = () => {
    setSelectedMiembro(null);
    setIsModalOpen(true);
  };

  const handleEditMiembro = (miembro) => {
    setSelectedMiembro(miembro);
    setIsModalOpen(true);
  };

  const handleModalSave = () => {
    setRefreshTable((prev) => prev + 1);
    setIsModalOpen(false);
    setSelectedMiembro(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">
            Error de autenticación. Por favor, inicia sesión.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />

      <header className="bg-[#a57f3e] shadow-md">
        <div className="container w-full mx-auto px-5 py-11 flex items-center">
          <h1 className="text-4xl font-bold text-white tracking-wide uppercase">
            Consejo Superior de Arbitraje
          </h1>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <Tabs defaultValue="miembros" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="miembros" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Miembros
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuración
            </TabsTrigger>
          </TabsList>

          <TabsContent value="miembros" className="space-y-6">
            <MiembrosTable
              key={refreshTable}
              onNew={handleNewMiembro}
              onEdit={handleEditMiembro}
            />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Módulo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aquí puedes configurar opciones adicionales del módulo de
                  miembros del consejo.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal */}
        <MiembroModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          miembro={selectedMiembro}
          onSave={handleModalSave}
        />
      </div>
    </div>
  );
}