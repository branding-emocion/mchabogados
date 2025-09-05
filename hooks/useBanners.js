"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/firebase/firebaseClient";

export function useBanners() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar banners desde Firebase
  const loadBanners = async () => {
    try {
      setIsLoading(true);
      const bannersQuery = query(
        collection(db, "banners"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(bannersQuery);
      const bannersData = querySnapshot.docs.map((doc) => ({
        idDoc: doc.id,
        ...doc.data(),
      }));
      setBanners(bannersData);
    } catch (error) {
      console.error("Error cargando banners:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Subir imagen a Firebase Storage
  const uploadImage = async (file) => {
    if (!file) return null;

    const timestamp = Date.now();
    const fileName = `banners/${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      throw error;
    }
  };

  // Guardar banner (crear o actualizar)
  const saveBanner = async (bannerData, imageFile = null) => {
    try {
      let imageUrl = bannerData.imageUrl;

      // Si hay una nueva imagen, subirla
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const bannerToSave = {
        ...bannerData,
        imageUrl,
        updatedAt: new Date(),
      };

      if (bannerData.id && banners.find((b) => b.id === bannerData.id)) {
        // Actualizar banner existente
        const docRef = doc(db, "banners", bannerData.id);
        await updateDoc(docRef, bannerToSave);
      } else {
        // Crear nuevo banner
        bannerToSave.createdAt = new Date();
        await addDoc(collection(db, "banners"), bannerToSave);
      }

      await loadBanners(); // Recargar la lista
    } catch (error) {
      console.error("Error guardando banner:", error);
      throw error;
    }
  };

  // Eliminar banner
  const deleteBanner = async (banner) => {
    try {
      // Eliminar imagen del storage si existe
      if (banner?.imageUrl) {
        try {
          const imageRef = ref(storage, banner.imageUrl);
          await deleteObject(imageRef);
        } catch (error) {
          console.log("Imagen ya eliminada o no existe");
        }
      }

      // Eliminar documento de Firestore
      await deleteDoc(doc(db, "banners", `${banner.idDoc}`));
      await loadBanners(); // Recargar la lista
    } catch (error) {
      console.error("Error eliminando banner:", error);
      throw error;
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  return {
    banners,
    isLoading,
    saveBanner,
    deleteBanner,
    loadBanners,
  };
}
