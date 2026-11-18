"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  FileText,
  LibraryBig,
  ReceiptText,
  ScrollText,
} from "lucide-react";
import Link from "next/link";

export default function NuestrosReglamentosPage() {
  const regulations = [
    {
      title: "Reglamento de Arbitraje",
      href: "/pdfs/Arbitral.pdf",
    },
    {
      title: "Reglamento interno del centro",
      href: "/pdfs/REGLAMENTOINTERNODELCENTRO.pdf",
    },

    { title: "Código de Ética", href: "/pdfs/Etica.pdf" },
    {
      title: "Reglamento de Arbitraje Express",
      href: "/pdfs/Express.pdf",
    },
    {
      title: "Reglamento de Arbitraje de Emergencia",
      href: "/pdfs/EMERGENCA2.pdf",
    },
  ];

  const directives = [
    {
      title: `Directiva N°001-${new Date().getFullYear()}`,
      description: "Regulación sobre la Nómina de Árbitros",
      href: "/pdfs/001.pdf",
    },
    {
      title: "Directiva N°002-2024",
      description: "Recusación de Árbitros",
      href: "/pdfs/002.pdf",
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
            backgroundImage: `url('/legal-regulations-documents-books.webp')`,
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
              <LibraryBig className="h-4 w-4" aria-hidden="true" />
              Biblioteca del centro
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              Nuestros reglamentos
            </h1>
            <div className="mt-6 h-[3px] w-24 rounded-full bg-[#c9a45c]" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Documentos normativos que rigen los procesos arbitrales en MCH
              Abogados, garantizando transparencia, eficiencia y cumplimiento
              de los más altos estándares legales.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/pdfs/Arbitral.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-8 font-sans text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Reglamento de arbitraje
              </a>
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

      {/* Reglamentos principales */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 lg:mb-12"
          >
            <p className="home-kicker">Marco normativo</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl lg:text-[2.75rem]">
              Reglamentos principales
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Consulte y descargue los reglamentos que rigen los procesos
              arbitrales del centro.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 md:auto-rows-fr"
          >
            {regulations.map((regulation, index) => (
              <motion.a
                key={index}
                href={regulation.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)] ${
                  index === 4 ? "md:col-span-2" : ""
                }`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-4 right-6 select-none font-[family-name:var(--font-playfair)] text-[3.5rem] font-semibold leading-none text-[#14243e]/[0.05]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative flex items-start justify-between gap-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30 transition-transform duration-300 group-hover:scale-105">
                    <ScrollText className="h-7 w-7" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#7a5f2a]">
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    PDF
                  </span>
                </div>
                <h3 className="relative mt-7 font-[family-name:var(--font-playfair)] text-[1.55rem] font-medium leading-snug tracking-[-0.015em] text-[#14243e]">
                  {regulation.title}
                </h3>
                <span className="relative mt-auto inline-flex items-center gap-3 pt-6 text-sm font-semibold text-[#14243e]">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#14243e] text-[#e2c488] transition-all duration-300 group-hover:bg-[#c9a45c] group-hover:text-[#0b1a33]">
                    <ArrowUpRight
                      className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  Consultar documento
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Directivas y tabla de pagos */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 lg:mb-12"
          >
            <p className="home-kicker">Directivas y aranceles</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl lg:text-[2.75rem]">
              Directivas y tabla de pagos
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Directivas complementarias y los costos de los servicios del
              Centro de Arbitraje según la cuantía controvertida.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
            {directives.map((directive, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30 transition-transform duration-300 group-hover:scale-105">
                    <FileText className="h-7 w-7" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#7a5f2a]">
                    Directiva · PDF
                  </span>
                </div>
                <h3 className="relative mt-6 font-[family-name:var(--font-playfair)] text-[1.45rem] font-medium leading-snug tracking-[-0.015em] text-[#14243e]">
                  {directive.title}
                </h3>
                <p className="relative mt-2 text-[0.95rem] leading-7 text-[#5b6a7f]">
                  {directive.description}
                </p>
                <a
                  href={directive.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-xl bg-[#14243e] px-6 font-sans text-sm font-semibold text-white transition-all hover:bg-[#c9a45c] hover:text-[#0b1a33]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Descargar
                </a>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
              />
              <div className="relative flex items-start justify-between gap-4">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30 transition-transform duration-300 group-hover:scale-105">
                  <ReceiptText className="h-7 w-7" strokeWidth={1.4} aria-hidden="true" />
                </span>
                <span className="inline-flex items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#7a5f2a]">
                  Aranceles · PDF
                </span>
              </div>
              <h3 className="relative mt-6 font-[family-name:var(--font-playfair)] text-[1.45rem] font-medium leading-snug tracking-[-0.015em] text-[#14243e]">
                Tabla de pagos y aranceles
              </h3>
              <p className="relative mt-2 text-[0.95rem] leading-7 text-[#5b6a7f]">
                En este documento nuestros usuarios podrán encontrar los
                costos de los servicios brindados por el Centro de Arbitraje,
                categorizados según la cuantía de la materia controvertida
                para efectos de tener mayor información antes de iniciar los
                arbitrajes en nuestra institución.
              </p>
              <a
                href="/pdfs/Tabla.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-xl bg-[#14243e] px-6 font-sans text-sm font-semibold text-white transition-all hover:bg-[#c9a45c] hover:text-[#0b1a33]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Descargar
              </a>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="relative mt-12 overflow-hidden rounded-3xl bg-[#0b1a33] px-8 py-12 sm:px-12 lg:px-16">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#c9a45c]/20 blur-3xl"
            />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f3e3bb]">
                  ¿Necesita ayuda?
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium leading-tight text-white sm:text-4xl">
                  Estime los costos de su arbitraje en menos de un minuto.
                </h2>
                <p className="mt-3 text-base leading-7 text-white/75">
                  Use nuestra calculadora de costos o converse con nuestro
                  equipo para iniciar su procedimiento.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-4 sm:flex-row lg:flex-col">
                <Link
                  href="/Cotizar"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-8 font-sans text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
                >
                  Ir a la calculadora
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
