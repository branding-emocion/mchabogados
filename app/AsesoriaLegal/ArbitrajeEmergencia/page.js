"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const caracteristicas = [
  {
    n: "01",
    badge: "Celeridad",
    title: "Plazos Acelerados",
    desc: "Procedimiento expedito diseñado para situaciones críticas.",
    Icon: Clock,
  },
  {
    n: "02",
    badge: "Protección",
    title: "Medidas Cautelares",
    desc: "Protección inmediata de derechos y activos mientras se constituye el tribunal arbitral principal.",
    Icon: Shield,
  },
  {
    n: "03",
    badge: "Especialización",
    title: "Árbitro de Emergencia",
    desc: "Designación inmediata de árbitro especializado con amplia experiencia en procedimientos urgentes.",
    Icon: Zap,
  },
];

const situacionesContractuales = [
  "Suspensión de ejecución de garantías bancarias",
  "Paralización de obras o servicios",
  "Protección de información confidencial",
];

const medidasPatrimoniales = [
  "Embargo preventivo de activos",
  "Administración judicial de empresas",
  "Prohibición de enajenar bienes",
];

const pasos = [
  {
    n: "01",
    title: "Solicitud de Emergencia",
    desc: "Presentación de solicitud fundamentada con evidencia de urgencia y riesgo inminente.",
  },
  {
    n: "02",
    title: "Designación del Árbitro",
    desc: "Nombramiento inmediato de árbitro de emergencia especializado en 24 horas.",
  },
  {
    n: "03",
    title: "Audiencia",
    desc: "Audiencia virtual o presencial para escuchar a las partes.",
  },
  {
    n: "04",
    title: "Decisión y Ejecución",
    desc: "Laudo de emergencia ejecutable inmediatamente con medidas cautelares específicas.",
  },
];

const ventajas = [
  {
    title: "Rapidez",
    desc: "Decisión en días, no meses",
    Icon: Clock,
  },
  {
    title: "Protección",
    desc: "Salvaguarda inmediata de derechos",
    Icon: Shield,
  },
  {
    title: "Eficiencia",
    desc: "Procedimiento simplificado",
    Icon: Zap,
  },
  {
    title: "Ejecutabilidad",
    desc: "Cumplimiento inmediato",
    Icon: CheckCircle,
  },
];

