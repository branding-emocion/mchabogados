// Service for managing solicitudes in Firestore with role-based access
import { db, storage } from "@/firebase/firebaseClient";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const COLLECTION_NAME = "solicitudes";

// Upload file to Firebase Storage
export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Delete file from Firebase Storage
export const deleteFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

// Create new solicitud
export const createSolicitud = async (solicitudData, userId) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...solicitudData,
      userId, // Added userId to associate solicitud with user
      created_at: serverTimestamp(),
      estado: "Pendiente",
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating solicitud:", error);
    throw error;
  }
};

// Update solicitud
export const updateSolicitud = async (id, solicitudData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...solicitudData,
      updated_at: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating solicitud:", error);
    throw error;
  }
};

export const getSolicitudes = async (filters = {}, userRole, userId) => {
  try {
    let q = collection(db, COLLECTION_NAME);

    // Apply role-based filtering
    if (userRole == "cliente") {
      // Clients only see their own solicitudes
      q = query(q, where("userId", "==", `${userId}`));
    }
    // superAdmin sees all solicitudes (no additional filter needed)

    // Apply other filters

    if (filters.estado == "Todos los estados") {
      q = query(q, where("tipoServicio", "==", "Arbitraje"));
    } else if (filters.estado) {
      q = query(q, where("estado", "==", filters.estado));
    }

    if (filters.dateFrom || filters.dateTo) {
      q = query(q, orderBy("created_at", "desc"));
    }

    const querySnapshot = await getDocs(q);
    const solicitudes = [];

    querySnapshot.forEach((doc) => {
      solicitudes.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return solicitudes;
  } catch (error) {
    console.error("Error getting solicitudes:", error);
    throw error;
  }
};

// Get single solicitud with role-based access
export const getSolicitud = async (id, userRole, userId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const solicitudData = {
        id: docSnap.id,
        ...docSnap.data(),
      };

      if (userRole === "cliente" && solicitudData.userId !== userId) {
        throw new Error("No tienes permisos para ver esta solicitud");
      }

      return solicitudData;
    } else {
      throw new Error("Solicitud not found");
    }
  } catch (error) {
    console.error("Error getting solicitud:", error);
    throw error;
  }
};

// Delete solicitud (admin only)
export const deleteSolicitud = async (id, userRole) => {
  try {
    if (userRole !== "superAdmin") {
      throw new Error("No tienes permisos para eliminar solicitudes");
    }

    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting solicitud:", error);
    throw error;
  }
};

export const sendNotificationToAdmins = async (message, solicitudId) => {
  try {
    // Save notification to Firestore for all admins
    await addDoc(collection(db, "notifications"), {
      message,
      solicitudId,
      targetRole: "superAdmin", // Only admins receive these notifications
      created_at: serverTimestamp(),
      read: false,
      type: "new_solicitud",
    });

    console.log("Notification sent to admins:", message);
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};

// Get notifications for user based on role
export const getNotifications = async (userRole, userId) => {
  try {
    let q = collection(db, "notifications");
    console.log("userRole", userRole);

    if (userRole == "superAdmin" || userRole == "admin") {
      // Admins get notifications targeted to their role
      q = query(
        q,
        where("targetRole", "==", "superAdmin"),
        orderBy("created_at", "desc")
      );
    } else {
      // Clients get notifications targeted to them specifically
      q = query(
        q,
        where("targetUserId", "==", userId),
        orderBy("created_at", "desc")
      );
    }

    const querySnapshot = await getDocs(q);
    const notifications = [];

    querySnapshot.forEach((doc) => {
      notifications.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return notifications;
  } catch (error) {
    console.error("Error getting notifications:", error);
    throw error;
  }
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    const docRef = doc(db, "notifications", notificationId);
    await updateDoc(docRef, {
      read: true,
      read_at: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};
