"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";

import { useState } from "react";
import { useRef } from "react";
import {
  FileText,
  Users,
  Calculator,
  MessageSquare,
  Volume2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const flowVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.8,
      ease: "easeOut",
    },
  },
};

export default function ClausulaArbitralPage() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const processSteps = [
    {
      id: 1,
      title: "Inicio del Arbitraje",
      description:
        "El procedimiento se inicia con la presentaciÃ³n de la solicitud de arbitraje, lo que da inicio al cÃ³mputo de plazos procesales. Posteriormente, se notifica formalmente a la parte demandada.",
      icon: FileText,
      color: "bg-blue-600",
      delay: 0.1,
    },
    {
      id: 2,
      title: "ConstituciÃ³n del Tribunal Arbitral",
      description:
        "Se designa un Ã¡rbitro Ãºnico o un tribunal colegiado de tres Ã¡rbitros, conforme al acuerdo arbitral o reglamento aplicable. Los Ã¡rbitros aceptan su cargo declarando independencia e imparcialidad.",
      icon: Users,
      color: "bg-indigo-600",
      delay: 0.2,
    },
    {
      id: 3,
      title: "FijaciÃ³n de Reglas y Costos",
      description:
        "En una audiencia preliminar, se determinan las reglas procesales y los costos del arbitraje, incluyendo los honorarios arbitrales y gastos administrativos, distribuidos segÃºn acuerdo de las partes.",
      icon: Calculator,
      color: "bg-purple-600",
      delay: 0.3,
    },
    {
      id: 4,
      title: "Etapa Postulatoria",
      description:
        "La parte actora presenta su escrito de demanda. La parte demandada formula su contestaciÃ³n y, en su caso, puede interponer reconvenciÃ³n.",
      icon: MessageSquare,
      color: "bg-pink-600",
      delay: 0.4,
    },
    {
      id: 5,
      title: "Audiencias",
      description:
        "Se celebran audiencias para fomentar la conciliaciÃ³n, sustentar hechos, presentar pruebas y formular alegatos orales ante el tribunal arbitral.",
      icon: Volume2,
      color: "bg-red-600",
      delay: 0.5,
    },
    {
      id: 6,
      title: "Fin del Arbitraje",
      description:
        "El tribunal dicta un laudo final, el cual es vinculante, inapelable y ejecutable con los efectos de una sentencia judicial firme.",
      icon: CheckCircle,
      color: "bg-green-600",
      delay: 0.6,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/professional-legal-office-arbitration-center.webp')`,
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
              Proceso Arbitral <br />
            </h1>
            <div className="w-24 h-1  mx-auto mb-8 bg-white" />
            <p className="text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed">
              MCH ABOGADOS - ResoluciÃ³n especializada de controversias a travÃ©s
              de arbitraje, brindando un servicio integral y confidencial en
              procesos arbitrales de alta complejidad.
            </p>
          </motion.div>
        </div>
      </section>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Process Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {processSteps.map((step) => {
            const Icon = step.icon;
            const isHovered = hoveredStep === step.id;

            return (
              <motion.div
                key={step.id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
              >
                <Card
                  className="group relative overflow-hidden border-2 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 cursor-pointer h-full"
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <CardContent className="p-8">
                    {/* Step Number & Icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className={`relative w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center`}
                        animate={{
                          scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-2xl font-bold text-white">
                          {step.id}
                        </span>
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-white/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                      <motion.div
                        animate={{
                          scale: isHovered ? 1.1 : 1,
                          color: isHovered
                            ? "hsl(var(--accent))"
                            : "hsl(var(--muted-foreground))",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="h-8 w-8" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <motion.h3
                      className="text-xl font-bold mb-4 text-foreground"
                      animate={{
                        color: isHovered
                          ? "hsl(var(--accent))"
                          : "hsl(var(--foreground))",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.title}
                    </motion.h3>
                    <p className="text-muted-foreground leading-relaxed text-pretty">
                      {step.description}
                    </p>

                    {/* Hover Arrow */}
                    <motion.div
                      className="mt-6 flex items-center text-accent"
                      initial={{ x: 0, opacity: 0 }}
                      animate={{
                        x: isHovered ? 8 : 0,
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-sm font-medium mr-2">
                        Ver detalles
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>

                    {/* Background Pattern */}
                    <motion.div
                      className="absolute top-0 right-0 w-32 h-32 opacity-5"
                      animate={{ opacity: isHovered ? 0.1 : 0.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-full h-full" />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Process Flow Visualization */}
        <motion.div
          className="relative"
          variants={flowVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4 text-foreground uppercase">
              Flujo del Proceso
            </h3>
            <p className="text-muted-foreground">
              Seguimiento visual de las etapas del arbitraje
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1 + index * 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-white font-bold cursor-pointer`}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.id}
                </motion.div>
                {index < processSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 1.2 + index * 0.1,
                      duration: 0.3,
                    }}
                  >
                    <ArrowRight className="h-6 w-6 text-muted-foreground mx-2" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
