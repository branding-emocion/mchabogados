"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Aparecer } from "@/components/animaciones";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  CheckCircle,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  Scale,
  Shield,
  Users,
} from "lucide-react";

const features = [
  {
    badge: "Plazo garantizado",
    title: "Máximo 15 días",
    desc: "Resolución garantizada en un plazo máximo de 15 días hábiles",
    Icon: Clock,
  },
  {
    badge: "Trámite ágil",
    title: "Proceso Simplificado",
    desc: "Solo demanda, contestación y reconvención. Sin complicaciones innecesarias",
    Icon: Scale,
  },
  {
    badge: "Sustento documental",
    title: "Documentación Mínima",
    desc: "Pruebas presentadas junto con los escritos. Proceso basado en documentos",
    Icon: FileText,
  },
  {
    badge: "Respaldo institucional",
    title: "Árbitros Especializados",
    desc: "Profesionales designados por el Consejo Superior de Arbitraje",
    Icon: Users,
  },
];

const steps = [
  {
    n: "01",
    title: "Solicitud de Arbitraje",
    desc: "Presenta tu solicitud con los documentos necesarios. Tenemos 5 días hábiles para notificar a la otra parte.",
    detail: "Notificación en 5 días hábiles",
    Icon: FileText,
  },
  {
    n: "02",
    title: "Designación de Árbitro",
    desc: "El Consejo Superior designa un árbitro especializado. Instalación del tribunal y fijación de reglas procesales.",
    detail: "Árbitro especializado",
    Icon: Shield,
  },
  {
    n: "03",
    title: "Resolución",
    desc: "Presentación de escritos, actuación de pruebas y laudo final en máximo 15 días hábiles.",
    detail: "Laudo en 15 días hábiles",
    Icon: CheckCircle,
  },
];

function Dots() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        backgroundImage: "radial-gradient(rgba(20,36,62,0.08) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        maskImage: "linear-gradient(180deg, black 0%, transparent 55%)",
        WebkitMaskImage: "linear-gradient(180deg, black 0%, transparent 55%)",
      }}
    />
  );
}

