"use client";

import { motion } from "framer-motion";
import { ArrowRight, Landmark } from "lucide-react";
import Link from "next/link";

export default function PresentacionPage() {
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
              <Landmark className="h-4 w-4" aria-hidden="true" />
              Centro de arbitraje
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              Órgano de Dirección
            </h1>
            <div className="mt-6 h-[3px] w-24 rounded-full bg-[#c9a45c]" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              MCH Abogados – Confidencialidad y excelencia en arbitraje.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/CentroArbitraje/NominaDeArbitros"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-8 font-sans text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
              >
                Conocer la nómina de árbitros
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

      {/* Dirección del centro */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 lg:mb-12"
          >
            <p className="home-kicker">Dirección del centro</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl lg:text-[2.75rem]">
              Liderazgo institucional
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              La conducción ejecutiva del Centro de Arbitraje, a cargo de
              garantizar la correcta implementación de sus estrategias y planes.
            </p>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group relative grid overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)] lg:grid-cols-2"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
            />
            <div className="relative flex items-center justify-center overflow-hidden bg-[#faf7ef] p-8 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#c9a45c]/15 blur-3xl"
              />
              <img
                src="/QuienesSomos1.jpg"
                alt="Directora del Centro de Arbitraje"
                loading="lazy"
                decoding="async"
                className="relative max-h-[420px] w-auto rounded-2xl object-cover shadow-[0_20px_50px_-20px_rgba(20,36,62,0.45)] ring-1 ring-[#e6dcc5]"
              />
            </div>
            <div className="relative flex flex-col justify-center p-8 lg:p-12">
              <span className="inline-flex w-fit items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.63rem] font-semibold uppercase tracking-[0.14em] text-[#7a5f2a]">
                Directora del Centro de Arbitraje
              </span>
              <h3 className="mt-5 font-[family-name:var(--font-playfair)] text-3xl font-medium leading-tight tracking-[-0.02em] text-[#14243e] sm:text-4xl">
                Patricia Judith Chumpitazi Paredes
              </h3>
              <div className="mt-5 h-[3px] w-16 rounded-full bg-[#c9a45c]" />
              <p className="mt-5 text-[0.95rem] leading-7 text-[#5b6a7f]">
                El cargo de Director(a) constituye la denominación del Órgano
                Directivo de la institución. Este cargo representa la máxima
                autoridad ejecutiva, encargada de conducir las estrategias y
                planes institucionales, asegurando su adecuada implementación
                y cumplimiento.
              </p>
            </div>
          </motion.article>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#0b1a33] px-8 py-12 sm:px-12 lg:px-16">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#c9a45c]/20 blur-3xl"
            />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f3e3bb]">
                  Centro de arbitraje
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium leading-tight text-white sm:text-4xl">
                  Resuelva sus controversias con un equipo de excelencia.
                </h2>
                <p className="mt-3 text-base leading-7 text-white/75">
                  Conozca el proceso arbitral y los reglamentos que garantizan
                  un procedimiento transparente y eficiente.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-4 sm:flex-row lg:flex-col">
                <Link
                  href="/CentroArbitraje/ProcesoArbitral"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-8 font-sans text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
                >
                  Ver proceso arbitral
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
      </section>
    </main>
  );
}
