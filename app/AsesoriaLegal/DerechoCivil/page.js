"use client";

import { motion } from "framer-motion";
import {
  Scale,
  FileText,
  Users,
  Home,
  Heart,
  CheckCircle,
  Clock,
  Shield,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";

const civilLawAreas = [
  {
    icon: FileText,
    title: "Contratos y Obligaciones",
    description:
      "Redacción, revisión y ejecución de contratos civiles y comerciales.",
    features: [
      "Contratos de compraventa",
      "Arrendamientos",
      "Prestación de servicios",
      "Incumplimiento contractual",
    ],
  },
  {
    icon: Home,
    title: "Derecho Inmobiliario",
    description:
      "Asesoría integral en transacciones y conflictos inmobiliarios.",
    features: [
      "Compraventa de inmuebles",
      "Hipotecas y garantías",
      "Propiedad horizontal",
      "Desalojos",
    ],
  },
  {
    icon: Heart,
    title: "Derecho de Familia",
    description: "Protección de los derechos familiares y patrimoniales.",
    features: [
      "Divorcios y separaciones",
      "Régimen patrimonial",
      "Alimentos",
      "Tenencia de menores",
    ],
  },
  {
    icon: Users,
    title: "Responsabilidad Civil",
    description: "Defensa y reclamación por daños y perjuicios.",
    features: [
      "Accidentes de tránsito",
      "Responsabilidad médica",
      "Daño moral",
      "Indemnizaciones",
    ],
  },
];

const benefits = [
  {
    icon: Scale,
    title: "Experiencia Comprobada",
    description: "Más de 15 años resolviendo casos civiles complejos",
  },
  {
    icon: Shield,
    title: "Protección Integral",
    description: "Defendemos sus derechos patrimoniales y personales",
  },
  {
    icon: Clock,
    title: "Atención Personalizada",
    description: "Seguimiento continuo de su caso hasta su resolución",
  },
  {
    icon: Award,
    title: "Resultados Exitosos",
    description: "Alto índice de casos ganados y acuerdos favorables",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Consulta Inicial",
    description: "Evaluamos su caso y determinamos la mejor estrategia legal",
  },
  {
    number: "02",
    title: "Análisis Jurídico",
    description:
      "Revisamos documentos y evidencias para fortalecer su posición",
  },
  {
    number: "03",
    title: "Estrategia Legal",
    description: "Desarrollamos un plan de acción personalizado para su caso",
  },
  {
    number: "04",
    title: "Ejecución y Seguimiento",
    description: "Implementamos la estrategia y monitoreamos el progreso",
  },
];

export default function DerechoCivilPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/90 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/DefensaArbitral.avif')`,
          }}
        />

        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              DERECHO CIVIL
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              En MCH ABOGADOS, brindamos asesoría especializada en derecho
              civil, protegiendo sus derechos patrimoniales y personales con
              soluciones jurídicas efectivas y personalizadas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Civil Law Areas Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Áreas de Especialización Civil
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ofrecemos servicios integrales en las principales ramas del
              derecho civil
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {civilLawAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <area.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {area.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {area.description}
                    </p>
                    <ul className="space-y-2">
                      {area.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por Qué Elegirnos?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nuestro compromiso con la excelencia nos distingue en el ámbito
              del derecho civil
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Un enfoque sistemático para garantizar los mejores resultados en
              su caso
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ContactSection />
    </div>
  );
}
