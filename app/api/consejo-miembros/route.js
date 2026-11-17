// app/api/consejo-miembros/route.js
import { NextResponse } from "next/server";
import { dbAdmin } from "@/firebase/firebaseAdmin";

// Usa el módulo compartido: si faltan FIREBASE_PRIVATE_KEY /
// FIREBASE_CLIENT_EMAIL lanza un error claro en vez del críptico
// "Service account object must contain a string private_key".
function getAdminFirestore() {
  return dbAdmin;
}

export async function GET() {
  try {
    const db = getAdminFirestore();
    const membersRef = db.collection("consejoMiembros");
    const snapshot = await membersRef.orderBy("order", "asc").get();

    const members = [];
    snapshot.forEach((doc) => {
      members.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return NextResponse.json({ success: true, members });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const db = getAdminFirestore();
    const data = await request.json();
    
    const memberData = {
      name: data.name,
      position: data.position,
      image: data.image,
      cv: data.cv || null,
      order: data.order || 0,
      active: data.active !== undefined ? data.active : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await db.collection("consejoMiembros").add(memberData);

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: "Miembro creado exitosamente",
    });
  } catch (error) {
    console.error("Error creating member:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}