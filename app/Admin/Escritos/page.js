"use client";

import { useState } from "react";
// import { EscritosDataTable } from "@/components/escritos/escritos-data-table";
// import { AddEscritoModal } from "@/components/escritos/add-escrito-modal";
import { Card, CardContent } from "@/components/ui/card";
import { FileTextIcon } from "lucide-react";
import { AddEscritoModal } from "./EscritosModal";
import { EscritosDataTable } from "./EscritosTable";
import useAuthState from "@/lib/useAuthState";
import { auth } from "@/firebase/firebaseClient";

export default function EscritosPage() {
  const [{ user }, loading] = useAuthState(auth);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEscritoAdded = () => {
    // Force refresh of the data table
    setRefreshKey((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              Debe iniciar sesión para acceder a los escritos.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileTextIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Escritos</h1>
            <p className="text-muted-foreground">
              Gestiona tus escritos y respuestas a expedientes
            </p>
          </div>
        </div>

        <AddEscritoModal onEscritoAdded={handleEscritoAdded} />
      </div>

      <EscritosDataTable key={refreshKey} />
    </div>
  );
}
