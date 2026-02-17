import { db } from "@/firebase/firebaseClient";
import { doc, setDoc } from "firebase/firestore";

const INITIAL_CONFIGS = {
  CalculadoraGastosAdministrativos: {
    name: "Calculadora de gastos administrativos",
    presentationFee: 650.0,
    fees: [
      {
        min: 20001,
        max: 60000,
        rate: 0.06,
        minFee: 5000,
        maxFee: 7400,
        baseAmount: 20000,
      },
      {
        min: 60001,
        max: 150000,
        rate: 0.04,
        minFee: 10600,
        maxFee: 14200,
        baseAmount: 60000,
      },
      {
        min: 150001,
        max: 300000,
        rate: 0.04,
        minFee: 14200,
        maxFee: 20200,
        baseAmount: 150000,
      },
      {
        min: 300001,
        max: 500000,
        rate: 0.03,
        minFee: 20200,
        maxFee: 26200,
        baseAmount: 300000,
      },
      {
        min: 500001,
        max: 1000000,
        rate: 0.025,
        minFee: 26200,
        maxFee: 38700,
        baseAmount: 500000,
      },
      {
        min: 1000001,
        max: Number.POSITIVE_INFINITY,
        rate: 0.02,
        minFee: 38700,
        maxFee: null,
        baseAmount: 1000000,
      },
    ],
  },
  CalculadoraArbitroUnico: {
    name: "Calculadora de Árbitro único",
    presentationFee: 650.0,
    fees: [
      {
        min: 20001,
        max: 60000,
        rate: 0.08,
        minFee: 6000,
        maxFee: 9200,
        baseAmount: 20000,
      },
      {
        min: 60001,
        max: 150000,
        rate: 0.06,
        minFee: 9200,
        maxFee: 14600,
        baseAmount: 60000,
      },
      {
        min: 150001,
        max: 300000,
        rate: 0.05,
        minFee: 14600,
        maxFee: 22100,
        baseAmount: 150000,
      },
      {
        min: 300001,
        max: 500000,
        rate: 0.04,
        minFee: 22100,
        maxFee: 30100,
        baseAmount: 300000,
      },
      {
        min: 500001,
        max: 1000000,
        rate: 0.035,
        minFee: 30100,
        maxFee: 47600,
        baseAmount: 500000,
      },
      {
        min: 1000001,
        max: Number.POSITIVE_INFINITY,
        rate: 0.03,
        minFee: 47600,
        maxFee: null,
        baseAmount: 1000000,
      },
    ],
  },
  CalculadoraTribunalArbitral: {
    name: "Calculadora de Tribunal Arbitral",
    presentationFee: 650.0,
    fees: [
      {
        min: 20001,
        max: 60000,
        rate: 0.12,
        minFee: 9000,
        maxFee: 13800,
        baseAmount: 20000,
      },
      {
        min: 60001,
        max: 150000,
        rate: 0.09,
        minFee: 13800,
        maxFee: 21900,
        baseAmount: 60000,
      },
      {
        min: 150001,
        max: 300000,
        rate: 0.075,
        minFee: 21900,
        maxFee: 33150,
        baseAmount: 150000,
      },
      {
        min: 300001,
        max: 500000,
        rate: 0.06,
        minFee: 33150,
        maxFee: 45150,
        baseAmount: 300000,
      },
      {
        min: 500001,
        max: 1000000,
        rate: 0.0525,
        minFee: 45150,
        maxFee: 71400,
        baseAmount: 500000,
      },
      {
        min: 1000001,
        max: Number.POSITIVE_INFINITY,
        rate: 0.045,
        minFee: 71400,
        maxFee: null,
        baseAmount: 1000000,
      },
    ],
  },
};

async function initializeCalculators() {
  try {
    console.log("Inicializando calculadoras en Firebase...");

    for (const [id, config] of Object.entries(INITIAL_CONFIGS)) {
      const docRef = doc(db, "calculators", id);
      await setDoc(docRef, config);
      console.log(`✓ Calculadora ${id} inicializada`);
    }

    console.log(
      "✅ Todas las calculadoras han sido inicializadas correctamente"
    );
  } catch (error) {
    console.error("❌ Error inicializando calculadoras:", error);
  }
}

// Ejecutar la inicialización
export default initializeCalculators;
