"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AddEscritoModal } from "./EscritosModal";
import { EscritosDataTable } from "./EscritosTable";
import useAuthState from "@/lib/useAuthState";
import { auth } from "@/firebase/firebaseClient";

export default function EscritosPage() {
  const [{ user, claims }, loading] = useAuthState(auth);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEscritoAdded = () => {
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
    <div>
      <AddEscritoModal onEscritoAdded={handleEscritoAdded} />
      <div className="container mx-auto py-8">
        <EscritosDataTable key={refreshKey} claims={claims} />
      </div>
    </div>
  );
}