export default function ArbitrajeEmergenciaPage() {
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
              Medidas urgentes · Arbitraje especializado
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              Arbitraje de Emergencia
            </h1>
            <div className="mt-6 h-[3px] w-24 rounded-full bg-[#c9a45c]" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Procedimiento acelerado para situaciones urgentes que requieren
              medidas cautelares inmediatas y resolución expedita.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/Contacto"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-8 font-sans text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
              >
                Solicitar atención urgente
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
            className="mx-auto mb-10 max-w-4xl text-center lg:mb-12"
          >
            <p className="home-kicker">Procedimiento especial</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl lg:text-[2.75rem]">
              Arbitraje de Emergencia
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Atención prioritaria para situaciones críticas, con plazos
              reducidos y procedimientos simplificados.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 transition-all duration-300 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)] lg:p-12"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
            />
            <p className="text-base leading-8 text-[#5b6a7f]">
              El arbitraje de emergencia es un procedimiento especial diseñado
              para atender situaciones urgentes que no pueden esperar la
              constitución formal del tribunal arbitral. Permite obtener medidas
              cautelares de manera inmediata para proteger los derechos de las
              partes.
            </p>
            <p className="mt-5 text-base leading-8 text-[#5b6a7f]">
              Este mecanismo garantiza que las situaciones críticas reciban
              atención prioritaria, con plazos reducidos y procedimientos
              simplificados, manteniendo siempre los principios de debido
              proceso y contradicción.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Características */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 lg:mb-12"
          >
            <p className="home-kicker">Respuesta inmediata</p>
            <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl">
              Características del Procedimiento de Emergencia
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Un mecanismo expedito para proteger sus derechos cuando cada hora
              cuenta.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3 md:auto-rows-fr">
            {caracteristicas.map((item, index) => {
              const Icon = item.Icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-4 right-6 select-none font-[family-name:var(--font-playfair)] text-[3.5rem] font-semibold leading-none text-[#14243e]/[0.05]"
                  >
                    {item.n}
                  </span>
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-7 w-7" strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#7a5f2a]">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="relative mt-7 font-[family-name:var(--font-playfair)] text-[1.5rem] font-medium leading-tight tracking-[-0.015em] text-[#14243e]">
                    {item.title}
                  </h4>
                  <p className="relative mt-3 flex-1 text-[0.95rem] leading-7 text-[#5b6a7f]">
                    {item.desc}
                  </p>
                  <span className="relative mt-7 inline-flex items-center gap-3 border-t border-[#eef1f5] pt-5 text-sm font-semibold text-[#14243e]">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#14243e] text-[#e2c488] transition-all duration-300 group-hover:bg-[#c9a45c] group-hover:text-[#0b1a33]">
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                    Protección inmediata
                  </span>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Casos típicos */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 transition-all duration-300 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)] lg:p-12"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
            />
            <div className="relative mb-10 text-center">
              <p className="home-kicker">Ámbitos de aplicación</p>
              <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl">
                Casos Típicos de Arbitraje de Emergencia
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
                Situaciones urgentes en las que el arbitraje de emergencia
                brinda protección oportuna.
              </p>
            </div>
            <div className="relative grid gap-10 md:grid-cols-2">
              <div>
                <h4 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-[#14243e]">
                  Situaciones Contractuales
                </h4>
                <div className="mt-3 h-[2px] w-12 rounded-full bg-[#c9a45c]" />
                <ul className="mt-6 space-y-4">
                  {situacionesContractuales.map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle
                        className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-[#a48041]"
                        aria-hidden="true"
                      />
                      <span className="leading-7 text-[#5b6a7f]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-[#14243e]">
                  Medidas Patrimoniales
                </h4>
                <div className="mt-3 h-[2px] w-12 rounded-full bg-[#c9a45c]" />
                <ul className="mt-6 space-y-4">
                  {medidasPatrimoniales.map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle
                        className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-[#a48041]"
                        aria-hidden="true"
                      />
                      <span className="leading-7 text-[#5b6a7f]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proceso */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 lg:mb-12"
          >
            <p className="home-kicker">Paso a paso</p>
            <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl">
              Proceso del Arbitraje de Emergencia
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Un procedimiento simplificado que prioriza la urgencia sin
              sacrificar el debido proceso.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 md:auto-rows-fr">
            {pasos.map((paso, index) => (
              <motion.article
                key={paso.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-4 right-6 select-none font-[family-name:var(--font-playfair)] text-[3.5rem] font-semibold leading-none text-[#14243e]/[0.05]"
                >
                  {paso.n}
                </span>
                <div className="relative flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#14243e] font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#e2c488] ring-1 ring-[#c9a45c]/30">
                    {index + 1}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#7a5f2a]">
                    Paso {paso.n}
                  </span>
                </div>
                <h4 className="relative mt-6 font-[family-name:var(--font-playfair)] text-[1.5rem] font-medium leading-tight text-[#14243e]">
                  {paso.title}
                </h4>
                <p className="relative mt-3 flex-1 text-[0.95rem] leading-7 text-[#5b6a7f]">
                  {paso.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#0b1a33] p-8 lg:p-12">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c9a45c]/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#c9a45c]/10 blur-3xl"
            />
            <div className="relative mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e2c68d]">
                Por qué elegirnos
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl">
                Ventajas del Arbitraje de Emergencia
              </h3>
              <div className="mx-auto mt-5 h-[3px] w-24 rounded-full bg-[#c9a45c]" />
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
                Protección oportuna y decisiones ejecutables cuando el tiempo
                es determinante.
              </p>
            </div>
            <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ventajas.map((item) => {
                const Icon = item.Icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#c9a45c]/50 hover:bg-white/[0.07]"
                  >
                    <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c9a45c] text-[#0b1a33] shadow-[0_12px_24px_-10px_rgba(201,164,92,0.6)]">
                      <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <h4 className="mt-5 font-[family-name:var(--font-playfair)] text-xl font-medium text-white">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-white/65">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#0b1a33] px-8 py-12 text-center lg:px-12 lg:py-16">
            <div
              aria-hidden="true"
              className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-[#c9a45c]/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#c9a45c]/15 blur-3xl"
            />
            <p className="relative text-xs font-semibold uppercase tracking-[0.14em] text-[#e2c68d]">
              Atención prioritaria
            </p>
            <h3 className="relative mx-auto mt-3 max-w-2xl font-[family-name:var(--font-playfair)] text-3xl font-medium leading-tight text-white sm:text-4xl">
              ¿Enfrenta una situación urgente?
            </h3>
            <div className="relative mx-auto mt-5 h-[3px] w-24 rounded-full bg-[#c9a45c]" />
            <p className="relative mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
              Solicite medidas cautelares inmediatas con nuestro procedimiento
              de arbitraje de emergencia.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/Contacto"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-8 font-sans text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
              >
                Contactar ahora
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/Cotizar"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-8 font-sans text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#0b1a33]"
              >
                Cotizar servicios
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
