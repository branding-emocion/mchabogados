import { db } from "@/firebase/firebaseClient";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const COLLECTION_NAME = "calculators";

export const getCalculatorConfigs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const configs = {};

    querySnapshot.forEach((doc) => {
      configs[doc.id] = doc.data();
    });

    return configs;
  } catch (error) {
    console.error("Error fetching calculator configs:", error);
    throw error;
  }
};

export const getCalculatorConfig = async (type) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, type);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error(`Calculator config ${type} not found`);
    }
  } catch (error) {
    console.error("Error fetching calculator config:", error);
    throw error;
  }
};

export const saveCalculatorConfig = async (type, config) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, type);
    await setDoc(docRef, config);
    return true;
  } catch (error) {
    console.error("Error saving calculator config:", error);
    throw error;
  }
};

export const updateCalculatorConfig = async (type, config) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, type);
    await updateDoc(docRef, config);
    return true;
  } catch (error) {
    console.error("Error updating calculator config:", error);
    throw error;
  }
};
