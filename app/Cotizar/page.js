"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Calculator, FileText, Users, Scale, Badge } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
    const currentTier = feeTable.find(
      (t) => amount >= t.min && amount <= t.max
    );

    if (!currentTier) {
      return 0;
    }

    const excessAmount = amount - currentTier.baseAmount;
    const excessFee = excessAmount * currentTier.rate;
    const totalFee = excessFee + currentTier.minFee;

    return Math.max(totalFee, currentTier.minFee);
  };

  const handleCalculate = () => {
    const numAmount = Number.parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;

    const config = calculatorConfigs[activeCalculator];
    if (!config) return;

    if (config.name === "ARBITRAJE DE CONTRATACIÓN PÚBLICA") {
      if (!tipoPretensiones || !tipoArbitraje) {
        alert(
          "Por favor seleccione el tipo de pretensiones y tipo de arbitraje"
        );
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
      <div className="min-h-screen bg-gray-50">
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30 uppercase">
                Calculadora Oficial
              </Badge>
              <h1 className="text-3xl md:text-6xl font-bold mb-6 font-serif uppercase">
                Calculadoras de Arbitraje
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
                Calcula los costos de arbitraje de manera precisa según las
                tarifas oficiales
              </p>
            </motion.div>
          </div>
        </section>
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="text-lg">
            Cargando configuraciones desde la base de datos...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/Costos.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-3xl md:text-6xl font-bold mb-6 font-serif uppercase">
              Calculadora de Arbitraje
              <br />
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8" />
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Calcula los costos de manera precisa según las tarifas oficiales{" "}
            </p>
          </motion.div>
        </div>
      </section>

      <section id="calculator" className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Tabs
            value={activeCalculator}
            onValueChange={setActiveCalculator}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 mb-15 md:mb-8">
              <TabsTrigger
                value="CalculadoraGastosAdministrativos"
                className="flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Gastos Administrativos de Arbitraje
              </TabsTrigger>
              <TabsTrigger
                value="CalculadoraArbitroUnico"
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Árbitro Único
              </TabsTrigger>
              {tipoArbitraje != "Arbitraje de Emergencia" && (
                <TabsTrigger
                  value="CalculadoraTribunalArbitral"
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Tribunal Arbitral
                </TabsTrigger>
              )}

              <TabsTrigger
                value="CalculadoraTribunalEmergencia"
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Arbitraje de Emergencia
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeCalculator}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 uppercase">
                    <Scale className="w-5 h-5" />
                    {currentConfig?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {currentConfig?.name ==
                      "ARBITRAJE DE CONTRATACIÓN PÚBLICA" && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-base font-bold uppercase">
                            Pretensiones
                          </Label>
                          <Select
                            value={tipoPretensiones}
                            onValueChange={setTipoPretensiones}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Seleccione una opción" />
                            </SelectTrigger>
                            <SelectContent>
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
                            <Label className="text-base font-bold uppercase">
                              Número de pretensiones indeterminadas
                            </Label>
                            <Input
                              type="number"
                              placeholder="Ingrese el número"
                              value={numeroPretensiones}
                              onChange={(e) =>
                                setNumeroPretensiones(e.target.value)
                              }
                              className="text-lg h-12"
                              min="1"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
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
                        </div>
                      </>
                    )}
                    {currentConfig?.name == "Arbitraje de Emergencia" && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-base font-bold uppercase">
                            Pretensiones
                          </Label>
                          <Select
                            value={tipoPretensiones}
                            onValueChange={setTipoPretensiones}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Seleccione una opción" />
                            </SelectTrigger>
                            <SelectContent>
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
                            <Label className="text-base font-bold uppercase">
                              Número de pretensiones indeterminadas
                            </Label>
                            <Input
                              type="number"
                              placeholder="Ingrese el número"
                              value={numeroPretensiones}
                              onChange={(e) =>
                                setNumeroPretensiones(e.target.value)
                              }
                              className="text-lg h-12"
                              min="1"
                            />
                          </div>
                        )}
                      </>
                    )}

                    <div className="space-y-2">
                      <Label className="text-base font-bold uppercase">
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
                            className="text-lg h-12"
                          />
                        </div>
                        <div className="flex items-center px-3 bg-gray-100 rounded-md">
                          <Label className="font-medium">PEN (S/)</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCalculate}
                    className="w-full h-12 text-lg"
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
                  className="mt-8"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-600">
                        Resultado del Cálculo
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.isPretensionesIndeterminadas ? (
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Monto del Contrato:</span>
                            <span className="font-medium">
                              {/* S/ {result.amount.toLocaleString()} */}
                              {new Intl.NumberFormat("es-PE", {
                                style: "currency",
                                currency: "PEN",
                                minimumFractionDigits: 2,
                              }).format(result.amount)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Número de Pretensiones:</span>
                            <span className="font-medium">
                              {result.numeroPretensiones}
                            </span>
                          </div>
                          <div className="border-t pt-4">
                            <div className="flex justify-between">
                              <span>Sub Total:</span>
                              <span className="font-medium">
                                {new Intl.NumberFormat("es-PE", {
                                  style: "currency",
                                  currency: "PEN",
                                  minimumFractionDigits: 2,
                                }).format(result.baseCalculation)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>IGV (18%):</span>
                              <span className="font-medium">
                                {/* S/ {result.igv.toFixed(2)} */}
                                {new Intl.NumberFormat("es-PE", {
                                  style: "currency",
                                  currency: "PEN",
                                  minimumFractionDigits: 2,
                                }).format(result.igv)}
                              </span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-primary mt-4">
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
                          <div className="flex justify-between">
                            <span>Cuantía:</span>
                            <span className="font-medium">
                              {new Intl.NumberFormat("es-PE", {
                                style: "currency",
                                currency: "PEN",
                                minimumFractionDigits: 2,
                              }).format(result.amount)}
                              {/* S/ {result.amount.toLocaleString()} */}
                            </span>
                          </div>

                          <div className="border-t pt-4">
                            <h3 className="font-bold mb-2">
                              Servicio Arbitraje Emergencia
                            </h3>
                            <div className="flex justify-between">
                              <span>Monto Base:</span>
                              <span className="font-medium">
                                {/* S/ {result.servicioEmergenciaBase.toFixed(2)} */}
                                {new Intl.NumberFormat("es-PE", {
                                  style: "currency",
                                  currency: "PEN",
                                  minimumFractionDigits: 2,
                                }).format(result.servicioEmergenciaBase)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>IGV (18%):</span>
                              <span className="font-medium">
                                {/* S/ {result.igvServicio.toFixed(2)} */}
                                {new Intl.NumberFormat("es-PE", {
                                  style: "currency",
                                  currency: "PEN",
                                  minimumFractionDigits: 2,
                                }).format(result.igvServicio)}
                              </span>
                            </div>
                            <div className="flex justify-between font-bold">
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

                          <div className="border-t pt-4">
                            <h3 className="font-bold mb-2">
                              Árbitro Emergencia
                            </h3>
                            <div className="flex justify-between">
                              <span>Monto Base:</span>
                              <span className="font-medium">
                                {/* S/ {result.arbitroEmergenciaBase.toFixed(2)} */}
                                {new Intl.NumberFormat("es-PE", {
                                  style: "currency",
                                  currency: "PEN",
                                  minimumFractionDigits: 2,
                                }).format(result.arbitroEmergenciaBase)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>IGV (18%):</span>
                              <span className="font-medium">
                                {/* S/ {result.igvArbitro.toFixed(2)} */}
                                {new Intl.NumberFormat("es-PE", {
                                  style: "currency",
                                  currency: "PEN",
                                  minimumFractionDigits: 2,
                                }).format(result.igvArbitro)}
                              </span>
                            </div>
                            <div className="flex justify-between font-bold">
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

                          <div className="border-t pt-4">
                            <div className="flex justify-between text-lg">
                              <span>Subtotal:</span>
                              <span className="font-medium">
                                {/* S/ {result.subtotal.toFixed(2)} */}

                                {new Intl.NumberFormat("es-PE", {
                                  style: "currency",
                                  currency: "PEN",
                                  minimumFractionDigits: 2,
                                }).format(result.subtotal)}
                              </span>
                            </div>
                            <div className="flex justify-between text-lg">
                              <span>Tasa de Presentación:</span>
                              <span className="font-medium">
                                {/* S/ {result.presentationFee.toFixed(2)} */}
                                {new Intl.NumberFormat("es-PE", {
                                  style: "currency",
                                  currency: "PEN",
                                  minimumFractionDigits: 2,
                                }).format(result.presentationFee)}
                              </span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-primary mt-4">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Cuantía:</span>
                              <span className="font-medium">
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
                              <span className="font-medium">
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
                              <span className="font-medium">
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
                                    <span className="font-medium">
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
                                    <span className="font-medium">
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
                              <span className="font-medium">
                                {/* S/ {result.subtotal.toFixed(2)} */}
                                {new Intl.NumberFormat("es-PE", {
                                  style: "currency",
                                  currency: "PEN",
                                  minimumFractionDigits: 2,
                                }).format(result.subtotal)}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>IGV (18%):</span>
                              <span className="font-medium">
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
                              <span className="font-medium">
                                {/* S/ {result.renta.toFixed(2)} */}
                                {new Intl.NumberFormat("es-PE", {
                                  style: "currency",
                                  currency: "PEN",
                                  minimumFractionDigits: 2,
                                }).format(result.renta)}
                              </span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-primary">
                              <span>Total con IGV:</span>
                              <span>
                                {/* S/ {result.totalWithIGV.toFixed(2)} */}
                                {new Intl.NumberFormat("es-PE", {
                                  style: "currency",
                                  currency: "PEN",
                                  minimumFractionDigits: 2,
                                }).format(result.retotalWithIGVnta)}
                              </span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-primary">
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
                      <div className="flex gap-4 mt-6">
                        <Button
                          onClick={exportToPDF}
                          className="flex-1"
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
                          className="flex-1 bg-transparent"
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
      </section>
    </div>
  );
}
