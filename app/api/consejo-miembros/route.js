// app/api/consejo-miembros/route.js
// SOLUCIÓN ALTERNATIVA: Usar Firebase Client SDK desde el servidor
import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Inicializar Firebase Admin en la ruta API
function getAdminFirestore() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        type: "service_account",
        project_id: "mchabogados-30867",
        private_key_id: "af42e82cd24c1995c0f2e269ae674b356baf5327",
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: "115778287377470715754",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
          "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url:
          "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40mchabogados-30867.iam.gserviceaccount.com",
        universe_domain: "googleapis.com",
      }),
    });
  }
  return getFirestore();
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