import { db, storage } from "@/firebase/firebaseClient";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const COLLECTION_NAME = "laudos";

export const laudosService = {
  // Obtener todos los laudos ordenados por fecha de creación (más recientes primero)
  async getAllLaudos() {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy("fechaCreacion", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        fechaCreacion: doc.data().fechaCreacion?.toDate() || new Date(),
      }));
    } catch (error) {
      console.error("Error obteniendo laudos:", error);
      throw error;
    }
  },

  async getAllEmitidos() {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("tipoLaudo", "==", "Banco Laudos"),

        orderBy("fechaCreacion", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        fechaCreacion: doc.data().fechaCreacion?.toDate() || new Date(),
      }));
    } catch (error) {
      console.error("Error obteniendo laudos:", error);
      throw error;
    }
  },
  async getAllDecisiones() {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("tipoLaudo", "==", "Banco de decisiones"),

        orderBy("fechaCreacion", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        fechaCreacion: doc.data().fechaCreacion?.toDate() || new Date(),
      }));
    } catch (error) {
      console.error("Error obteniendo laudos:", error);
      throw error;
    }
  },

  // Agregar nuevo laudo
  async addLaudo(laudoData, pdfFile) {
    try {
      let pdfUrl = null;
      let pdfFileName = null;

      // Subir archivo PDF si existe
      if (pdfFile) {
        const timestamp = Date.now();
        pdfFileName = `laudos/${timestamp}_${pdfFile.name}`;
        const storageRef = ref(storage, pdfFileName);
        const snapshot = await uploadBytes(storageRef, pdfFile);
        pdfUrl = await getDownloadURL(snapshot.ref);
      }

      // Crear documento en Firestore
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...laudoData,
        pdfUrl,
        pdfFileName,
        fechaCreacion: serverTimestamp(),
      });

      return docRef.id;
    } catch (error) {
      console.error("Error agregando laudo:", error);
      throw error;
    }
  },

  // Actualizar laudo existente
  async updateLaudo(id, laudoData, pdfFile = null) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const updateData = { ...laudoData };

      // Si hay un nuevo archivo PDF, subirlo
      if (pdfFile) {
        const timestamp = Date.now();
        const pdfFileName = `laudos/${timestamp}_${pdfFile.name}`;
        const storageRef = ref(storage, pdfFileName);
        const snapshot = await uploadBytes(storageRef, pdfFile);
        const pdfUrl = await getDownloadURL(snapshot.ref);

        updateData.pdfUrl = pdfUrl;
        updateData.pdfFileName = pdfFileName;
      }

      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error("Error actualizando laudo:", error);
      throw error;
    }
  },

  // Eliminar laudo
  async deleteLaudo(id, pdfFileName) {
    try {
      // Eliminar archivo PDF del storage si existe
      if (pdfFileName) {
        const storageRef = ref(storage, pdfFileName);
        await deleteObject(storageRef).catch((error) => {
          console.warn("Error eliminando archivo PDF:", error);
        });
      }

      // Eliminar documento de Firestore
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error("Error eliminando laudo:", error);
      throw error;
    }
  },
};
