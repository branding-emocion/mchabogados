"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  Download,
  FileText,
  Users,
  Scale,
  Badge,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Link from "next/link";

// Tablas oficiales según PDF de MCH Abogados
const PRESENTATION_FEE = 650.0; // Incluye IGV

const ADMINISTRATIVE_FEES = [
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
    rate: 0.05,
    minFee: 20200,
    maxFee: 25200,
    baseAmount: 300000,
  },
  {
    min: 500001,
    max: 1000000,
    rate: 0.03,
    minFee: 25200,
    maxFee: 36200,
    baseAmount: 500000,
  },
  {
    min: 1000001,
    max: 5000000,
    rate: 0.012,
    minFee: 36200,
    maxFee: 53200,
    baseAmount: 1000000,
  },
  {
    min: 5000001,
    max: 50000000,
    rate: 0.005,
    minFee: 53200,
    maxFee: 83200,
    baseAmount: 5000000,
  },
  {
    min: 50000001,
    max: Number.POSITIVE_INFINITY,
    rate: 0.003,
    minFee: 83200,
    maxFee: null,
    baseAmount: 50000000,
  },
];

const SINGLE_ARBITRATOR_FEES = [
  {
    min: 20001,
    max: 60000,
    rate: 0.07,
    minFee: 5000,
    maxFee: 7800,
    baseAmount: 20000,
  },
  {
    min: 60001,
    max: 150000,
    rate: 0.049,
    minFee: 8600,
    maxFee: 13010,
    baseAmount: 60000,
  },
  {
    min: 150001,
    max: 300000,
    rate: 0.05,
    minFee: 13010,
    maxFee: 19760,
    baseAmount: 150000,
  },
  {
    min: 300001,
    max: 500000,
    rate: 0.061,
    minFee: 19760,
    maxFee: 25960,
    baseAmount: 300000,
  },
  {
    min: 500001,
    max: 1000000,
    rate: 0.042,
    minFee: 25960,
    maxFee: 42960,
    baseAmount: 500000,
  },
  {
    min: 1000001,
    max: 5000000,
    rate: 0.013,
    minFee: 42960,
    maxFee: 69960,
    baseAmount: 1000000,
  },
  {
    min: 5000001,
    max: 50000000,
    rate: 0.006,
    minFee: 69960,
    maxFee: 374960,
    baseAmount: 5000000,
  },
  {
    min: 50000001,
    max: Number.POSITIVE_INFINITY,
    rate: 0.005,
    minFee: 376200,
    maxFee: null,
    baseAmount: 50000000,
  },
];

const TRIBUNAL_ARBITRAL_FEES = [
  {
    min: 20001,
    max: 60000,
    rate: 0.3,
    minFee: 5000,
    maxFee: 15000,
    baseAmount: 20000,
  },
  {
    min: 60001,
    max: 150000,
    rate: 0.15,
    minFee: 16600,
    maxFee: 25100,
    baseAmount: 60000,
  },
  {
    min: 150001,
    max: 300000,
    rate: 0.152,
    minFee: 25100,
    maxFee: 44900,
    baseAmount: 150000,
  },
  {
    min: 300001,
    max: 500000,
    rate: 0.18,
    minFee: 44900,
    maxFee: 66900,
    baseAmount: 300000,
  },
  {
    min: 500001,
    max: 1000000,
    rate: 0.125,
    minFee: 66900,
    maxFee: 74400,
    baseAmount: 500000,
  },
  {
    min: 1000001,
    max: 5000000,
    rate: 0.038,
    minFee: 74400,
    maxFee: 89400,
    baseAmount: 1000000,
  },
  {
    min: 5000001,
    max: 50000000,
    rate: 0.015,
    minFee: 89400,
    maxFee: 580400,
    baseAmount: 5000000,
  },
  {
    min: 50000001,
    max: Number.POSITIVE_INFINITY,
    rate: 0.007,
    minFee: 580400,
    maxFee: null,
    baseAmount: 50000000,
  },
];

