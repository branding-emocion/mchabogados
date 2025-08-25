"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  Download,
  FileText,
  Users,
  Scale,
  Badge,
  ArrowRight,
  Settings,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Link from "next/link";
import { getCalculatorConfig } from "@/lib/calculator";

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

  useEffect(() => {
    const loadConfigs = async () => {
      try {
        console.log(
          "[v0] Loading calculator configs from Firebase with PascalCase IDs..."
        );
        setLoading(true);

        const configs = {};
        const calculatorTypes = [
          "CalculadoraGastosAdministrativos",
          "CalculadoraArbitroUnico",
          "CalculadoraTribunalArbitral",
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

    const presentationFee = config.presentationFee;
    const calculatedFee = calculateFee(numAmount, config.fees);

    const subtotal = calculatedFee;
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
    };

    setResult(calculationResult);
    setShowResult(true);
  };

  const exportToPDF = async () => {
    if (!result) return;

    setIsGeneratingPDF(true);

    try {
      const doc = new jsPDF();

      // Header
      doc.setFontSize(20);
      doc.text("Cotización de Arbitraje", 20, 30);

      doc.setFontSize(12);
      doc.text(`Calculadora: ${result.calculatorName}`, 20, 45);
      doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 55);

      // Results table
      const tableData = [
        ["Concepto", "Monto"],
        ["Cuantía", `S/ ${result.amount.toLocaleString()}`],
        ["Tasa de Presentación", `S/ ${result.presentationFee.toFixed(2)}`],
        ["Tarifa Calculada", `S/ ${result.calculatedFee.toFixed(2)}`],
        ["Subtotal", `S/ ${result.subtotal.toFixed(2)}`],
        ["IGV (18%)", `S/ ${result.igv.toFixed(2)}`],
        ["Retención (8%)", `S/ ${result.renta.toFixed(2)}`],
        ["Total con IGV", `S/ ${result.totalWithIGV.toFixed(2)}`],
        ["Total con Retención", `S/ ${result.totalWithRenta.toFixed(2)}`],
      ];

      doc.autoTable({
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
  };

  const currentConfig = calculatorConfigs[activeCalculator];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="text-lg">
            Cargando configuraciones desde la base de datos...
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Calculadora Oficial
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Calculadoras de Arbitraje
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Calcula los costos de arbitraje de manera precisa según las
              tarifas oficiales
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Tabs
            value={activeCalculator}
            onValueChange={setActiveCalculator}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="CalculadoraGastosAdministrativos"
                className="flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Gastos Administrativos
              </TabsTrigger>
              <TabsTrigger
                value="CalculadoraArbitroUnico"
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Árbitro Único
              </TabsTrigger>
              <TabsTrigger
                value="CalculadoraTribunalArbitral"
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Tribunal Arbitral
              </TabsTrigger>
            </TabsList>

            {/* Calculator Content */}
            <TabsContent value={activeCalculator}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="w-5 h-5" />
                    {currentConfig?.name || "Calculadora de Arbitraje"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Amount Input */}
                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      Pretensiones Determinadas
                      <span className="text-sm text-gray-500 ml-2">
                        Monto de la cuantía | Tasa: SUNAT (3.522)
                      </span>
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

                  {/* Calculate Button */}
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

              {/* Results */}
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Cuantía:</span>
                            <span className="font-medium">
                              S/ {result.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tasa de Presentación:</span>
                            <span className="font-medium">
                              S/ {result.presentationFee.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tarifa Calculada:</span>
                            <span className="font-medium">
                              S/ {result.calculatedFee.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span className="font-medium">
                              S/ {result.subtotal.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>IGV (18%):</span>
                            <span className="font-medium">
                              S/ {result.igv.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Retención (8%):</span>
                            <span className="font-medium">
                              S/ {result.renta.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-primary">
                            <span>Total con IGV:</span>
                            <span>S/ {result.totalWithIGV.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-secondary">
                            <span>Total con Retención:</span>
                            <span>S/ {result.totalWithRenta.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          onClick={exportToPDF}
                          disabled={isGeneratingPDF}
                          className="flex-1"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          {isGeneratingPDF ? "GENERANDO..." : "DESCARGAR PDF"}
                        </Button>
                        <Button
                          onClick={resetCalculation}
                          variant="outline"
                          className="flex-1 bg-transparent"
                        >
                          REALIZAR NUEVO CÁLCULO
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

      <Footer />
    </div>
  );
}
