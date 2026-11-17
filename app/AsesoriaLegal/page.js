"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Gavel, Shield, Users, Clock } from "lucide-react";
import Link from "next/link";

const legalServices = [
  {
    n: "01",
    badge: "Contratación con el Estado",
    title: "Arbitraje en Contratación Pública",
    description:
      "Resolución de controversias surgidas en procesos de contratación con el Estado mediante arbitraje especializado.",
    icon: Gavel,
    href: "/AsesoriaLegal/ContratacionPublica",
  },
  {
    n: "02",
    badge: "Medidas urgentes",
    title: "Arbitraje de Emergencia",
    description:
      "Mecanismo expedito para atender solicitudes urgentes y medidas cautelares antes de la constitución del tribunal arbitral.",
    icon: Shield,
    href: "/AsesoriaLegal/ArbitrajeEmergencia",
  },
  {
    n: "03",
    badge: "Empresas y particulares",
    title: "Arbitraje entre Privados",
    description:
      "Solución de disputas comerciales, civiles o contractuales entre particulares de forma confidencial y efectiva.",
    icon: Users,
    href: "/AsesoriaLegal/EntrePrivados",
  },
  {
    n: "04",
    badge: "Rápido y documental",
    title: "Arbitraje Express",
    description:
      "Procedimiento arbitral simplificado y rápido, diseñado para resolver controversias en plazos más cortos.",
    icon: Clock,
    href: "/AsesoriaLegal/ArbitrajeExpress",
  },
];

export default function AsesoriaLegal() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b1a33]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/professional-legal-office-arbitration-center.webp')` }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,20,38,0.93)_0%,rgba(11,32,62,0.82)_45%,rgba(20,50,90,0.45)_100%)]" />
        <div aria-hidden="true" className="absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-[#c9a45c]/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-20 lg:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-[#c9a45c]/40 bg-[#c9a45c]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f3e3bb]">
              Asesoría legal · Centro de arbitraje
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              Asesoría legal especializada
            </h1>
            <div className="mt-6 h-[3px] w-24 rounded-full bg-[#c9a45c]" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Más de una década de experiencia ofreciendo servicios legales
              integrales y soluciones personalizadas en diversas áreas del
              derecho.
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

      {/* Services Grid */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 lg:mb-12"
          >
            <p className="home-kicker">Nuestras especialidades</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl lg:text-[2.75rem]">
              Servicios arbitrales
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Contamos con especialistas en cada área del derecho para brindar
              la mejor asesoría legal adaptada a sus necesidades específicas.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 md:auto-rows-fr">
            {legalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Link
                  href={service.href}
                  className="group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]"
                >
                  <span aria-hidden="true" className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]" />
                  <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-6 select-none font-[family-name:var(--font-playfair)] text-[3.5rem] font-semibold leading-none text-[#14243e]/[0.05]">
                    {service.n}
                  </span>
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30 transition-transform duration-300 group-hover:scale-105">
                      <service.icon className="h-7 w-7" strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#7a5f2a]">
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="relative mt-7 font-[family-name:var(--font-playfair)] text-[1.7rem] font-medium leading-tight tracking-[-0.015em] text-[#14243e]">
                    {service.title}
                  </h3>
                  <p className="relative mt-3 flex-1 text-[0.95rem] leading-7 text-[#5b6a7f]">
                    {service.description}
                  </p>
                  <span className="relative mt-7 inline-flex items-center gap-3 border-t border-[#eef1f5] pt-5 text-sm font-semibold text-[#14243e]">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#14243e] text-[#e2c488] transition-all duration-300 group-hover:bg-[#c9a45c] group-hover:text-[#0b1a33]">
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                    Conocer más
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
