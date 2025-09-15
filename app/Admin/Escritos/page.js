"use client";

import { useState } from "react";
import TableEscritos from "./TableEscritos";
import useAuthState from "@/lib/useAuthState";
import { auth } from "@/firebase/firebaseClient";

export default function EscritosPage() {
  const [{ user, claims }, loading, error] = useAuthState(auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpediente, setEditingExpediente] = useState(null);

  const handleEdit = (expediente) => {
    setEditingExpediente(expediente);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingExpediente(null);
  };

  return (
    <>
      {/* <ExpedienteModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        expediente={editingExpediente}
      /> */}
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        {loading && <p>Loading ...</p>}{" "}
        {user?.uid && (
          <TableEscritos onEdit={handleEdit} user={user} claims={claims} />
        )}
      </div>
    </>
  );
}
