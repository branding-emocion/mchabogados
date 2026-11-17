"use client";

import { motion } from "framer-motion";
import {
  Scale,
  Users,
  Clock,
  Shield,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const disputeTypes = [
  {
    Icon: Users,
    title: "Contratos Comerciales",
    description:
      "Incumplimientos, interpretación de cláusulas, y disputas de ejecución contractual.",
  },
  {
    Icon: Scale,
    title: "Sociedades y Socios",
    description:
      "Conflictos societarios, exclusión de socios, y valoración de participaciones.",
  },
  {
    Icon: Shield,
    title: "Propiedad Intelectual",
    description:
      "Licencias, transferencias tecnológicas, y uso no autorizado de derechos.",
  },
  {
    Icon: CheckCircle,
    title: "Construcción e Inmobiliario",
    description:
      "Contratos de obra, defectos constructivos, y compraventa inmobiliaria.",
  },
  {
    Icon: Clock,
    title: "Servicios Profesionales",
    description:
      "Honorarios, responsabilidad profesional, y contratos de prestación.",
  },
  {
    Icon: Users,
    title: "Distribución y Franquicias",
    description:
      "Terminación de contratos, exclusividad territorial, y obligaciones comerciales.",
  },
];

const advantagesLeft = [
  {
    title: "Confidencialidad Total",
    description:
      "Las actuaciones y el laudo son completamente confidenciales, protegiendo la reputación y secretos comerciales de las partes.",
  },
  {
    title: "Flexibilidad Procesal",
    description:
      "Las partes pueden adaptar el procedimiento a sus necesidades específicas, incluyendo plazos, idioma y sede del arbitraje.",
  },
  {
    title: "Especialización Técnica",
    description:
      "Selección de árbitros con expertise específico en la materia controvertida, garantizando decisiones técnicamente fundamentadas.",
  },
];

const advantagesRight = [
  {
    title: "Rapidez y Eficiencia",
    description:
      "Resolución en plazos significativamente menores que los procesos judiciales ordinarios, con procedimientos streamlined.",
  },
  {
    title: "Ejecutabilidad Internacional",
    description:
      "Los laudos arbitrales son reconocidos y ejecutables en más de 160 países bajo la Convención de Nueva York.",
  },
  {
    title: "Control de Costos",
    description:
      "Previsibilidad en los costos del procedimiento y posibilidad de establecer límites presupuestarios desde el inicio.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Solicitud de Arbitraje",
    description:
      "Presentación de la demanda arbitral con exposición de hechos y pretensiones.",
  },
  {
    step: "02",
    title: "Constitución del Tribunal",
    description:
      "Designación de árbitros según el acuerdo de las partes o reglamento aplicable.",
  },
  {
    step: "03",
    title: "Procedimiento",
    description:
      "Intercambio de escritos, práctica de pruebas y audiencias según cronograma.",
  },
  {
    step: "04",
    title: "Laudo Final",
    description:
      "Emisión de decisión definitiva y vinculante para ambas partes.",
  },
];

export default function ArbitrajeEntrePrivadosPage() {
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
              Empresas y particulares
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              Arbitraje entre privados
            </h1>
            <div className="mt-6 h-[3px] w-24 rounded-full bg-[#c9a45c]" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Resolución eficiente de controversias comerciales y civiles entre
              particulares, con total confidencialidad y flexibilidad procesal.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/Contacto"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-8 font-sans text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
              >
                Consulta gratuita
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/Cotizar"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-8 font-sans text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#0b1a33]"
              >
                Cotizar servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="home-kicker">Arbitraje especializado</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl lg:text-[2.75rem]">
              Arbitraje entre privados
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Una alternativa eficaz al sistema judicial tradicional para
              resolver disputas comerciales, contractuales y civiles.
            </p>
            <div className="relative mt-8 overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 lg:p-12">
              <span
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
              />
              <p className="text-base leading-8 text-[#5b6a7f]">
                El arbitraje entre privados ofrece una alternativa eficaz al
                sistema judicial tradicional para resolver disputas
                comerciales, contractuales y civiles. Las partes pueden elegir
                árbitros especializados en la materia específica del conflicto,
                garantizando una resolución técnica y fundamentada.
              </p>
              <p className="mt-4 text-base leading-8 text-[#5b6a7f]">
                Este procedimiento se caracteriza por su flexibilidad,
                confidencialidad y celeridad, permitiendo a las empresas y
                particulares resolver sus controversias de manera privada y
                eficiente, manteniendo sus relaciones comerciales.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Types of Disputes */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 lg:mb-12"
          >
            <p className="home-kicker">Áreas de controversia</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl lg:text-[2.75rem]">
              Tipos de controversias
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Especialistas en la resolución de diversos tipos de disputas
              entre particulares
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:auto-rows-fr">
            {disputeTypes.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30 transition-transform duration-300 group-hover:scale-105">
                      <item.Icon
                        className="h-7 w-7"
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#7a5f2a]">
                      Entre privados
                    </span>
                  </div>
                  <h3 className="relative mt-7 font-[family-name:var(--font-playfair)] text-[1.5rem] font-medium leading-tight tracking-[-0.015em] text-[#14243e]">
                    {item.title}
                  </h3>
                  <p className="relative mt-3 flex-1 text-[0.95rem] leading-7 text-[#5b6a7f]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 lg:mb-12"
          >
            <p className="home-kicker">Por qué elegirnos</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl lg:text-[2.75rem]">
              Ventajas del arbitraje privado
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Un procedimiento confidencial, flexible y eficiente para proteger
              sus intereses comerciales.
            </p>
          </motion.div>

          <div className="relative overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 lg:p-12">
            <span
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
            />
            <div className="relative grid gap-10 md:grid-cols-2 md:gap-12">
              <div className="space-y-8">
                {advantagesLeft.map((advantage, index) => (
                  <motion.div
                    key={advantage.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#c9a45c]"
                    />
                    <div>
                      <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-[#14243e]">
                        {advantage.title}
                      </h3>
                      <p className="mt-2 leading-7 text-[#5b6a7f]">
                        {advantage.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="space-y-8">
                {advantagesRight.map((advantage, index) => (
                  <motion.div
                    key={advantage.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#c9a45c]"
                    />
                    <div>
                      <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-[#14243e]">
                        {advantage.title}
                      </h3>
                      <p className="mt-2 leading-7 text-[#5b6a7f]">
                        {advantage.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 lg:mb-12"
          >
            <p className="home-kicker">Cómo funciona</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl lg:text-[2.75rem]">
              Proceso arbitral
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Un procedimiento estructurado y eficiente diseñado para resolver
              controversias de manera definitiva
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 md:auto-rows-fr">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                  />
                  <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#14243e] font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30 transition-transform duration-300 group-hover:scale-105">
                    {step.step}
                  </div>
                  <h3 className="relative mt-6 font-[family-name:var(--font-playfair)] text-xl font-medium leading-snug text-[#14243e]">
                    {step.title}
                  </h3>
                  <p className="relative mt-3 flex-1 leading-7 text-[#5b6a7f]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contacto */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#0b1a33] p-8 sm:p-10 lg:p-14">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,20,38,0.95)_0%,rgba(11,32,62,0.85)_50%,rgba(20,50,90,0.55)_100%)]"
            />
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#c9a45c]/20 blur-3xl"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-[#c9a45c]/40 bg-[#c9a45c]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f3e3bb]">
                  Consulta confidencial
                </p>
                <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-3xl font-medium leading-tight tracking-[-0.02em] text-white sm:text-4xl">
                  Resuelva su controversia entre privados
                </h2>
                <div className="mt-6 h-[3px] w-24 rounded-full bg-[#c9a45c]" />
                <p className="mt-6 max-w-xl leading-8 text-white/75">
                  Contáctenos para evaluar su caso con total confidencialidad
                  y definir la estrategia arbitral más eficiente para sus
                  intereses.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/Contacto"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-8 font-sans text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Solicitar consulta
                  </Link>
                  <Link
                    href="/Contacto"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-8 font-sans text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#0b1a33]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Escríbanos
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:p-8">
                <ul className="space-y-5 text-[0.95rem] leading-7 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#c9a45c]/15 text-[#e2c488] ring-1 ring-[#c9a45c]/30">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      Llámenos para una primera orientación sobre su
                      controversia comercial o civil.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#c9a45c]/15 text-[#e2c488] ring-1 ring-[#c9a45c]/30">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      Envíenos los antecedentes de su caso por correo
                      electrónico.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#c9a45c]/15 text-[#e2c488] ring-1 ring-[#c9a45c]/30">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      Atención presencial y virtual, con sede y plazos a su
                      medida.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
