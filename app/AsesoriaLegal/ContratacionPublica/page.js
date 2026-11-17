"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  FileText,
  Clock,
  Shield,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function ArbitrajeContratacionPublicaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0b1a33]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/professional-legal-office-arbitration-center.webp')`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,20,38,0.92)_0%,rgba(11,32,62,0.78)_38%,rgba(20,50,90,0.42)_70%,rgba(20,50,90,0.22)_100%)]" />
        <div aria-hidden="true" className="absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#c9a45c]/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-32 text-center sm:px-6 lg:px-8 lg:pb-20 lg:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#c9a45c]/40 bg-[#c9a45c]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f3e3bb] backdrop-blur-md">
              Arbitraje especializado
            </span>
            <h1 className="mx-auto mt-5 max-w-4xl font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl">
              Arbitraje en contratación pública
            </h1>
            <div className="mx-auto mb-8 mt-6 h-[3px] w-24 bg-[#c9a45c]" />
            <p className="mx-auto max-w-4xl text-lg leading-relaxed text-white/75 md:text-xl">
              Resolución especializada de controversias en procesos de
              contratación estatal, garantizando transparencia y eficiencia en
              la administración pública.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="max-w-4xl mx-auto text-center">
              <p className="home-kicker">Contratación con el Estado</p>
              <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-[#14243e] md:text-5xl">
                Arbitraje en contratación pública
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-7 text-[#5b6a7f]">
                Mecanismo especializado para resolver controversias entre
                entidades públicas y contratistas, con rigor técnico y
                transparencia.
              </p>
            </div>
            <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 lg:p-12">
              <span aria-hidden="true" className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]" />
                <p className="text-lg leading-relaxed text-[#5b6a7f] mb-6">
                  El arbitraje en contratación pública es un mecanismo
                  especializado para resolver controversias que surgen en los
                  procesos de contratación del Estado. Este procedimiento
                  permite una resolución más ágil y técnica de los conflictos
                  entre entidades públicas y contratistas.
                </p>
                <p className="text-lg leading-relaxed text-[#5b6a7f]">
                  Nuestro centro cuenta con árbitros especializados en derecho
                  administrativo y contratación estatal, garantizando decisiones
                  fundamentadas en la normativa vigente y las mejores prácticas
                  del sector público.
                </p>
            </div>
          </motion.section>

          {/* Expertise Areas */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="mb-12 text-center">
              <p className="home-kicker">Nuestros servicios</p>
              <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-[#14243e] md:text-4xl">
                Áreas de especialización
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-7 text-[#5b6a7f]">
                Controversias en obras, servicios y cumplimiento de contratos
                con el Estado, con árbitros expertos en contratación pública.
              </p>
              <div className="mx-auto mt-6 h-[3px] w-24 bg-[#c9a45c]" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Building2,
                  title: "Obras Públicas",
                  description:
                    "Controversias en contratos de construcción, infraestructura y proyectos de inversión pública.",
                },
                {
                  icon: FileText,
                  title: "Servicios Públicos",
                  description:
                    "Disputas en contratos de prestación de servicios, consultoría y asesoría al Estado.",
                },
                {
                  icon: Clock,
                  title: "Procesos Ágiles",
                  description:
                    "Resolución eficiente que respeta los tiempos de la administración pública.",
                },
                {
                  icon: Shield,
                  title: "Cumplimiento Legal",
                  description:
                    "Estricto apego a la normativa de contratación pública y transparencia.",
                },
              ].map((area, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]"
                >
                  <span aria-hidden="true" className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]" />
                  <CardContent className="p-0">
                    <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30 transition-transform duration-300 group-hover:scale-105">
                      <area.icon className="h-7 w-7" strokeWidth={1.4} />
                    </span>
                    <span className="mx-auto mt-5 inline-flex items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.63rem] font-semibold uppercase tracking-[0.14em] text-[#7a5f2a]">
                      Contratación pública
                    </span>
                    <h4 className="mt-4 font-[family-name:var(--font-playfair)] text-xl font-medium leading-snug text-[#14243e]">
                      {area.title}
                    </h4>
                    <p className="mt-3 text-[0.95rem] leading-7 text-[#5b6a7f]">
                      {area.description}
                    </p>
                    <span className="mt-6 block border-t border-[#eef1f5] pt-6">
                      <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#14243e] text-[#e2c488] transition-all duration-300 group-hover:bg-[#c9a45c] group-hover:text-[#0b1a33]">
                        <area.icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Benefits Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="relative overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 lg:p-12">
              <span aria-hidden="true" className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]" />
              <div className="mb-12 text-center">
                <p className="home-kicker">Por qué elegirnos</p>
                <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-[#14243e] md:text-4xl">
                  Ventajas del arbitraje público
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-7 text-[#5b6a7f]">
                  Un procedimiento técnico, ágil y transparente para entidades
                  públicas y contratistas.
                </p>
                <div className="mx-auto mt-6 h-[3px] w-24 bg-[#c9a45c]" />
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="rounded-3xl border border-[#e5e8ed] bg-white p-8">
                  <h4 className="font-[family-name:var(--font-playfair)] text-2xl font-medium mb-6 text-[#14243e]">
                    Para Entidades Públicas
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-[#c9a45c] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-[#5b6a7f]">
                        Resolución técnica especializada en contratación estatal
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-[#c9a45c] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-[#5b6a7f]">
                        Reducción de tiempos procesales comparado con la vía
                        judicial
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-[#c9a45c] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-[#5b6a7f]">
                        Confidencialidad en asuntos sensibles de la
                        administración
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-3xl border border-[#e5e8ed] bg-white p-8">
                  <h4 className="font-[family-name:var(--font-playfair)] text-2xl font-medium mb-6 text-[#14243e]">
                    Para Contratistas
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-[#c9a45c] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-[#5b6a7f]">
                        Acceso a árbitros con experiencia en sector público
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-[#c9a45c] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-[#5b6a7f]">
                        Proceso imparcial y transparente
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-[#c9a45c] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-[#5b6a7f]">
                        Ejecución efectiva de laudos arbitrales
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#0b1a33] p-8 lg:p-12">
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c9a45c]/20 blur-3xl" />
              <span aria-hidden="true" className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]" />
              <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e2c488]">
                    Asesoría legal
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium leading-tight text-white md:text-4xl">
                    ¿Tiene una controversia con el Estado?
                  </h3>
                  <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-white/75">
                    Nuestro equipo especializado en contratación pública le
                    orienta sobre el procedimiento arbitral aplicable a su caso.
                  </p>
                  <a
                    href="/Contacto"
                    className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-6 text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
                  >
                    <Phone className="h-4 w-4" />
                    Solicitar asesoría
                  </a>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#c9a45c] text-[#0b1a33]">
                      <Phone className="h-5 w-5" />
                    </span>
                    <p className="text-sm leading-6 text-white/75">Atención especializada en arbitraje público</p>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#c9a45c] text-[#0b1a33]">
                      <Mail className="h-5 w-5" />
                    </span>
                    <p className="text-sm leading-6 text-white/75">Consultas sobre contratos con el Estado</p>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#c9a45c] text-[#0b1a33]">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <p className="text-sm leading-6 text-white/75">Centro de arbitraje — sede principal</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
