// ⚡ Storage perezoso: devuelve las operaciones de Storage SIN incluir el SDK
// en el bundle inicial. Se descarga "firebase/storage" solo cuando se usa.
import { getStorageLazy } from "@/firebase/firebaseReader";

export async function storageOps() {
  const [{ ref, uploadBytes, getDownloadURL, deleteObject }, storage] =
    await Promise.all([import("firebase/storage"), getStorageLazy()]);
  return { storage, ref, uploadBytes, getDownloadURL, deleteObject };
}
