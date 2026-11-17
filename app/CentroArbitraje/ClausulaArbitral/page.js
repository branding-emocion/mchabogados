"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Quote } from "lucide-react";
import Link from "next/link";

export default function ClausulaArbitralPage() {
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
              Centro de arbitraje · Modelo oficial
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              Cláusula arbitral
            </h1>
            <div className="mt-6 h-[3px] w-24 rounded-full bg-[#c9a45c]" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Incorpore en sus contratos nuestra cláusula modelo y asegure que
              cualquier controversia se resuelva mediante arbitraje organizado
              por nuestro centro.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 lg:mb-12"
          >
            <p className="home-kicker">Texto recomendado</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl lg:text-[2.75rem]">
              Cláusula arbitral modelo
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Copie este texto en sus contratos para someter sus controversias
              al arbitraje administrado por nuestro centro, con laudo
              inapelable y definitivo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 shadow-[0_18px_48px_-28px_rgba(14,31,58,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)] sm:p-10"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[#f6f1e3] blur-2xl"
            />
            <div className="relative flex items-start justify-between gap-4">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30">
                <FileText className="h-7 w-7" strokeWidth={1.4} aria-hidden="true" />
              </span>
              <span className="inline-flex items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.63rem] font-semibold uppercase tracking-[0.14em] text-[#7a5f2a]">
                Modelo oficial
              </span>
            </div>
            <div className="relative mt-7 flex gap-4">
              <Quote
                className="h-8 w-8 shrink-0 rotate-180 text-[#c9a45c]"
                aria-hidden="true"
              />
              <p className="font-[family-name:var(--font-playfair)] text-xl italic leading-9 text-[#14243e] sm:text-2xl sm:leading-10">
                &quot;Las partes acuerdan que todo litigio y controversia
                resultante de este contrato o relativo a éste, se resolverá
                mediante el arbitraje organizado y administrado por MCH ABOGADOS
                S.A.C. con numero de RUC: 20613091158, de conformidad con sus
                reglamentos y directivas vigentes, a los cuales las partes se
                someten libremente, señalando que el laudo que se emita en el
                proceso será inapelable y definitivo.&quot;
              </p>
            </div>
            <div className="relative mt-8 flex items-center gap-3 border-t border-[#eef1f5] pt-6">
              <span
                className="h-px flex-1 bg-gradient-to-r from-[#c9a45c]/50 to-transparent"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* CTA */}
          <section className="relative mt-12 overflow-hidden rounded-3xl bg-[#0b1a33] px-6 py-12 sm:px-10 lg:px-14">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#c9a45c]/20 blur-3xl"
            />
            <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c9a45c]">
                  Centro de arbitraje
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl">
                  ¿Dudas sobre la cláusula arbitral?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                  Nuestro equipo lo asesora en la redacción e incorporación de
                  la cláusula en sus contratos.
                </p>
              </div>
              <Link
                href="/Contacto"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-8 font-sans text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f]"
              >
                Solicitar asesoría
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
