"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Bell, Settings } from "lucide-react";
import { Toaster } from "sonner";
import useAuthState from "@/lib/useAuthState";
import { auth } from "@/firebase/firebaseClient";
import { SolicitudesTable } from "./SolicitudTable";
import { SolicitudModal } from "./SolicitudModal";
import { SolicitudViewer } from "./SolicitudViewer";
import { NotificationsPanel } from "./NotificacionesPanel";

export default function SolicitudesPage() {
  const [{ user, claims }, loading, error] = useAuthState(auth);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [refreshTable, setRefreshTable] = useState(0);

  const isAdmin = claims?.role == "superAdmin";

  const handleNewSolicitud = () => {
    setSelectedSolicitud(null);
    setIsModalOpen(true);
  };

  const handleEditSolicitud = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setIsModalOpen(true);
  };

  const handleViewSolicitud = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setIsViewerOpen(true);
  };

  const handleModalSave = () => {
    setRefreshTable((prev) => prev + 1);
    setIsModalOpen(false);
    setSelectedSolicitud(null);
  };

  const handleSolicitudClick = (solicitudId) => {
    console.log("Navigate to solicitud:", solicitudId);
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

      {/* <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Sistema de Gestión de Solicitudes
        </h1>
        <p className="text-muted-foreground">
          Gestiona solicitudes de arbitraje de manera eficiente y profesional
          {isAdmin ? " - Panel de Administrador" : " - Panel de Cliente"}
        </p>
      </div> */}
      <header className="bg-[#a57f3e]  shadow-md">
        <div className="container w-full  mx-auto px-5 py-11 flex items-center ">
          <h1 className="text-4xl font-bold text-white tracking-wide uppercase ">
            Solicitudes{" "}
          </h1>
        </div>
      </header>
      <div className="container mx-auto py-8 px-4 ">
        <Tabs defaultValue="solicitudes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger
              value="solicitudes"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Solicitudes
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notificaciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solicitudes" className="space-y-6">
            <SolicitudesTable
              key={refreshTable}
              onNew={handleNewSolicitud}
              onEdit={handleEditSolicitud}
              onView={handleViewSolicitud}
            />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <NotificationsPanel
                  userId={user.uid}
                  userRole={claims?.role}
                  onSolicitudClick={handleSolicitudClick}
                />
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estadísticas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Solicitudes Pendientes
                        </span>
                        <span className="font-medium">-</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          En Revisión
                        </span>
                        <span className="font-medium">-</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Aprobadas
                        </span>
                        <span className="font-medium">-</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <SolicitudModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          solicitud={selectedSolicitud}
          onSave={handleModalSave}
        />

        <SolicitudViewer
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          solicitud={selectedSolicitud}
        />
      </div>
    </div>
  );
}
