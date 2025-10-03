"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Save } from "lucide-react";
import { getCalculatorConfigs, saveCalculatorConfig } from "@/lib/calculator";

export default function CalculatorAdmin() {
  const [configs, setConfigs] = useState({});
  const [activeTab, setActiveTab] = useState(
    "CalculadoraGastosAdministrativos"
  );
  const [editingFee, setEditingFee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadConfigs = async () => {
      try {
        console.log("[v0] Loading calculator configs from Firebase...");
        setLoading(true);
        const loadedConfigs = await getCalculatorConfigs();
        console.log("[v0] Loaded configs:", loadedConfigs);
        setConfigs(loadedConfigs);
      } catch (error) {
        console.error("[v0] Error loading configs:", error);
        alert("Error al cargar las configuraciones desde la base de datos");
      } finally {
        setLoading(false);
      }
    };

    loadConfigs();
  }, []);

  const handleSaveConfigs = async () => {
    console.log("[v0] Saving configs to Firebase:", configs);
    try {
      setSaving(true);

      // Save each calculator configuration individually
      for (const [type, config] of Object.entries(configs)) {
        await saveCalculatorConfig(type, config);
        console.log(`[v0] Saved config for ${type}`);
      }

      alert("Configuraciones guardadas exitosamente en la base de datos");
    } catch (error) {
      console.error("[v0] Error saving configs:", error);
      alert("Error al guardar las configuraciones en la base de datos");
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = (type, field, value) => {
    console.log(`[v0] Updating config ${type}.${field} to:`, value);
    setConfigs((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const addFeeRange = (type) => {
    const newFee = {
      min: 0,
      max: 0,
      rate: 0,
      minFee: 0,
      maxFee: null,
      baseAmount: 0,
    };

    console.log(`[v0] Adding new fee range to ${type}`);
    setConfigs((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        fees: [...(prev[type]?.fees || []), newFee],
      },
    }));
  };

  const updateFeeRange = (type, index, field, value) => {
    console.log(
      `[v0] Updating fee range ${type}[${index}].${field} to:`,
      value
    );
    setConfigs((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        fees: prev[type].fees.map((fee, i) =>
          i === index ? { ...fee, [field]: value } : fee
        ),
      },
    }));
  };

  const deleteFeeRange = (type, index) => {
    console.log(`[v0] Deleting fee range ${type}[${index}]`);
    setConfigs((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        fees: prev[type].fees.filter((_, i) => i !== index),
      },
    }));
  };

  const renderFeeTable = (type) => {
    const config = configs[type];
    console.log(config);

    if (!config) {
      console.log(`[v0] No config found for type: ${type}`);
      return <div>Cargando configuración...</div>;
    }

    return (
      <div className="space-y-4">
        {/* Presentation Fee */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nombre de la Calculadora</Label>
              <Input
                value={config.name || ""}
                onChange={(e) => updateConfig(type, "name", e.target.value)}
              />
            </div>

            <div>
              <Label>Tasa de Presentación (S/)</Label>
              <Input
                type="number"
                step="0.01"
                value={config.presentationFee || 0}
                onChange={(e) =>
                  updateConfig(
                    type,
                    "presentationFee",
                    Number.parseFloat(e.target.value) || 0
                  )
                }
              />
            </div>
            {config?.name == "ARBITRAJE DE CONTRATACIÓN PÚBLICA" && (
              <>
                <div>
                  <Label>Pretensiones indeterminadas %</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={config.Pretensiones || 0}
                    onChange={(e) =>
                      updateConfig(
                        type,
                        "Pretensiones",
                        Number.parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Para Gastos de Arbitraje %</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={config.GastosArbitraje || 0}
                      onChange={(e) =>
                        updateConfig(
                          type,
                          "GastosArbitraje",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>{" "}
                  <div>
                    <Label>Para Arbitraje de Emergencia %</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={config.ArbitrajeEmergencia || 0}
                      onChange={(e) =>
                        updateConfig(
                          type,
                          "ArbitrajeEmergencia",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                </div>
              </>
            )}
            {config?.name == "ARBITRAJE DE EMERGENCIA" && (
              <>
                <div>
                  <Label>Pretensiones indeterminadas %</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={config.PretensionesEmergencia || 0}
                    onChange={(e) =>
                      updateConfig(
                        type,
                        "PretensionesEmergencia",
                        Number.parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Fee Ranges */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Rangos de Tarifas</CardTitle>
            <Button onClick={() => addFeeRange(type)} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Rango
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(config.fees || []).map((fee, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div>
                      <Label>Mínimo (S/)</Label>
                      <Input
                        type="number"
                        value={fee.min || 0}
                        onChange={(e) =>
                          updateFeeRange(
                            type,
                            index,
                            "min",
                            Number.parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Máximo (S/)</Label>
                      <Input
                        type="number"
                        value={
                          fee.max === Number.POSITIVE_INFINITY
                            ? ""
                            : fee.max || 0
                        }
                        placeholder="∞"
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? Number.POSITIVE_INFINITY
                              : Number.parseInt(e.target.value) || 0;
                          updateFeeRange(type, index, "max", value);
                        }}
                      />
                    </div>

                    {type === "CalculadoraTribunalEmergencia" ? (
                      <>
                        <div>
                          <Label>Arbitro de Emergencia</Label>
                          <Input
                            type="number"
                            step="0.001"
                            value={(fee.ArbitroEmergencia || 0) * 100}
                            onChange={(e) =>
                              updateFeeRange(
                                type,
                                index,
                                "ArbitroEmergencia",
                                (Number.parseFloat(e.target.value) || 0) / 100
                              )
                            }
                          />
                        </div>{" "}
                        <div>
                          <Label>Servicio de Arbitraje Emergencia</Label>
                          <Input
                            type="number"
                            step="0.001"
                            value={(fee.ServicioArbitrajeEmergencia || 0) * 100}
                            onChange={(e) =>
                              updateFeeRange(
                                type,
                                index,
                                "ServicioArbitrajeEmergencia",
                                (Number.parseFloat(e.target.value) || 0) / 100
                              )
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Label>Tasa (%)</Label>
                          <Input
                            type="number"
                            step="0.001"
                            value={(fee.rate || 0) * 100}
                            onChange={(e) =>
                              updateFeeRange(
                                type,
                                index,
                                "rate",
                                (Number.parseFloat(e.target.value) || 0) / 100
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Tarifa Mín (S/)</Label>
                          <Input
                            type="number"
                            value={fee.minFee || 0}
                            onChange={(e) =>
                              updateFeeRange(
                                type,
                                index,
                                "minFee",
                                Number.parseFloat(e.target.value) || 0
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Tarifa Máx (S/)</Label>
                          <Input
                            type="number"
                            value={fee.maxFee || ""}
                            placeholder="Sin límite"
                            onChange={(e) => {
                              const value =
                                e.target.value === ""
                                  ? null
                                  : Number.parseFloat(e.target.value) || 0;
                              updateFeeRange(type, index, "maxFee", value);
                            }}
                          />
                        </div>
                        <div>
                          <Label>Base (S/)</Label>
                          <Input
                            type="number"
                            value={fee.baseAmount || 0}
                            onChange={(e) =>
                              updateFeeRange(
                                type,
                                index,
                                "baseAmount",
                                Number.parseInt(e.target.value) || 0
                              )
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteFeeRange(type, index)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">
            Cargando configuraciones desde la base de datos...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Administrador de Calculadoras</h1>
          <p className="text-gray-600 mt-2">
            Gestiona los parámetros de las calculadoras de arbitraje
          </p>
        </div>
        <Button
          onClick={handleSaveConfigs}
          className="bg-green-600 hover:bg-green-700"
          disabled={saving}
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
          <TabsTrigger value="CalculadoraGastosAdministrativos">
            Gastos Administrativos
          </TabsTrigger>
          <TabsTrigger value="CalculadoraArbitroUnico">
            Árbitro Único
          </TabsTrigger>
          <TabsTrigger value="CalculadoraTribunalArbitral">
            Tribunal Arbitral
          </TabsTrigger>
          <TabsTrigger value="CalculadoraTribunalEmergencia">
            Tribunal de Emergencia
          </TabsTrigger>
        </TabsList>

        <TabsContent value="CalculadoraGastosAdministrativos">
          {renderFeeTable("CalculadoraGastosAdministrativos")}
        </TabsContent>

        <TabsContent value="CalculadoraArbitroUnico">
          {renderFeeTable("CalculadoraArbitroUnico")}
        </TabsContent>

        <TabsContent value="CalculadoraTribunalArbitral">
          {renderFeeTable("CalculadoraTribunalArbitral")}
        </TabsContent>
        <TabsContent value="CalculadoraTribunalEmergencia">
          {renderFeeTable("CalculadoraTribunalEmergencia")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
