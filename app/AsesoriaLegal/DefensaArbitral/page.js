"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  FileText,
  Gavel,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import ContactSection from "@/components/ContactSection";

const processSteps = [
  {
    number: 1,
    title: "INICIO DEL ARBITRAJE",
    description: "Presentación de la demanda arbitral y documentos de respaldo",
  },
  {
    number: 2,
    title: "CONSTITUCIÓN DEL TRIBUNAL ARBITRAL",
    description:
      "Designación y confirmación de los árbitros según las reglas establecidas",
  },
  {
    number: 3,
    title: "FIJACIÓN DE REGLAS Y COSTOS",
    description:
      "Establecimiento del procedimiento y determinación de costos arbitrales",
  },
  {
    number: 4,
    title: "ETAPA POSTULATORIA",
    description:
      "Intercambio de escritos, demanda, contestación y reconvención",
  },
  {
    number: 5,
    title: "ETAPA DE AUDIENCIAS",
    description:
      "Presentación de pruebas, testimonios y alegatos de las partes",
  },
  {
    number: 6,
    title: "FIN DEL ARBITRAJE",
    description: "Emisión del laudo arbitral y conclusión del proceso",
  },
];

const comparisonData = [
  {
    aspect: "Apelación",
    arbitraje:
      "El laudo arbitral es definitivo y no suele admitir apelaciones.",
    litigio:
      "Existen varias instancias de apelación, lo que alarga el proceso.",
  },
  {
    aspect: "Elección del árbitro/Juez",
    arbitraje: "Las partes eligen a los árbitros con experiencia específica.",
    litigio: "No se elige al juez, designado por el tribunal.",
  },
  {
    aspect: "Confidencialidad",
    arbitraje: "Proceso privado, no se hace público.",
    litigio: "Información pública, accesible para terceros.",
  },
  {
    aspect: "Costos",
    arbitraje: "Menores en el largo plazo debido a la rapidez del proceso.",
    litigio: "Costos acumulativos debido a la prolongación del proceso.",
  },
  {
    aspect: "Duración",
    arbitraje: "Plazos cortos y flexibles, generalmente de 6 meses a 1 año.",
    litigio: "Proceso extenso, puede durar varios años.",
  },
];

export default function ProcesoArbitralPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
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
            <Badge className="mb-4 bg-primary/20 text-primary-foreground border-primary/30">
              Asesoría Legal Especializada
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              PROCESO
              <span className="block text-primary">ARBITRAL</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              En MCH ABOGADOS, nos especializamos en arbitraje comercial,
              laboral e internacional. Ofrecemos soluciones rápidas y efectivas
              para la resolución de disputas empresariales y contractuales a
              través de procesos arbitrales.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Solicitar Consulta
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Proceso Arbitral
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              El arbitraje es un proceso rápido y eficaz. En esta sección,
              describimos paso a paso cómo llevamos a cabo el procedimiento
              arbitral, desde la presentación de la demanda hasta la emisión del
              laudo.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary/20 transform -translate-y-1/2 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto relative z-10">
                          {step.number}
                        </div>
                      </div>
                      <h3 className="font-semibold text-sm mb-3 text-foreground leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-10 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Arbitraje vs. Litigio Judicial
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conoce las ventajas del arbitraje frente al litigio tradicional
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="p-4 text-left font-semibold">Aspecto</th>
                      <th className="p-4 text-left font-semibold">
                        <div className="flex items-center">
                          <Scale className="mr-2 h-5 w-5" />
                          Arbitraje
                        </div>
                      </th>
                      <th className="p-4 text-left font-semibold">
                        <div className="flex items-center">
                          <Gavel className="mr-2 h-5 w-5" />
                          Litigio Judicial
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <motion.tr
                        key={row.aspect}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        <td className="p-4 font-medium text-foreground bg-muted/30">
                          {row.aspect}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          <div className="flex items-start">
                            <CheckCircle className="mr-2 h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            {row.arbitraje}
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {row.litigio}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
      {/* CTA Section */}
      <ContactSection />
    </div>
  );
}
