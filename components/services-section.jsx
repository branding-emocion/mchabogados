import Link from "next/link";
import { ArrowUpRight, BookOpen, Building2, Calculator, Clock3, Scale, UsersRound, Landmark } from "lucide-react";

const shortcuts = [
  { title: "Calcular costos", detail: "Gastos y honorarios arbitrales", href: "/Cotizar", icon: Calculator },
  { title: "Reglamentos", detail: "Documentos del centro", href: "/CentroArbitraje/NuestrosReglamentos", icon: BookOpen },
  { title: "Nómina de árbitros", detail: "Conozca a nuestros profesionales", href: "/CentroArbitraje/NominaDeArbitros", icon: UsersRound },
];

const services = [
  {
    n: "01",
    badge: "Contratación con el Estado",
    title: "Arbitraje en contratación pública",
    desc: "Controversias derivadas de contratos entre las entidades del Estado y sus contratistas.",
    href: "/AsesoriaLegal/ContratacionPublica",
    Icon: Landmark,
    BgIcon: Scale,
  },
  {
    n: "02",
    badge: "Empresas y particulares",
    title: "Arbitraje entre privados",
    desc: "Resolución de controversias civiles y comerciales entre empresas y particulares.",
    href: "/AsesoriaLegal/EntrePrivados",
    Icon: Building2,
    BgIcon: UsersRound,
  },
  {
    n: "03",
    badge: "Medidas urgentes",
    title: "Arbitraje de emergencia",
    desc: "Atención de solicitudes urgentes de medidas cautelares.",
    href: "/AsesoriaLegal/ArbitrajeEmergencia",
    Icon: Clock3,
    BgIcon: Clock3,
  },
  {
    n: "04",
    badge: "Rápido y documental",
    title: "Arbitraje express",
    desc: "Un procedimiento simplificado, con actuaciones concentradas y sustento documental.",
    href: "/AsesoriaLegal/ArbitrajeExpress",
    Icon: Scale,
    BgIcon: BookOpen,
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

export default function ServicesSection() {
  return (
    <section aria-labelledby="services-title" className="relative bg-white pb-20 lg:pb-28">
      <div className="home-shell">
        <nav aria-label="Accesos del centro" className="relative -top-10 z-10 grid grid-cols-3 overflow-hidden rounded-xl border border-[#e5e8ed] bg-white p-2 shadow-[0_18px_48px_-28px_rgba(14,31,58,0.35)] sm:-top-12 sm:p-3">
          {shortcuts.map((shortcut, index) => {
            const Icon = shortcut.icon;
            return (
              <Link key={shortcut.href} href={shortcut.href} className={"group flex flex-col items-center justify-center gap-2 rounded-md px-2 py-5 text-center transition-colors hover:bg-[#f6f4ef] sm:flex-row sm:justify-start sm:gap-4 sm:px-5 sm:py-6 sm:text-left " + (index > 0 ? "border-l border-[#e8ebef]" : "")}>
                <Icon className="h-6 w-6 shrink-0 text-[#aa843f] sm:h-7 sm:w-7" strokeWidth={1.5} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.73rem] font-semibold leading-5 text-[#14243e] sm:text-[0.94rem]">{shortcut.title}</span>
                  <span className="mt-1 hidden text-xs leading-5 text-[#727b89] lg:block">{shortcut.detail}</span>
                </span>
                <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-[#aa843f] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:block" aria-hidden="true" />
              </Link>
            );
          })}
        </nav>

        <div id="servicios" className="mb-10 mt-3 scroll-mt-28 sm:mt-5 lg:mb-12">
          <p className="home-kicker">Arbitraje especializado</p>
          <h2 id="services-title" className="home-title mt-3">Nuestros servicios</h2>
          <p className="home-copy mt-4 max-w-2xl">
            Procedimientos para resolver controversias entre entidades públicas,
            empresas y particulares. Encuentre la modalidad que necesita conocer.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:auto-rows-fr">
          {services.map((s) => {
            const Icon = s.Icon;
            const BgIcon = s.BgIcon;
            return (
              <Link
                key={s.n}
                href={s.href}
                className="group relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)] lg:min-h-[420px]"
              >
                {/* línea dorada superior */}
                <span aria-hidden="true" className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[#f6f1e3] blur-2xl" />
                <Dots />
                <BgIcon aria-hidden="true" className="pointer-events-none absolute -bottom-8 -right-8 h-52 w-52 text-[#14243e]/[0.05] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" strokeWidth={0.7} />
                <span aria-hidden="true" className="pointer-events-none absolute bottom-6 left-8 font-[family-name:var(--font-playfair)] text-[4.5rem] font-semibold leading-none text-[#14243e]/[0.05] select-none">{s.n}</span>

                <div className="relative flex items-start justify-between gap-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-7 w-7" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.63rem] font-semibold uppercase tracking-[0.14em] text-[#7a5f2a]">{s.badge}</span>
                </div>

                <h3 className="relative mt-7 font-[family-name:var(--font-playfair)] text-[1.9rem] font-medium leading-[1.15] tracking-[-0.02em] text-[#14243e] sm:text-[2.15rem]">{s.title}</h3>
                <p className="relative mt-3 max-w-md flex-1 text-[0.95rem] leading-7 text-[#5b6a7f]">{s.desc}</p>

                <span className="relative mt-8 inline-flex items-center gap-3 border-t border-[#eef1f5] pt-6 text-sm font-semibold text-[#14243e]">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#14243e] text-[#e2c488] transition-all duration-300 group-hover:bg-[#c9a45c] group-hover:text-[#0b1a33]">
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                  Conocer el servicio
                  <span className="h-px flex-1 bg-gradient-to-r from-[#c9a45c]/50 to-transparent" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-9 text-center">
          <Link href="/AsesoriaLegal" className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-[#18304c] underline-offset-4 hover:underline">
            Explorar todos los servicios
            <ArrowUpRight className="h-4 w-4 text-[#a48041]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