export default function ArbitrajeExpressPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section aria-label="Arbitraje express" className="relative isolate overflow-hidden bg-[#0b1a33] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/professional-legal-office-arbitration-center.webp')`,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,26,51,0.96)_0%,rgba(11,26,51,0.84)_42%,rgba(11,26,51,0.45)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,26,51,0.9)_0%,transparent_50%,rgba(11,26,51,0.25)_100%)]" />
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#c9a45c]/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#c9a45c]/15 blur-3xl" />
        </div>

        <div className="home-shell relative pb-24 pt-36 lg:pb-28 lg:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#e2c68d]">
              <Shield className="h-4 w-4" aria-hidden="true" /> Rápido y documental
            </p>
            <h1 className="home-hero-title mt-6 text-white">
              Arbitraje <span className="font-normal italic text-[#ddc18a]">express</span>
            </h1>
            <div aria-hidden="true" className="mt-7 h-[3px] w-24 rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]" />
            <p className="mt-7 max-w-xl text-base leading-8 text-white/80 sm:text-lg sm:leading-8">
              Solución eficiente y profesional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-white">
        {/* Features Section */}
        <section aria-labelledby="express-features-title" className="relative overflow-hidden pb-20 pt-16 lg:pb-24 lg:pt-20">
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#f6f1e3] blur-3xl" />
          <div className="home-shell relative">
            <Aparecer className="mb-10 text-left lg:mb-12">
              <p className="home-kicker">Procedimiento simplificado</p>
              <h2 id="express-features-title" className="home-title mt-3">¿Por qué elegir Arbitraje Express?</h2>
              <p className="home-copy mt-4 max-w-2xl">
                Un proceso optimizado que combina rapidez, eficiencia y
                garantías legales
              </p>
            </Aparecer>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => {
                const Icon = feature.Icon;
                return (
                  <Aparecer key={feature.title} retraso={index * 0.08} className="h-full">
                    <Card className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-7 text-left shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]">
                      <span aria-hidden="true" className="absolute inset-x-7 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]" />
                      <Dots />
                      <CardHeader className="relative p-0">
                        <div className="flex items-start justify-between gap-3">
                          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30 transition-transform duration-300 group-hover:scale-105">
                            <Icon className="h-7 w-7" strokeWidth={1.4} aria-hidden="true" />
                          </span>
                          <span className="inline-flex items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#7a5f2a]">
                            {feature.badge}
                          </span>
                        </div>
                        <CardTitle className="mt-7 font-[family-name:var(--font-playfair)] text-[1.45rem] font-medium leading-snug tracking-[-0.015em] text-[#14243e]">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative flex flex-1 flex-col p-0">
                        <p className="mt-3 flex-1 text-[0.95rem] leading-7 text-[#5b6a7f]">
                          {feature.desc}
                        </p>
                        <a
                          href="#proceso-express"
                          className="relative mt-6 inline-flex items-center gap-3 border-t border-[#eef1f5] pt-5 text-sm font-semibold text-[#14243e]"
                        >
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#14243e] text-[#e2c488] transition-all duration-300 group-hover:bg-[#c9a45c] group-hover:text-[#0b1a33]">
                            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                          </span>
                          Ver procedimiento
                        </a>
                      </CardContent>
                    </Card>
                  </Aparecer>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="proceso-express" aria-labelledby="express-process-title" className="relative scroll-mt-24 overflow-hidden bg-white pb-20 lg:pb-24">
          <div className="home-shell relative">
            <Aparecer className="mb-10 text-left lg:mb-12">
              <p className="home-kicker">Paso a paso</p>
              <h2 id="express-process-title" className="home-title mt-3">Proceso Simple y Eficiente</h2>
              <p className="home-copy mt-4 max-w-2xl">
                Tres pasos para resolver tu disputa comercial
              </p>
            </Aparecer>

            <div className="grid gap-5 lg:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = step.Icon;
                return (
                  <Aparecer key={step.n} retraso={index * 0.1} className="h-full">
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]">
                      <span aria-hidden="true" className="absolute inset-x-7 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]" />
                      <Dots />
                      <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-6 select-none font-[family-name:var(--font-playfair)] text-[3.5rem] font-semibold leading-none text-[#14243e]/[0.05]">
                        {step.n}
                      </span>
                      <div className="relative flex items-center justify-between gap-3">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30 transition-transform duration-300 group-hover:scale-105">
                          <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <span className="inline-flex items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#7a5f2a]">
                          Paso {step.n}
                        </span>
                      </div>
                      <h3 className="relative mt-6 font-[family-name:var(--font-playfair)] text-[1.45rem] font-medium leading-snug tracking-[-0.015em] text-[#14243e]">
                        {step.title}
                      </h3>
                      <p className="relative mt-3 flex-1 text-[0.95rem] leading-7 text-[#5b6a7f]">
                        {step.desc}
                      </p>
                      <p className="relative mt-6 inline-flex items-center gap-3 border-t border-[#eef1f5] pt-5 text-sm font-semibold text-[#14243e]">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#14243e] text-[#e2c488] transition-all duration-300 group-hover:bg-[#c9a45c] group-hover:text-[#0b1a33]">
                          <CheckCircle className="h-5 w-5" aria-hidden="true" />
                        </span>
                        {step.detail}
                      </p>
                    </article>
                  </Aparecer>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section aria-labelledby="express-contact-title" className="bg-white pb-20 lg:pb-24">
          <div className="home-shell">
            <Aparecer>
              <div className="grid gap-10 overflow-hidden rounded-[1.25rem] bg-[#112943] p-7 text-white sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:p-14">
                <div className="max-w-xl">
                  <p className="home-kicker text-[#ddc18a]">Conversemos</p>
                  <h2 id="express-contact-title" className="home-title mt-4 text-white">
                    Inicie su arbitraje express.
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-7 text-white/65">
                    Cuéntenos su controversia y le orientamos sobre los pasos para iniciar el procedimiento.
                  </p>
                  <Button asChild className="home-button mt-7 bg-[#c9a45c] text-[#112943] hover:bg-[#dfc283]">
                    <Link href="/Contacto">
                      Contactar al centro <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-col justify-center gap-7 border-t border-white/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                  <div>
                    <p className="mb-2 flex items-center gap-2 text-xs text-white/50">
                      <Phone className="h-3.5 w-3.5 text-[#ddc18a]" aria-hidden="true" /> Teléfono de atención
                    </p>
                    <a href="tel:+51976936575" className="text-[1.7rem] font-medium tracking-[-0.02em] text-white transition-colors hover:text-[#ddc18a]">
                      +51 976 936 575
                    </a>
                  </div>
                  <div>
                    <p className="mb-2 flex items-center gap-2 text-xs text-white/50">
                      <Mail className="h-3.5 w-3.5 text-[#ddc18a]" aria-hidden="true" /> Correo electrónico
                    </p>
                    <a href="mailto:mchabogados@legalmch.com" className="break-words text-[0.92rem] text-white/85 underline-offset-4 hover:text-[#ddc18a] hover:underline">
                      mchabogados@legalmch.com
                    </a>
                  </div>
                  <div>
                    <p className="mb-2 flex items-center gap-2 text-xs text-white/50">
                      <MapPin className="h-3.5 w-3.5 text-[#ddc18a]" aria-hidden="true" /> Centro de arbitraje
                    </p>
                    <p className="text-[0.92rem] leading-6 text-white/85">
                      MCH Abogados · Atención a nivel nacional
                    </p>
                  </div>
                </div>
              </div>
            </Aparecer>
          </div>
        </section>
      </main>
    </div>
  );
}