export default function CotizarPage() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("PEN");
  const [arbitrationType, setArbitrationType] = useState("unico");
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const calculateFee = (amount, feeTable) => {
    const currentTier = feeTable.find(
      (t) => amount >= t.min && amount <= t.max
    );

    if (!currentTier) {
      return 0;
    }

    // Calculate excess amount over the base amount for this tier
    const excessAmount = amount - currentTier.baseAmount;

    // Calculate fee on excess: excess × rate
    const excessFee = excessAmount * currentTier.rate;

    // Total fee = excess fee + minimum base fee for this tier
    const totalFee = excessFee + currentTier.minFee;

    // The calculated fee is the correct amount according to the progressive system
    return Math.max(totalFee, currentTier.minFee);
  };

  const handleCalculate = () => {
    const numAmount = Number.parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;

    const presentationFee = PRESENTATION_FEE;
    const administrativeFee = calculateFee(numAmount, ADMINISTRATIVE_FEES);

    // Use appropriate arbitrator fee table
    const arbitratorFeeTable =
      arbitrationType === "tribunal"
        ? TRIBUNAL_ARBITRAL_FEES
        : SINGLE_ARBITRATOR_FEES;
    const arbitratorFee = calculateFee(numAmount, arbitratorFeeTable);

    const subtotal = administrativeFee + arbitratorFee;
    const igv = subtotal * 0.18;
    const renta = subtotal * 0.08; // 8% income tax
    const totalWithIGV = subtotal + igv;
    const totalWithRenta = subtotal + renta;

    const calculationResult = {
      amount: numAmount,
      presentationFee,
      administrativeFee,
      arbitratorFee,
      subtotal,
      igv,
      renta,
      totalWithIGV,
      totalWithRenta,
      currency,
      arbitrationType,
    };

    setResult(calculationResult);
    setShowResult(true);
  };

  const exportToPDF = async () => {
    if (!result) return;

    setIsGeneratingPDF(true);

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Colors
      const colors = {
        primary: [52, 152, 219], // MCH blue
        secondary: [149, 165, 166],
        accent: [41, 128, 185],
        success: [39, 174, 96],
        light: [245, 245, 245],
        white: [255, 255, 255],
        text: [44, 62, 80],
      };

      // Header
      doc.setFillColor(...colors.primary);
      doc.rect(0, 0, 210, 30, "F");
      doc.setTextColor(...colors.white);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("MCH ABOGADOS", 105, 12, { align: "center" });
      doc.setFontSize(14);
      doc.text("Cotización de Costos Arbitrales", 105, 22, { align: "center" });

      // Date and details
      const currentDate = new Date().toLocaleDateString("es-PE");
      doc.setTextColor(...colors.text);
      doc.setFontSize(10);
      doc.text(`Fecha: ${currentDate}`, 14, 40);
      doc.text(
        `Monto: S/${result.amount.toLocaleString("es-PE", {
          minimumFractionDigits: 2,
        })}`,
        14,
        46
      );
      doc.text(
        `Tipo: ${
          result.arbitrationType === "tribunal"
            ? "Tribunal Arbitral"
            : "Árbitro Único"
        }`,
        14,
        52
      );

      const tableData = [
        [
          "Tasa de presentación",
          `S/${result.presentationFee.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`,
          "Incluido",
          "-",
          `S/${result.presentationFee.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`,
          `S/${result.presentationFee.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`,
        ],
        [
          "Servicio de Administración de Arbitraje",
          `S/${result.administrativeFee.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`,
          `S/${(result.administrativeFee * 0.18).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`,
          `S/${(result.administrativeFee * 0.08).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`,
          `S/${(result.administrativeFee * 1.18).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`,
          `S/${(result.administrativeFee * 1.08).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`,
        ],
        [
          `Honorarios ${
            result.arbitrationType === "tribunal"
              ? "Tribunal Arbitral"
              : "Árbitro Único"
          }`,
          `S/${result.arbitratorFee.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`,
          `S/${(result.arbitratorFee * 0.18).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`,
          `S/${(result.arbitratorFee * 0.08).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`,
          `S/${(result.arbitratorFee * 1.18).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`,
          `S/${(result.arbitratorFee * 1.08).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
          })}`,
        ],
      ];

      const totalCostService = result.presentationFee + result.subtotal;
      const totalIGV = result.igv; // IGV only applies to administrative and arbitrator fees
      const totalRenta = result.renta; // Renta only applies to administrative and arbitrator fees
      const totalWithIGV = result.presentationFee + result.totalWithIGV;
      const totalWithRenta = result.presentationFee + result.totalWithRenta;

      tableData.push([
        "TOTAL",
        `S/${totalCostService.toLocaleString("es-PE", {
          minimumFractionDigits: 2,
        })}`,
        `S/${totalIGV.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`,
        `S/${totalRenta.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`,
        `S/${totalWithIGV.toLocaleString("es-PE", {
          minimumFractionDigits: 2,
        })}`,
        `S/${totalWithRenta.toLocaleString("es-PE", {
          minimumFractionDigits: 2,
        })}`,
      ]);

      // Create table using autoTable
      doc.autoTable({
        startY: 60,
        head: [
          [
            "El nombre del servicio",
            "El costo del servicio",
            "IGV (18%)",
            "Renta (8%)",
            "Total con IGV",
            "Total con Renta",
          ],
        ],
        body: tableData,
        theme: "grid",
        headStyles: {
          fillColor: colors.primary,
          textColor: colors.white,
          fontStyle: "bold",
          halign: "center",
          fontSize: 9,
          cellPadding: 3,
        },
        styles: {
          fontSize: 8,
          cellPadding: 2,
          lineColor: colors.secondary,
          lineWidth: 0.3,
          textColor: colors.text,
        },
        columnStyles: {
          0: { cellWidth: 45, halign: "left" },
          1: { cellWidth: 28, halign: "right" },
          2: { cellWidth: 25, halign: "right" },
          3: { cellWidth: 25, halign: "right" },
          4: { cellWidth: 28, halign: "right" },
          5: { cellWidth: 28, halign: "right" },
        },
        didParseCell: (data) => {
          if (data.row.index === tableData.length - 1) {
            // Last row (TOTAL)
            data.cell.styles.fillColor = colors.primary;
            data.cell.styles.textColor = colors.white;
            data.cell.styles.fontStyle = "bold";
          }
        },
        margin: { left: 14, right: 14 },
      });

      const finalY = doc.lastAutoTable.finalY + 10;

      // Note section
      doc.setFillColor(...colors.light);
      doc.rect(14, finalY, 182, 25, "F");
      doc.setTextColor(...colors.text);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Cada Parte Deberá Asumir El 50%", 105, finalY + 8, {
        align: "center",
      });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const noteText =
        "Con relación a los honorarios de los árbitros y el servicio de administración de arbitraje, cada parte deberá asumir el 50% de los costos arbitrales.";
      const splitText = doc.splitTextToSize(noteText, 170);
      doc.text(splitText, 105, finalY + 15, { align: "center" });

      // Footer
      doc.setTextColor(...colors.secondary);
      doc.setFontSize(8);
      doc.text(`Fecha: ${currentDate}`, 14, 280);
      doc.text("MCH Abogados S.A.C.", 105, 280, { align: "center" });
      doc.text("Página 1/1", 196, 280, { align: "right" });

      // Save PDF
      doc.save(
        `Cotizacion_Arbitral_MCH_${result.amount
          .toLocaleString("es-PE")
          .replace(/[,\s]/g, "")}_${new Date().toISOString().split("T")[0]}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error al generar el PDF. Por favor, intente nuevamente.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/DefensaArbitral.avif')`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Calculadora de Costos{" "}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Calcula los costos arbitrales según las pretensiones en disputa,
              ya sea ante un Árbitro Único o un Tribunal Arbitral, e incluye el
              servicio de administración del proceso.
            </p>
            <Link href="#contacto">
              <Button
                size="lg"
                className="hover:cursor-pointer bg-primary hover:bg-primary/90"
              >
                Solicitar Consulta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="GastosAdministrativos"
                className="flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Calculadora de gastos administrativos{" "}
              </TabsTrigger>
              <TabsTrigger
                value="ArbitroUnico"
                className="flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Calculadora de Árbitro único{" "}
              </TabsTrigger>
              <TabsTrigger
                value="TribunalArbitral"
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Calculadora de Tribunal Arbitral{" "}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="GastosAdministrativos">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="w-5 h-5" />
                    Calcular Costos Arbitrales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Tipo de Arbitraje */}
                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      Tipo de Arbitraje
                    </Label>
                    <RadioGroup
                      value={arbitrationType}
                      onValueChange={setArbitrationType}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unico" id="unico" />
                        <Label
                          htmlFor="unico"
                          className="flex items-center gap-2"
                        >
                          <Users className="w-4 h-4" />
                          Árbitro Único
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tribunal" id="tribunal" />
                        <Label
                          htmlFor="tribunal"
                          className="flex items-center gap-2"
                        >
                          <Users className="w-4 h-4" />
                          Tribunal Arbitral
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Monto y Moneda */}
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
                      <RadioGroup
                        value={currency}
                        onValueChange={setCurrency}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="PEN" id="pen" />
                          <Label htmlFor="pen">S/</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="USD" id="usd" />
                          <Label htmlFor="usd">USD</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <Button
                    onClick={handleCalculate}
                    className="w-full h-12 text-lg"
                    disabled={!amount || Number.parseFloat(amount) <= 0}
                  >
                    CALCULAR
                  </Button>
                </CardContent>
              </Card>

              {/* Results Modal */}
              {showResult && result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                >
                  <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <CardHeader className="bg-primary text-white">
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                          {result.arbitrationType === "tribunal" ? (
                            <Users className="w-5 h-5" />
                          ) : (
                            <Users className="w-5 h-5" />
                          )}
                          Para{" "}
                          {result.arbitrationType === "tribunal"
                            ? "Tribunal Arbitral"
                            : "Árbitro Único"}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowResult(false)}
                          className="text-white hover:bg-white/20"
                        >
                          ✕
                        </Button>
                      </div>
                      <p className="text-lg">
                        Monto de la cuantía:{" "}
                        {result.currency === "PEN" ? "S/" : "USD"}
                        {result.amount.toLocaleString("es-PE", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {/* Results Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-300">
                            <thead>
                              <tr className="bg-primary text-white">
                                <th className="border border-gray-300 p-3 text-left">
                                  El nombre del servicio
                                </th>
                                <th className="border border-gray-300 p-3 text-left">
                                  El costo del servicio
                                </th>
                                <th className="border border-gray-300 p-3 text-left">
                                  IGV
                                </th>
                                <th className="border border-gray-300 p-3 text-left">
                                  Renta
                                </th>
                                <th className="border border-gray-300 p-3 text-left">
                                  Total con IGV
                                </th>
                                <th className="border border-gray-300 p-3 text-left">
                                  Total con Renta
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-3">
                                  Tasa de presentación
                                </td>
                                <td className="border border-gray-300 p-3">
                                  S/
                                  {result.presentationFee.toLocaleString(
                                    "es-PE",
                                    { minimumFractionDigits: 2 }
                                  )}
                                </td>
                                <td className="border border-gray-300 p-3">
                                  Incluido
                                </td>
                                <td className="border border-gray-300 p-3">
                                  -
                                </td>
                                <td className="border border-gray-300 p-3">
                                  S/
                                  {result.presentationFee.toLocaleString(
                                    "es-PE",
                                    { minimumFractionDigits: 2 }
                                  )}
                                </td>
                                <td className="border border-gray-300 p-3">
                                  S/
                                  {result.presentationFee.toLocaleString(
                                    "es-PE",
                                    { minimumFractionDigits: 2 }
                                  )}
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-3">
                                  Servicio de Administración de Arbitraje
                                </td>
                                <td className="border border-gray-300 p-3">
                                  S/
                                  {result.administrativeFee.toLocaleString(
                                    "es-PE",
                                    { minimumFractionDigits: 2 }
                                  )}
                                </td>
                                <td className="border border-gray-300 p-3">
                                  S/
                                  {(
                                    result.administrativeFee * 0.18
                                  ).toLocaleString("es-PE", {
                                    minimumFractionDigits: 2,
                                  })}
                                </td>
                                <td className="border border-gray-300 p-3">
                                  S/
                                  {(
                                    result.administrativeFee * 0.08
                                  ).toLocaleString("es-PE", {
                                    minimumFractionDigits: 2,
                                  })}
                                </td>
                                <td className="border border-gray-300 p-3">
                                  S/
                                  {(
                                    result.administrativeFee * 1.18
                                  ).toLocaleString("es-PE", {
                                    minimumFractionDigits: 2,
                                  })}
                                </td>
                                <td className="border border-gray-300 p-3">
                                  S/
                                  {(
                                    result.administrativeFee * 1.08
                                  ).toLocaleString("es-PE", {
                                    minimumFractionDigits: 2,
                                  })}
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-3">
                                  Honorarios{" "}
                                  {result.arbitrationType === "tribunal"
                                    ? "Tribunal Arbitral"
                                    : "Árbitro Único"}
                                </td>
                                <td className="border border-gray-300 p-3">
                                  S/
                                  {result.arbitratorFee.toLocaleString(
                                    "es-PE",
                                    { minimumFractionDigits: 2 }
                                  )}
                                </td>
                                <td className="border border-gray-300 p-3">
                                  S/
                                  {(result.arbitratorFee * 0.18).toLocaleString(
                                    "es-PE",
                                    {
                                      minimumFractionDigits: 2,
                                    }
                                  )}
                                </td>
                                <td className="border border-gray-300 p-3">
                                  S/
                                  {(result.arbitratorFee * 0.08).toLocaleString(
                                    "es-PE",
                                    {
                                      minimumFractionDigits: 2,
                                    }
                                  )}
                                </td>
                                <td className="border border-gray-300 p-3">
                                  S/
                                  {(result.arbitratorFee * 1.18).toLocaleString(
                                    "es-PE",
                                    {
                                      minimumFractionDigits: 2,
                                    }
                                  )}
                                </td>
                                <td className="border border-gray-300 p-3">
                                  S/
                                  {(result.arbitratorFee * 1.08).toLocaleString(
                                    "es-PE",
                                    {
                                      minimumFractionDigits: 2,
                                    }
                                  )}
                                </td>
                              </tr>
                              <tr className="bg-blue-50 font-bold">
                                <td className="border border-gray-300 p-3">
                                  <strong>TOTAL</strong>
                                </td>
                                <td className="border border-gray-300 p-3">
                                  <strong>
                                    S/
                                    {result.subtotal.toLocaleString("es-PE", {
                                      minimumFractionDigits: 2,
                                    })}
                                  </strong>
                                </td>
                                <td className="border border-gray-300 p-3">
                                  <strong>
                                    S/
                                    {result.igv.toLocaleString("es-PE", {
                                      minimumFractionDigits: 2,
                                    })}
                                  </strong>
                                </td>
                                <td className="border border-gray-300 p-3">
                                  <strong>
                                    S/
                                    {result.renta.toLocaleString("es-PE", {
                                      minimumFractionDigits: 2,
                                    })}
                                  </strong>
                                </td>
                                <td className="border border-gray-300 p-3">
                                  <strong>
                                    S/
                                    {result.totalWithIGV.toLocaleString(
                                      "es-PE",
                                      { minimumFractionDigits: 2 }
                                    )}
                                  </strong>
                                </td>
                                <td className="border border-gray-300 p-3">
                                  <strong>
                                    S/
                                    {result.totalWithRenta.toLocaleString(
                                      "es-PE",
                                      { minimumFractionDigits: 2 }
                                    )}
                                  </strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Nota */}
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-yellow-800 mb-2">
                            Cada Parte Deberá Asumir El 50%
                          </h4>
                          <p className="text-sm text-yellow-700">
                            Con relación a los honorarios de los árbitros y el
                            servicio de administración de arbitraje, cada parte
                            deberá asumir el 50% de los costos arbitrales.
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                          <Button
                            onClick={exportToPDF}
                            className="flex-1 flex items-center gap-2"
                            disabled={isGeneratingPDF}
                          >
                            {isGeneratingPDF ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                GENERANDO PDF...
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4" />
                                DESCARGAR PDF
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setShowResult(false)}
                            className="flex-1"
                          >
                            REALIZAR NUEVO CÁLCULO
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="tables">
              <div className="space-y-8">
                {/* Tabla de Gastos Administrativos */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Gastos Administrativos y Secretaría Arbitral
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th className="border border-gray-300 p-3 text-left">
                              Cuantía
                            </th>
                            <th className="border border-gray-300 p-3 text-left">
                              Tasa
                            </th>
                            <th className="border border-gray-300 p-3 text-left">
                              Monto Mínimo (Sin IGV)
                            </th>
                            <th className="border border-gray-300 p-3 text-left">
                              Monto Máximo (Sin IGV)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {ADMINISTRATIVE_FEES.map((fee, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-3">
                                De S/{fee.min.toLocaleString()} hasta S/
                                {fee.max === Number.POSITIVE_INFINITY
                                  ? "∞"
                                  : fee.max.toLocaleString()}
                              </td>
                              <td className="border border-gray-300 p-3">
                                {(fee.rate * 100).toFixed(1)}% sobre la cantidad
                                que exceda de S/
                                {fee.baseAmount.toLocaleString()}
                              </td>
                              <td className="border border-gray-300 p-3">
                                S/{fee.minFee.toLocaleString()}
                              </td>
                              <td className="border border-gray-300 p-3">
                                {fee.maxFee
                                  ? `S/${fee.maxFee.toLocaleString()}`
                                  : "----"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabla de Honorarios Árbitro Único */}
                <Card>
                  <CardHeader>
                    <CardTitle>Honorarios del Árbitro Único</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th className="border border-gray-300 p-3 text-left">
                              Cuantía
                            </th>
                            <th className="border border-gray-300 p-3 text-left">
                              Tasa
                            </th>
                            <th className="border border-gray-300 p-3 text-left">
                              Monto Mínimo (Sin IGV)
                            </th>
                            <th className="border border-gray-300 p-3 text-left">
                              Monto Máximo (Sin IGV)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {SINGLE_ARBITRATOR_FEES.map((fee, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-3">
                                De S/{fee.min.toLocaleString()} hasta S/
                                {fee.max === Number.POSITIVE_INFINITY
                                  ? "∞"
                                  : fee.max.toLocaleString()}
                              </td>
                              <td className="border border-gray-300 p-3">
                                {(fee.rate * 100).toFixed(1)}% sobre la cantidad
                                que exceda de S/
                                {fee.baseAmount.toLocaleString()}
                              </td>
                              <td className="border border-gray-300 p-3">
                                S/{fee.minFee.toLocaleString()}
                              </td>
                              <td className="border border-gray-300 p-3">
                                {fee.maxFee
                                  ? `S/${fee.maxFee.toLocaleString()}`
                                  : "----"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabla de Honorarios Tribunal Arbitral */}
                <Card>
                  <CardHeader>
                    <CardTitle>Honorarios del Tribunal Arbitral</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th className="border border-gray-300 p-3 text-left">
                              Cuantía
                            </th>
                            <th className="border border-gray-300 p-3 text-left">
                              Tasa
                            </th>
                            <th className="border border-gray-300 p-3 text-left">
                              Monto Mínimo (Sin IGV)
                            </th>
                            <th className="border border-gray-300 p-3 text-left">
                              Monto Máximo (Sin IGV)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {TRIBUNAL_ARBITRAL_FEES.map((fee, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-3">
                                De S/{fee.min.toLocaleString()} hasta S/
                                {fee.max === Number.POSITIVE_INFINITY
                                  ? "∞"
                                  : fee.max.toLocaleString()}
                              </td>
                              <td className="border border-gray-300 p-3">
                                {(fee.rate * 100).toFixed(1)}% sobre la cantidad
                                que exceda de S/
                                {fee.baseAmount.toLocaleString()}
                              </td>
                              <td className="border border-gray-300 p-3">
                                S/{fee.minFee.toLocaleString()}
                              </td>
                              <td className="border border-gray-300 p-3">
                                {fee.maxFee
                                  ? `S/${fee.maxFee.toLocaleString()}`
                                  : "----"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Nota:</strong> Los montos calculados están
                        realizados en referencia a un Tribunal Arbitral
                        conformado por tres (03) árbitros.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Tasa de Presentación */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Tasa de Presentación de Solicitud de Arbitraje
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-8 bg-primary/10 rounded-lg">
                      <h3 className="text-2xl font-bold text-primary">
                        S/650.00
                      </h3>
                      <p className="text-gray-600 mt-2">Incluido IGV</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
