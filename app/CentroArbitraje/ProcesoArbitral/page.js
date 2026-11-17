"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";

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
  ArrowUpRight,
  ScrollText,
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
    scale: 0.95,
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
        "El procedimiento se inicia con la presentación de la solicitud de arbitraje, lo que da inicio al cómputo de plazos procesales. Posteriormente, se notifica formalmente a la parte demandada.",
      icon: FileText,
      delay: 0.1,
    },
    {
      id: 2,
      title: "Constitución del Tribunal Arbitral",
      description:
        "Se designa un árbitro único o un tribunal colegiado de tres árbitros, conforme al acuerdo arbitral o reglamento aplicable. Los árbitros aceptan su cargo declarando independencia e imparcialidad.",
      icon: Users,
      delay: 0.2,
    },
    {
      id: 3,
      title: "Fijación de Reglas y Costos",
      description:
        "En una audiencia preliminar, se determinan las reglas procesales y los costos del arbitraje, incluyendo los honorarios arbitrales y gastos administrativos, distribuidos según acuerdo de las partes.",
      icon: Calculator,
      delay: 0.3,
    },
    {
      id: 4,
      title: "Etapa Postulatoria",
      description:
        "La parte actora presenta su escrito de demanda. La parte demandada formula su contestación y, en su caso, puede interponer reconvención.",
      icon: MessageSquare,
      delay: 0.4,
    },
    {
      id: 5,
      title: "Audiencias",
      description:
        "Se celebran audiencias para fomentar la conciliación, sustentar hechos, presentar pruebas y formular alegatos orales ante el tribunal arbitral.",
      icon: Volume2,
      delay: 0.5,
    },
    {
      id: 6,
      title: "Fin del Arbitraje",
      description:
        "El tribunal dicta un laudo final, el cual es vinculante, inapelable y ejecutable con los efectos de una sentencia judicial firme.",
      icon: CheckCircle,
      delay: 0.6,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b1a33]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/professional-legal-office-arbitration-center.webp')`,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,20,38,0.93)_0%,rgba(11,32,62,0.82)_45%,rgba(20,50,90,0.45)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-[#c9a45c]/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-20 lg:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-[#c9a45c]/40 bg-[#c9a45c]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f3e3bb]">
              <ScrollText className="h-4 w-4" aria-hidden="true" />
              Centro de arbitraje
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              Proceso arbitral
            </h1>
            <div className="mt-6 h-[3px] w-24 rounded-full bg-[#c9a45c]" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              MCH Abogados — Resolución especializada de controversias a
              través de arbitraje, brindando un servicio integral y
              confidencial en procesos arbitrales de alta complejidad.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/Cotizar"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-8 font-sans text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
              >
                Cotizar mi arbitraje
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/CentroArbitraje/NuestrosReglamentos"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-8 font-sans text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#0b1a33]"
              >
                Ver reglamentos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div ref={ref} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10 lg:mb-12"
        >
          <p className="home-kicker">Etapas del procedimiento</p>
          <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl lg:text-[2.75rem]">
            Seis pasos hacia el laudo
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
            Un procedimiento ordenado y predecible, desde la solicitud de
            arbitraje hasta el laudo final con efectos de sentencia judicial
            firme.
          </p>
        </motion.div>

        {/* Process Cards Grid */}
        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:auto-rows-fr lg:grid-cols-3"
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
                className="h-full"
              >
                <article
                  className="group relative flex h-full min-h-[340px] cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]"
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-4 right-6 select-none font-[family-name:var(--font-playfair)] text-[3.5rem] font-semibold leading-none text-[#14243e]/[0.05]"
                  >
                    {String(step.id).padStart(2, "0")}
                  </span>

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-7 w-7" strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#7a5f2a]">
                      Paso {step.id} de 6
                    </span>
                  </div>

                  <h3 className="relative mt-7 font-[family-name:var(--font-playfair)] text-[1.55rem] font-medium leading-snug tracking-[-0.015em] text-[#14243e]">
                    {step.title}
                  </h3>
                  <p className="relative mt-3 flex-1 text-[0.95rem] leading-7 text-[#5b6a7f]">
                    {step.description}
                  </p>

                  <motion.span
                    className="relative mt-7 inline-flex items-center gap-3 border-t border-[#eef1f5] pt-5 text-sm font-semibold text-[#14243e]"
                    initial={{ x: 0, opacity: 0.65 }}
                    animate={{
                      x: isHovered ? 6 : 0,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#14243e] text-[#e2c488] transition-all duration-300 group-hover:bg-[#c9a45c] group-hover:text-[#0b1a33]">
                      <ArrowUpRight
                        className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                    Etapa {step.id}
                  </motion.span>

                  <motion.div
                    className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 text-[#14243e]/[0.05]"
                    animate={{ opacity: isHovered ? 0.9 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="h-full w-full" strokeWidth={0.7} />
                  </motion.div>
                </article>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Process Flow Visualization */}
        <motion.div
          className="relative mt-16 rounded-3xl border border-[#e5e8ed] bg-[#faf7ef] p-8 sm:p-10 lg:p-12"
          variants={flowVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
          />
          <div className="mb-10 text-center">
            <p className="home-kicker">Seguimiento visual</p>
            <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-medium tracking-[-0.015em] text-[#14243e] sm:text-3xl">
              Flujo del proceso
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Seguimiento visual de las etapas del arbitraje
            </p>
          </div>

          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3">
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
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#14243e] font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#e2c488] ring-1 ring-[#c9a45c]/40"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  title={step.title}
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
                    <ArrowRight className="mx-2 h-5 w-5 text-[#c9a45c]" aria-hidden="true" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="relative mt-12 overflow-hidden rounded-3xl bg-[#0b1a33] px-8 py-12 sm:px-12 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#c9a45c]/20 blur-3xl"
          />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f3e3bb]">
                Inicie su arbitraje
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium leading-tight text-white sm:text-4xl">
                ¿Listo para iniciar su proceso arbitral?
              </h2>
              <p className="mt-3 text-base leading-7 text-white/75">
                Cotice los costos de su arbitraje o revise los reglamentos
                que rigen cada etapa del procedimiento.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-4 sm:flex-row lg:flex-col">
              <Link
                href="/Cotizar"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-8 font-sans text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
              >
                Cotizar arbitraje
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/Contacto"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-8 font-sans text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#0b1a33]"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
