import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// ⚙️ Inicialización diferida (lazy):
// Durante el build/prerender (p. ej. en Vercel) las variables de entorno
// pueden no estar definidas; en ese caso NO se rompe la compilación.
// El error solo aparece si en runtime se usa el SDK sin credenciales.
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const tieneCredenciales = Boolean(privateKey && clientEmail);

// 🔒 Proxy con mensaje claro si se usa Firebase Admin sin credenciales
const proxySinCredenciales = () =>
  new Proxy(
    {},
    {
      get() {
        throw new Error(
          "⚠️ Firebase Admin no está configurado: define FIREBASE_PRIVATE_KEY y FIREBASE_CLIENT_EMAIL en tu entorno (o en Vercel → Settings → Environment Variables)."
        );
      },
    }
  );

let appAdmin;
let dbAdmin;
let AuthAdmin;

if (tieneCredenciales) {
  appAdmin = !admin.apps.length
    ? admin.initializeApp({
        credential: admin.credential.cert({
          type: "service_account",
          project_id: "mchabogados-30867",
          private_key_id: "af42e82cd24c1995c0f2e269ae674b356baf5327",
          private_key: privateKey,
          client_email: clientEmail,
          client_id: "115778287377470715754",
          auth_uri: "https://accounts.google.com/o/oauth2/auth",
          token_uri: "https://oauth2.googleapis.com/token",
          auth_provider_x509_cert_url:
            "https://www.googleapis.com/oauth2/v1/certs",
          client_x509_cert_url:
            "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40mchabogados-30867.iam.gserviceaccount.com",
          universe_domain: "googleapis.com",
        }),
      })
    : admin.app();

  dbAdmin = getFirestore(appAdmin);
  AuthAdmin = getAuth(appAdmin);
} else {
  console.warn(
    "⚠️ FIREBASE_PRIVATE_KEY/FIREBASE_CLIENT_EMAIL sin definir: Firebase Admin queda inactivo (el build/prerender sigue funcionando)."
  );
  dbAdmin = proxySinCredenciales();
  AuthAdmin = proxySinCredenciales();
}

const timeAdmin = admin.firestore.FieldValue.serverTimestamp();

export { dbAdmin, AuthAdmin, timeAdmin };
