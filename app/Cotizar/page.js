"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Aparecer } from "@/components/animaciones";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Calculator, FileText, Users, Scale, Badge } from "lucide-react";

import { getCalculatorConfig } from "@/lib/calculator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CotizarPage() {
  const [amount, setAmount] = useState("");
  const [currency] = useState("PEN");
  const [activeCalculator, setActiveCalculator] = useState(
    "CalculadoraGastosAdministrativos"
  );
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [calculatorConfigs, setCalculatorConfigs] = useState({});
  const [loading, setLoading] = useState(true);

  const [tipoPretensiones, setTipoPretensiones] = useState("");
  const [tipoArbitraje, setTipoArbitraje] = useState("");
  const [numeroPretensiones, setNumeroPretensiones] = useState("");

  useEffect(() => {
    const loadConfigs = async () => {
      try {
        setLoading(true);

        const configs = {};
        const calculatorTypes = [
          "CalculadoraGastosAdministrativos",
          "CalculadoraArbitroUnico",
          "CalculadoraTribunalArbitral",
          "CalculadoraTribunalEmergencia",
        ];

        for (const type of calculatorTypes) {
          try {
            const config = await getCalculatorConfig(type);
            configs[type] = config;
            console.log(`[v0] Loaded config for ${type}:`, config);
          } catch (error) {
            console.error(`[v0] Error loading config for ${type}:`, error);
          }
        }

        setCalculatorConfigs(configs);
      } catch (error) {
        console.error("[v0] Error loading calculator configs:", error);
        alert("Error al cargar las configuraciones desde la base de datos");
      } finally {
        setLoading(false);
      }
    };

    loadConfigs();
  }, []);

  const calculateFee = (amount, feeTable) => {
    const currentTier = feeTable.find(t => amount >= t.min && amount <= t.max);
    if (!currentTier) return 0;

    const excessAmount = amount - currentTier.baseAmount;
    const excessFee = excessAmount * currentTier.rate;
    const totalFee = excessFee + currentTier.minFee;

    const clampedMin = Math.max(totalFee, currentTier.minFee);
    
    if (currentTier.maxFee !== null && currentTier.maxFee !== undefined) {
      return Math.min(clampedMin, currentTier.maxFee); 
    }

    return clampedMin;
  };

  const handleCalculate = () => {
    const numAmount = Number.parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;

    const config = calculatorConfigs[activeCalculator];
    if (!config) return;

    if (config.name === "ARBITRAJE DE CONTRATACIÓN PÚBLICA") {
      if (!tipoPretensiones) {
        alert("Por favor seleccione el tipo de pretensiones  ");
        return;
      }
      if (
        tipoPretensiones === "Pretenciones indeterminadas" &&
        !numeroPretensiones
      ) {
        alert("Por favor ingrese el número de pretensiones indeterminadas");
        return;
      }
    }

    if (
      activeCalculator === "CalculadoraTribunalEmergencia" &&
      tipoPretensiones === "Pretenciones indeterminadas"
    ) {
      const numPretensiones = Number.parseFloat(numeroPretensiones);
      if (!numPretensiones || numPretensiones <= 0) {
        alert("Por favor ingrese un número válido de pretensiones");
        return;
      }

      // Formula: (Monto del contrato * 6.2 * Número de pretensiones) + IGV 18%
      const baseCalculation = numAmount * 6.2 * numPretensiones;
      const igv = baseCalculation * 0.18;
      const totalGeneral = baseCalculation + igv;

      const calculationResult = {
        amount: numAmount,
        numeroPretensiones: numPretensiones,
        baseCalculation,
        igv,
        totalGeneral,
        currency,
        calculatorType: activeCalculator,
        calculatorName: config.name,
        isPretensionesIndeterminadas: true,
        tipoPretensiones,
      };

      setResult(calculationResult);
      setShowResult(true);
      return;
    }

    if (activeCalculator === "CalculadoraTribunalEmergencia") {
      const emergencyTier = config.fees.find(
        (t) => numAmount >= t.min && numAmount <= t.max
      );

      if (!emergencyTier) {
        alert("No se encontró una tarifa válida para este monto");
        return;
      }

      const presentationFee = config.presentationFee || 0;

      // Calculate each concept separately with IGV
      const servicioEmergenciaBase =
        emergencyTier.ServicioArbitrajeEmergencia || 0;
      const arbitroEmergenciaBase = emergencyTier.ArbitroEmergencia || 0;

      const igvServicio = servicioEmergenciaBase * 0.18;
      const igvArbitro = arbitroEmergenciaBase * 0.18;

      const totalServicio = servicioEmergenciaBase + igvServicio;
      const totalArbitro = arbitroEmergenciaBase + igvArbitro;

      // Subtotal is the sum of both totals
      const subtotal = totalServicio + totalArbitro;

      // Add presentation fee once to the subtotal
      const totalGeneral = subtotal + presentationFee;

      const calculationResult = {
        amount: numAmount,
        presentationFee,
        servicioEmergenciaBase,
        arbitroEmergenciaBase,
        igvServicio,
        igvArbitro,
        totalServicio,
        totalArbitro,
        subtotal,
        totalGeneral,
        currency,
        calculatorType: activeCalculator,
        calculatorName: config.name,
        isEmergencyArbitrator: true,
      };

      setResult(calculationResult);
      setShowResult(true);
      return;
    }

    const presentationFee = config.presentationFee;
    const calculatedFee = calculateFee(numAmount, config.fees);

    let subtotal = calculatedFee + presentationFee;

    let cargosPretensiones = 0;
    let cargosArbitraje = 0;

    if (config.name === "ARBITRAJE DE CONTRATACIÓN PÚBLICA") {
      const baseParaCargos = calculatedFee;

      if (tipoArbitraje === "Arbitraje de Contratación Pública") {
        cargosArbitraje = baseParaCargos * (config.GastosArbitraje / 100);
      } else if (tipoArbitraje === "Arbitraje de Emergencia") {
        cargosArbitraje = baseParaCargos * (config.ArbitrajeEmergencia / 100);
      }

      if (tipoPretensiones === "Pretenciones indeterminadas") {
        const numPretensiones = Number.parseFloat(numeroPretensiones);
        if (numPretensiones > 0) {
          const cargoPorPretension =
            baseParaCargos * (config.Pretensiones / 100);
          cargosPretensiones = cargoPorPretension * numPretensiones;
        }
      }

      subtotal = subtotal + cargosArbitraje + cargosPretensiones;
    }

    const igv = subtotal * 0.18;
    const renta = subtotal * 0.08;
    const totalWithIGV = subtotal + igv;
    const totalWithRenta = subtotal + renta;

    const calculationResult = {
      amount: numAmount,
      presentationFee,
      calculatedFee,
      subtotal,
      igv,
      renta,
      totalWithIGV,
      totalWithRenta,
      currency,
      calculatorType: activeCalculator,
      calculatorName: config.name,
      cargosPretensiones,
      cargosArbitraje,
      tipoPretensiones,
      tipoArbitraje,
      numeroPretensiones:
        tipoPretensiones === "Pretenciones indeterminadas"
          ? numeroPretensiones
          : null,
    };

    setResult(calculationResult);
    setShowResult(true);
  };

  // Helper function to add images to the document
  const addImageToDoc = async (doc, imagePath, x, y, width, height = null) => {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";

      return new Promise((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imgData = canvas.toDataURL("image/png");
          const finalHeight = height || (width * img.height) / img.width;

          doc.addImage(imgData, "PNG", x, y, width, finalHeight);
          resolve();
        };

        img.onerror = () =>
          reject(new Error(`Failed to load image: ${imagePath}`));
        img.src = imagePath;
      });
    } catch (error) {
      console.error("Error adding image:", error);
    }
  };

  const exportToPDF = async () => {
    if (!result) return;

    setIsGeneratingPDF(true);

    try {
      // Carga diferida: jsPDF solo se descarga cuando se genera el PDF
      const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
        import("jspdf"),
        import("jspdf-autotable"),
      ]);

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const logoWidth = 40;
      const logoX = (pageWidth - logoWidth) / 2;
      await addImageToDoc(doc, "/LOGO.png", 15, 10, 50);

      doc.setFontSize(22);
      doc.setFont(undefined, "bold");
      doc.text("COTIZACIÓN DE ARBITRAJE", pageWidth / 2, 35, {
        align: "center",
      });

      doc.setFontSize(12);
      doc.text(`${result.calculatorName.toUpperCase()}`, pageWidth / 2, 45, {
        align: "center",
      });
      doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 55);

      let tableData = [];

      if (result.isPretensionesIndeterminadas) {
        tableData = [
          ["Concepto", "Monto"],
          ["Monto del Contrato", `S/ ${result.amount.toLocaleString()}`],
          ["Número de Pretensiones", result.numeroPretensiones],
          [" Sub Total", `S/ ${result.baseCalculation.toFixed(2)}`],
          ["IGV (18%)", `S/ ${result.igv.toFixed(2)}`],
          ["TOTAL GENERAL", `S/ ${result.totalGeneral.toFixed(2)}`],
        ];
      } else if (result.isEmergencyArbitrator) {
        tableData = [
          ["Concepto", "Monto"],
          ["Cuantía", `S/ ${result.amount.toLocaleString()}`],
          ["", ""],
          ["SERVICIO ARBITRAJE EMERGENCIA", ""],
          ["Monto Base", `S/ ${result.servicioEmergenciaBase.toFixed(2)}`],
          ["IGV Servicio (18%)", `S/ ${result.igvServicio.toFixed(2)}`],
          ["Total Servicio", `S/ ${result.totalServicio.toFixed(2)}`],
          ["", ""],
          ["ÁRBITRO EMERGENCIA", ""],
          ["Monto Base", `S/ ${result.arbitroEmergenciaBase.toFixed(2)}`],
          ["IGV Árbitro (18%)", `S/ ${result.igvArbitro.toFixed(2)}`],
          ["Total Árbitro", `S/ ${result.totalArbitro.toFixed(2)}`],
          ["", ""],
          ["Subtotal", `S/ ${result.subtotal.toFixed(2)}`],
          ["Tasa de Presentación", `S/ ${result.presentationFee.toFixed(2)}`],
          ["TOTAL GENERAL", `S/ ${result.totalGeneral.toFixed(2)}`],
        ];
      } else {
        tableData = [
          ["Concepto", "Monto"],
          ["Cuantía", `S/ ${result.amount.toLocaleString()}`],
          ["Tasa de Presentación", `S/ ${result.presentationFee.toFixed(2)}`],
          ["Tarifa Calculada", `S/ ${result.calculatedFee.toFixed(2)}`],
        ];

        if (result.calculatorName == "ARBITRAJE DE CONTRATACIÓN PÚBLICA") {
          if (result.cargosArbitraje > 0) {
            tableData.push([
              `Cargo ${result.tipoArbitraje}`,
              `S/ ${result.cargosArbitraje.toFixed(2)}`,
            ]);
          }
          if (result.cargosPretensiones > 0) {
            tableData.push([
              `Cargo Pretensiones Indeterminadas (${result.numeroPretensiones})`,
              `S/ ${result.cargosPretensiones.toFixed(2)}`,
            ]);
          }
        }

        tableData.push(
          ["Subtotal", `S/ ${result.subtotal.toFixed(2)}`],
          ["IGV (18%)", `S/ ${result.igv.toFixed(2)}`],
          ["Retención (8%)", `S/ ${result.renta.toFixed(2)}`],
          ["Total con IGV", `S/ ${result.totalWithIGV.toFixed(2)}`],
          ["Total con Retención", `S/ ${result.totalWithRenta.toFixed(2)}`]
        );
      }

      autoTable(doc, {
        head: [tableData[0]],
        body: tableData.slice(1),
        startY: 70,
        theme: "grid",
        headStyles: { fillColor: [41, 128, 185] },
      });

      doc.save(`cotizacion-arbitraje-${Date.now()}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error al generar el PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const resetCalculation = () => {
    setResult(null);
    setShowResult(false);
    setAmount("");
    setTipoPretensiones("");
    setTipoArbitraje("");
    setNumeroPretensiones("");
  };

  const currentConfig = calculatorConfigs[activeCalculator];

  console.log("currentConfig", currentConfig);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <section className="relative overflow-hidden bg-[#0b1a33]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{ backgroundImage: `url('/Costos.jpg')` }}
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,20,38,0.92)_0%,rgba(11,32,62,0.78)_45%,rgba(20,50,90,0.45)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#c9a45c]/20 blur-3xl"
          />
          <div className="home-shell relative pb-12 pt-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[#c9a45c]/40 bg-[#c9a45c]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f3e3bb]">
                <Badge className="h-4 w-4" aria-hidden="true" />
                Calculadora oficial
              </span>
              <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl">
                Calculadoras de arbitraje
              </h1>
              <div
                aria-hidden="true"
                className="mx-auto mb-5 mt-6 h-[3px] w-24 rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
              />
              <p className="mx-auto max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                Calcula los costos de arbitraje de manera precisa según las
                tarifas oficiales
              </p>
            </motion.div>
          </div>
        </section>
        <div className="home-shell py-20 text-center">
          <div className="mx-auto max-w-md rounded-3xl border border-[#e5e8ed] bg-white p-10 shadow-[0_18px_48px_-28px_rgba(14,31,58,0.35)]">
            <span
              aria-hidden="true"
              className="mx-auto block h-[3px] w-16 rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
            />
            <p className="mt-5 text-base font-semibold text-[#14243e]">
              Cargando configuraciones desde la base de datos...
            </p>
            <p className="mt-2 text-sm leading-6 text-[#5b6a7f]">
              Estamos preparando las tarifas oficiales.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#0b1a33]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url('/Costos.jpg')` }}
          aria-hidden="true"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,20,38,0.92)_0%,rgba(11,32,62,0.78)_45%,rgba(20,50,90,0.45)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#c9a45c]/20 blur-3xl"
        />

        <div className="home-shell relative pb-12 pt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#c9a45c]/40 bg-[#c9a45c]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f3e3bb]">
              <Calculator className="h-4 w-4" aria-hidden="true" />
              Calculadora oficial
            </span>
            <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl">
              Calculadora de arbitraje
            </h1>
            <div
              aria-hidden="true"
              className="mx-auto mb-5 mt-6 h-[3px] w-24 rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
            />
            <p className="mx-auto max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Calcula los costos de manera precisa según las tarifas oficiales
            </p>
          </motion.div>
        </div>
      </section>

      <section id="calculator" className="bg-white py-14 lg:py-20">
        <Aparecer className="home-shell">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="home-kicker">Tarifas oficiales</p>
              <h2 className="home-title mt-3">Cotiza tu procedimiento</h2>
              <p className="home-copy mx-auto mt-4 max-w-2xl">
                Selecciona el tipo de arbitraje, ingresa la cuantía y obtén el
                estimado de gastos y honorarios al instante.
              </p>
            </div>

            <Tabs
              value={activeCalculator}
              onValueChange={setActiveCalculator}
              className="mt-10 w-full"
            >
              <TabsList className="grid h-auto w-full grid-cols-1 gap-2 rounded-2xl border border-[#e5e8ed] bg-[#f6f4ef] p-2 md:grid-cols-2">
                <TabsTrigger
                  value="CalculadoraGastosAdministrativos"
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-[#14243e] transition-colors data-[state=active]:bg-[#14243e] data-[state=active]:text-[#e2c488] data-[state=active]:shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)]"
                >
                  <Calculator className="h-4 w-4" />
                  Gastos Administrativos de Arbitraje
                </TabsTrigger>
                <TabsTrigger
                  value="CalculadoraArbitroUnico"
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-[#14243e] transition-colors data-[state=active]:bg-[#14243e] data-[state=active]:text-[#e2c488] data-[state=active]:shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)]"
                >
                  <Users className="h-4 w-4" />
                  Árbitro Único
                </TabsTrigger>
                {tipoArbitraje != "Arbitraje de Emergencia" && (
                  <TabsTrigger
                    value="CalculadoraTribunalArbitral"
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-[#14243e] transition-colors data-[state=active]:bg-[#14243e] data-[state=active]:text-[#e2c488] data-[state=active]:shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)]"
                  >
                    <FileText className="h-4 w-4" />
                    Tribunal Arbitral
                  </TabsTrigger>
                )}

                <TabsTrigger
                  value="CalculadoraTribunalEmergencia"
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-[#14243e] transition-colors data-[state=active]:bg-[#14243e] data-[state=active]:text-[#e2c488] data-[state=active]:shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)]"
                >
                  <Users className="h-4 w-4" />
                  Arbitraje de Emergencia
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeCalculator} className="mt-6">
                <Card className="relative overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                  />
                  <CardHeader className="pb-2 pt-8">
                    <CardTitle className="flex items-center gap-4 font-[family-name:var(--font-playfair)] text-2xl font-medium tracking-[-0.02em] text-[#14243e]">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30">
                        <Scale className="h-6 w-6" strokeWidth={1.4} />
                      </span>
                      <span className="uppercase">{currentConfig?.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-8">
                    <div className="space-y-4">
                      {currentConfig?.name ==
                        "ARBITRAJE DE CONTRATACIÓN PÚBLICA" && (
                        <>
                          <div className="space-y-2">
                            <Label className="text-base font-bold uppercase text-[#14243e]">
                              Pretensiones
                            </Label>
                            <Select
                              value={tipoPretensiones}
                              onValueChange={setTipoPretensiones}
                            >
                              <SelectTrigger className="w-full border-[#e5e8ed] bg-white text-[#14243e] focus:border-[#c9a45c] focus:ring-[#c9a45c]/30">
                                <SelectValue placeholder="Seleccione una opción" />
                              </SelectTrigger>
                              <SelectContent className="border-[#e5e8ed] bg-white">
                                <SelectItem value="Pretenciones indeterminadas">
                                  Pretenciones indeterminadas
                                </SelectItem>
                                <SelectItem value="Pretenciones Determinadas">
                                  Pretenciones Determinadas
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {tipoPretensiones == "Pretenciones indeterminadas" && (
                            <div className="space-y-2">
                              <Label className="text-base font-bold uppercase text-[#14243e]">
                                Número de pretensiones indeterminadas
                              </Label>
                              <Input
                                type="number"
                                placeholder="Ingrese el número"
                                value={numeroPretensiones}
                                onChange={(e) =>
                                  setNumeroPretensiones(e.target.value)
                                }
                                className="h-12 border-[#e5e8ed] bg-white text-lg text-[#14243e] placeholder:text-[#8a94a3] focus-visible:border-[#c9a45c] focus-visible:ring-[#c9a45c]/30"
                                min="1"
                              />
                            </div>
                          )}

                          {/* <div className="space-y-2">
                          <Label className="text-base font-bold uppercase">
                            Tipo de Arbitraje
                          </Label>
                          <Select
                            value={tipoArbitraje}
                            onValueChange={setTipoArbitraje}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Seleccione una opción" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Arbitraje de Contratación Pública">
                                Arbitraje de Contratación Pública
                              </SelectItem>
                              <SelectItem value="Arbitraje de Emergencia">
                                Arbitraje de Emergencia
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div> */}
                        </>
                      )}
                      {currentConfig?.name == "Arbitraje de Emergencia" && (
                        <>
                          <div className="space-y-2">
                            <Label className="text-base font-bold uppercase text-[#14243e]">
                              Pretensiones
                            </Label>
                            <Select
                              value={tipoPretensiones}
                              onValueChange={setTipoPretensiones}
                            >
                              <SelectTrigger className="w-full border-[#e5e8ed] bg-white text-[#14243e] focus:border-[#c9a45c] focus:ring-[#c9a45c]/30">
                                <SelectValue placeholder="Seleccione una opción" />
                              </SelectTrigger>
                              <SelectContent className="border-[#e5e8ed] bg-white">
                                <SelectItem value="Pretenciones indeterminadas">
                                  Pretenciones indeterminadas
                                </SelectItem>
                                <SelectItem value="Pretenciones Determinadas">
                                  Pretenciones Determinadas
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {tipoPretensiones == "Pretenciones indeterminadas" && (
                            <div className="space-y-2">
                              <Label className="text-base font-bold uppercase text-[#14243e]">
                                Número de pretensiones indeterminadas
                              </Label>
                              <Input
                                type="number"
                                placeholder="Ingrese el número"
                                value={numeroPretensiones}
                                onChange={(e) =>
                                  setNumeroPretensiones(e.target.value)
                                }
                                className="h-12 border-[#e5e8ed] bg-white text-lg text-[#14243e] placeholder:text-[#8a94a3] focus-visible:border-[#c9a45c] focus-visible:ring-[#c9a45c]/30"
                                min="1"
                              />
                            </div>
                          )}
                        </>
                      )}

                      <div className="space-y-2">
                        <Label className="text-base font-bold uppercase text-[#14243e]">
                          {tipoPretensiones == "Pretenciones indeterminadas" &&
                          activeCalculator === "CalculadoraTribunalEmergencia"
                            ? "Monto del contrato"
                            : "Cuantía"}
                        </Label>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <Input
                              type="number"
                              placeholder="0.00"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="h-12 border-[#e5e8ed] bg-white text-lg text-[#14243e] placeholder:text-[#8a94a3] focus-visible:border-[#c9a45c] focus-visible:ring-[#c9a45c]/30"
                            />
                          </div>
                          <div className="flex items-center rounded-md border border-[#e5e8ed] bg-[#f6f4ef] px-3">
                            <Label className="font-medium text-[#14243e]">PEN (S/)</Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleCalculate}
                      className="h-12 w-full rounded-xl bg-[#c9a45c] text-lg font-bold text-[#0b1a33] transition-all hover:bg-[#a48041] hover:text-white hover:shadow-[0_15px_40px_-12px_rgba(201,164,92,0.8)]"
                      disabled={!amount || !currentConfig}
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      CALCULAR COSTOS
                    </Button>
                  </CardContent>
                </Card>

                {showResult && result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6"
                  >
                    <Card className="relative overflow-hidden rounded-3xl border border-[#c9a45c]/30 bg-[#0b1a33] text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#c9a45c]/15 blur-3xl"
                      />
                      <CardHeader className="relative pb-2 pt-8">
                        <CardTitle className="font-[family-name:var(--font-playfair)] text-2xl font-medium tracking-[-0.02em] text-[#e2c488]">
                          Resultado del cálculo
                        </CardTitle>
                        <p className="mt-1 text-sm leading-6 text-white/60">
                          Estimado según las tarifas oficiales vigentes.
                        </p>
                      </CardHeader>
                      <CardContent className="relative space-y-4 p-8 pt-4">
                        {result.isPretensionesIndeterminadas ? (
                          <div className="space-y-4">
                            <div className="flex justify-between text-white/75">
                              <span>Monto del Contrato:</span>
                              <span className="font-medium text-white">
                                {/* S/ {result.amount.toLocaleString()} */}
                                {new Intl.NumberFormat("es-PE", {
                                  style: "currency",
                                  currency: "PEN",
                                  minimumFractionDigits: 2,
                                }).format(result.amount)}
                              </span>
                            </div>
                            <div className="flex justify-between text-white/75">
                              <span>Número de Pretensiones:</span>
                              <span className="font-medium text-white">
                                {result.numeroPretensiones}
                              </span>
                            </div>
                            <div className="border-t border-white/15 pt-4">
                              <div className="flex justify-between text-white/75">
                                <span>Sub Total:</span>
                                <span className="font-medium text-white">
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.baseCalculation)}
                                </span>
                              </div>
                              <div className="flex justify-between text-white/75">
                                <span>IGV (18%):</span>
                                <span className="font-medium text-white">
                                  {/* S/ {result.igv.toFixed(2)} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.igv)}
                                </span>
                              </div>
                              <div className="mt-4 flex justify-between font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#e2c488]">
                                <span>TOTAL GENERAL:</span>
                                {/* <span>S/ {result.totalGeneral.toFixed(2)}</span> */}
                                <span>
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.totalGeneral)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : result.isEmergencyArbitrator ? (
                          <div className="space-y-4">
                            <div className="flex justify-between text-white/75">
                              <span>Cuantía:</span>
                              <span className="font-medium text-white">
                                {new Intl.NumberFormat("es-PE", {
                                  style: "currency",
                                  currency: "PEN",
                                  minimumFractionDigits: 2,
                                }).format(result.amount)}
                                {/* S/ {result.amount.toLocaleString()} */}
                              </span>
                            </div>

                            <div className="border-t border-white/15 pt-4">
                              <h3 className="mb-2 font-bold text-[#e2c488]">
                                Servicio Arbitraje Emergencia
                              </h3>
                              <div className="flex justify-between text-white/75">
                                <span>Monto Base:</span>
                                <span className="font-medium text-white">
                                  {/* S/ {result.servicioEmergenciaBase.toFixed(2)} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.servicioEmergenciaBase)}
                                </span>
                              </div>
                              <div className="flex justify-between text-white/75">
                                <span>IGV (18%):</span>
                                <span className="font-medium text-white">
                                  {/* S/ {result.igvServicio.toFixed(2)} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.igvServicio)}
                                </span>
                              </div>
                              <div className="flex justify-between font-bold text-white">
                                <span>Total Servicio:</span>
                                <span>
                                  {/* S/ {result.totalServicio.toFixed(2)} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.totalServicio)}
                                </span>
                              </div>
                            </div>

                            <div className="border-t border-white/15 pt-4">
                              <h3 className="mb-2 font-bold text-[#e2c488]">
                                Árbitro Emergencia
                              </h3>
                              <div className="flex justify-between text-white/75">
                                <span>Monto Base:</span>
                                <span className="font-medium text-white">
                                  {/* S/ {result.arbitroEmergenciaBase.toFixed(2)} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.arbitroEmergenciaBase)}
                                </span>
                              </div>
                              <div className="flex justify-between text-white/75">
                                <span>IGV (18%):</span>
                                <span className="font-medium text-white">
                                  {/* S/ {result.igvArbitro.toFixed(2)} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.igvArbitro)}
                                </span>
                              </div>
                              <div className="flex justify-between font-bold text-white">
                                <span>Total Árbitro:</span>
                                <span>
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.totalArbitro)}

                                  {/* S/ {result.totalArbitro.toFixed(2)} */}
                                </span>
                              </div>
                            </div>

                            <div className="border-t border-white/15 pt-4">
                              <div className="flex justify-between text-lg text-white/75">
                                <span>Subtotal:</span>
                                <span className="font-medium text-white">
                                  {/* S/ {result.subtotal.toFixed(2)} */}

                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.subtotal)}
                                </span>
                              </div>
                              <div className="flex justify-between text-lg text-white/75">
                                <span>Tasa de Presentación:</span>
                                <span className="font-medium text-white">
                                  {/* S/ {result.presentationFee.toFixed(2)} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.presentationFee)}
                                </span>
                              </div>
                              <div className="mt-4 flex justify-between font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#e2c488]">
                                <span>TOTAL GENERAL:</span>
                                <span>
                                  {/* S/ {result.totalGeneral.toFixed(2)} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.totalGeneral)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2 text-white/75">
                              <div className="flex justify-between">
                                <span>Cuantía:</span>
                                <span className="font-medium text-white">
                                  {/* S/ {result.amount.toLocaleString()} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.amount)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tasa de Presentación:</span>
                                <span className="font-medium text-white">
                                  {/* S/ {result.presentationFee.toFixed(2)} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.presentationFee)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tarifa Calculada:</span>
                                <span className="font-medium text-white">
                                  {/* S/ {result.calculatedFee.toFixed(2)} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.calculatedFee)}
                                </span>
                              </div>

                              {result.calculatorName ===
                                "ARBITRAJE DE CONTRATACIÓN PÚBLICA" && (
                                <>
                                  {result.cargosArbitraje > 0 && (
                                    <div className="flex justify-between">
                                      <span>Cargo {result.tipoArbitraje}:</span>
                                      <span className="font-medium text-white">
                                        {/* S/ {result.cargosArbitraje.toFixed(2)} */}
                                        {new Intl.NumberFormat("es-PE", {
                                          style: "currency",
                                          currency: "PEN",
                                          minimumFractionDigits: 2,
                                        }).format(result.cargosArbitraje)}
                                      </span>
                                    </div>
                                  )}
                                  {result.cargosPretensiones > 0 && (
                                    <div className="flex justify-between">
                                      <span>
                                        Cargo Pretensiones (
                                        {result.numeroPretensiones}):
                                      </span>
                                      <span className="font-medium text-white">
                                        {/* S/ {result.cargosPretensiones.toFixed(2)} */}
                                        {new Intl.NumberFormat("es-PE", {
                                          style: "currency",
                                          currency: "PEN",
                                          minimumFractionDigits: 2,
                                        }).format(result.cargosPretensiones)}
                                      </span>
                                    </div>
                                  )}
                                </>
                              )}
                              <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span className="font-medium text-white">
                                  {/* S/ {result.subtotal.toFixed(2)} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.subtotal)}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-2 text-white/75">
                              <div className="flex justify-between">
                                <span>IGV (18%):</span>
                                <span className="font-medium text-white">
                                  {/* S/ {result.igv.toFixed(2)} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.igv)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Retención (8%):</span>
                                <span className="font-medium text-white">
                                  {/* S/ {result.renta.toFixed(2)} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.renta)}
                                </span>
                              </div>
                              <div className="flex justify-between font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#e2c488]">
                                <span>Total con IGV:</span>
                                <span>
                                  {/* S/ {result.totalWithIGV.toFixed(2)} */}
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.totalWithIGV)}
                                </span>
                              </div>
                              <div className="flex justify-between font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#e2c488]">
                                <span>Total con Retención:</span>
                                <span>
                                  {new Intl.NumberFormat("es-PE", {
                                    style: "currency",
                                    currency: "PEN",
                                    minimumFractionDigits: 2,
                                  }).format(result.totalWithRenta)}
                                  {/* S/ {result.totalWithRenta.toFixed(2)} */}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col gap-4 pt-6 sm:flex-row">
                          <Button
                            onClick={exportToPDF}
                            className="min-h-12 flex-1 rounded-xl bg-[#c9a45c] font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
                            disabled={isGeneratingPDF}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            {isGeneratingPDF
                              ? "Generando PDF..."
                              : "Exportar a PDF"}
                          </Button>
                          <Button
                            onClick={resetCalculation}
                            variant="outline"
                            className="min-h-12 flex-1 rounded-xl border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
                          >
                            <Calculator className="mr-2 h-4 w-4" />
                            Nueva Cotización
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </Aparecer>
      </section>
    </div>
  );
}
