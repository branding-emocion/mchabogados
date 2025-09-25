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
  limit,
  startAfter,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const COLLECTION_NAME = "nomina";

export const nominaService = {
  // Agregar empleado
  async addEmpleado(empleadoData) {
    try {
      let cvUrl = null;

      // Upload CV PDF if provided
      if (empleadoData.cvFile) {
        const cvRef = ref(
          storage,
          `nomina/cv/${Date.now()}_${empleadoData.cvFile.name}`
        );
        const snapshot = await uploadBytes(cvRef, empleadoData.cvFile);
        cvUrl = await getDownloadURL(snapshot.ref);
      }

      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        nombre: empleadoData.nombre || "",
        cvUrl: cvUrl,
        cvFileName: empleadoData.cvFile?.name || null,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
        apellido: empleadoData.apellido || "",
      });
      return {
        id: docRef.id,
        nombre: empleadoData.nombre,
        apellido: empleadoData.apellido || "",
        cvUrl,
        cvFileName: empleadoData.cvFile?.name,
      };
    } catch (error) {
      console.error("Error adding empleado:", error);
      throw error;
    }
  },

  // Obtener empleados con paginación
  async getEmpleados(pageSize = 10, lastDoc = null, searchTerm = "") {
    try {
      let q = query(
        collection(db, COLLECTION_NAME),
        orderBy("fechaCreacion", "desc"),
        limit(pageSize)
      );

      if (lastDoc) {
        q = query(
          collection(db, COLLECTION_NAME),
          orderBy("fechaCreacion", "desc"),
          startAfter(lastDoc),
          limit(pageSize)
        );
      }

      const querySnapshot = await getDocs(q);
      const empleados = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          !searchTerm ||
          data.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (data.cvFileName &&
            data.cvFileName.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          empleados.push({
            id: doc.id,
            ...data,
            fechaCreacion: data.fechaCreacion?.toDate(),
            fechaActualizacion: data.fechaActualizacion?.toDate(),
          });
        }
      });

      return {
        empleados,
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
        hasMore: querySnapshot.docs.length === pageSize,
      };
    } catch (error) {
      console.error("Error getting empleados:", error);
      throw error;
    }
  },
  async getEmpleadosOrganzados(pageSize = 10, lastDoc = null, searchTerm = "") {
    try {
      let q = query(
        collection(db, COLLECTION_NAME),
        orderBy("apellido", "desc"),
        limit(pageSize)
      );

      if (lastDoc) {
        q = query(
          collection(db, COLLECTION_NAME),
          orderBy("apellido", "desc"),
          startAfter(lastDoc),
          limit(pageSize)
        );
      }

      const querySnapshot = await getDocs(q);
      const empleados = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          !searchTerm ||
          data.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (data.cvFileName &&
            data.cvFileName.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          empleados.push({
            id: doc.id,
            ...data,
            fechaCreacion: data.fechaCreacion?.toDate(),
            fechaActualizacion: data.fechaActualizacion?.toDate(),
          });
        }
      });

      return {
        empleados,
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
        hasMore: querySnapshot.docs.length === pageSize,
      };
    } catch (error) {
      console.error("Error getting empleados:", error);
      throw error;
    }
  },

  // Actualizar empleado
  async updateEmpleado(id, empleadoData) {
    try {
      let cvUrl = empleadoData.cvUrl;
      let cvFileName = empleadoData.cvFileName;

      // Upload new CV PDF if provided
      if (empleadoData.cvFile) {
        // Delete old CV file if exists
        if (empleadoData.oldCvUrl) {
          try {
            const oldCvRef = ref(storage, empleadoData.oldCvUrl);
            await deleteObject(oldCvRef);
          } catch (error) {
            console.warn("Error deleting old CV file:", error);
          }
        }

        const cvRef = ref(
          storage,
          `nomina/cv/${Date.now()}_${empleadoData.cvFile.name}`
        );
        const snapshot = await uploadBytes(cvRef, empleadoData.cvFile);
        cvUrl = await getDownloadURL(snapshot.ref);
        cvFileName = empleadoData.cvFile.name;
      }

      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        nombre: empleadoData.nombre,
        cvUrl: cvUrl,
        cvFileName: cvFileName,
        fechaActualizacion: new Date(),
        apellido: empleadoData.apellido || "",
      });
      return { id, nombre: empleadoData.nombre, cvUrl, cvFileName };
    } catch (error) {
      console.error("Error updating empleado:", error);
      throw error;
    }
  },

  // Eliminar empleado
  async deleteEmpleado(id) {
    try {
      // Get empleado data to delete CV file
      const empleadoDoc = await getDocs(collection(db, COLLECTION_NAME));
      const empleado = empleadoDoc.docs.find((doc) => doc.id === id);

      if (empleado && empleado.data().cvUrl) {
        try {
          const cvRef = ref(storage, empleado.data().cvUrl);
          await deleteObject(cvRef);
        } catch (error) {
          console.warn("Error deleting CV file:", error);
        }
      }

      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return id;
    } catch (error) {
      console.error("Error deleting empleado:", error);
      throw error;
    }
  },

  // Obtener total de empleados
  async getTotalEmpleados() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.size;
    } catch (error) {
      console.error("Error getting total empleados:", error);
      return 0;
    }
  },
};
