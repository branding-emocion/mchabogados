import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calculator, ShieldCheck, Clock3 } from "lucide-react";

export default function ResourcesSection() {
  return (
    <section aria-labelledby="costs-title" className="relative overflow-hidden bg-[#0b1a33]">
      {/* fondo full */}
      <Image
        src="/Costos.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        quality={90}
        className="object-cover object-center"
        priority={false}
      />
      {/* vidrio azul */}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,20,38,0.88)_0%,rgba(11,32,62,0.72)_38%,rgba(20,50,90,0.38)_70%,rgba(20,50,90,0.18)_100%)]" />
      {/* brillo dorado sutil */}
      <div aria-hidden="true" className="absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#c9a45c]/20 blur-3xl" />

      <div className="home-shell relative py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* izquierda: texto */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#c9a45c]/40 bg-[#c9a45c]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f3e3bb] backdrop-blur-md">
              <Calculator className="h-4 w-4" aria-hidden="true" />
              Calculadora de costos
            </div>
            <h2 id="costs-title" className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.4rem]">
              Conozca los costos de su arbitraje.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Estime los gastos administrativos y honorarios arbitrales a partir de los datos de su procedimiento. Transparente, rápido y sin compromiso.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/60">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#e2c488]" /> Sin registro</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#e2c488]" /> Resultado inmediato</span>
            </div>
          </div>

          {/* derecha: vidrio + botón */}
          <div className="w-full max-w-sm shrink-0 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-9">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c9a45c] text-[#0b1a33] shadow-lg">
              <Calculator className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-5 font-[family-name:var(--font-playfair)] text-xl leading-snug text-white">Calcule en menos de 1 minuto</p>
            <p className="mt-2 text-sm leading-6 text-white/65">Ingrese la cuantía y el tipo de proceso para ver el estimado.</p>
            <Link href="/Cotizar" className="group mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-6 font-sans text-sm font-bold text-[#0b1a33] transition-all hover:bg-[#e8cf8f] hover:shadow-[0_15px_40px_-12px_rgba(201,164,92,0.8)]">
              Ir a la calculadora
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <p className="mt-4 text-center text-xs text-white/50">Gastos + honorarios arbitrales</p>
          </div>
        </div>
      </div>
    </section>
  );
}
