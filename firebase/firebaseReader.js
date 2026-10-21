// ⚡ Firebase "Reader": solo app + Firestore.
// Usar desde componentes/servicios de lectura PÚBLICA para evitar cargar
// Auth y Storage (que agregan ~100KB de JS) en las páginas del sitio.
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// ⚙️ Inicialización diferida: el build no requiere credenciales
const tieneConfig = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);

const proxySinConfig = () =>
  new Proxy(
    {},
    {
      get() {
        throw new Error(
          "⚠️ Firebase Client no está configurado: define las variables NEXT_PUBLIC_FIREBASE_* en tu .env.local (o en Vercel → Settings → Environment Variables)."
        );
      },
    }
  );

let app;
if (tieneConfig) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} else {
  console.warn(
    "⚠️ NEXT_PUBLIC_FIREBASE_* sin definir: Firebase Reader queda inactivo (el build/prerender sigue funcionando)."
  );
  app = proxySinConfig();
}

export const appReader = app;
export const db = tieneConfig ? getFirestore(app) : proxySinConfig();

/**
 * ⚙️ Storage perezoso: solo se descarga el SDK de Storage si el código
 * realmente sube/lee archivos. Devuelve la instancia lista para usar con
 * las funciones de "firebase/storage" ya importadas dinámicamente.
 */
export async function getStorageLazy() {
  if (!tieneConfig) return proxySinConfig();
  const { getStorage } = await import("firebase/storage");
  return getStorage(app, "gs://mchabogados-30867.firebasestorage.app");
}
