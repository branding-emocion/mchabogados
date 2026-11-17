// app/api/consejo-miembros/[id]/route.js
import { NextResponse } from "next/server";
import { dbAdmin } from "@/firebase/firebaseAdmin";

// Módulo compartido: error claro si faltan las credenciales.
function getAdminFirestore() {
  return dbAdmin;
}

export async function PUT(request, { params }) {
  try {
    const db = getAdminFirestore();
    const { id } = params;
    const data = await request.json();

    const updateData = {
      ...data,
      updatedAt: new Date(),
    };

    await db.collection("consejoMiembros").doc(id).update(updateData);

    return NextResponse.json({
      success: true,
      message: "Miembro actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const db = getAdminFirestore();
    const { id } = params;

    await db.collection("consejoMiembros").doc(id).delete();

    return NextResponse.json({
      success: true,
      message: "Miembro eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}