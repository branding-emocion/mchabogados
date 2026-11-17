import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  servicios: [
    { name: "Contratación pública", href: "/AsesoriaLegal/ContratacionPublica" },
    { name: "Arbitraje de emergencia", href: "/AsesoriaLegal/ArbitrajeEmergencia" },
    { name: "Arbitraje entre privados", href: "/AsesoriaLegal/EntrePrivados" },
    { name: "Arbitraje express", href: "/AsesoriaLegal/ArbitrajeExpress" },
  ],
  centro: [
    { name: "Nuestro equipo", href: "/NuestroEquipo" },
    { name: "Reglamentos", href: "/CentroArbitraje/NuestrosReglamentos" },
    { name: "Banco de laudos", href: "/Laudos/Emitidos" },
    { name: "Contacto", href: "/Contacto" },
  ],
};

function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href} className="text-sm leading-6 text-white/65 underline-offset-4 transition-colors hover:text-[#e2c68d] hover:underline">
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0a1529] text-white">
      <div className="home-shell py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-x-7 gap-y-10 border-b border-white/15 pb-12 lg:grid-cols-[1.15fr_1fr_0.8fr_1.05fr] lg:gap-x-9">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" aria-label="MCH Abogados, inicio" className="inline-flex">
              <Image src="/LogoBlanco.png" alt="MCH Abogados" width={281} height={87} className="h-auto w-56 object-contain" />
            </Link>
            <p className="mt-5 max-w-[16rem] text-sm leading-7 text-white/55">
              Centro de Arbitraje y Asesoría Legal.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-[#d7b878]">Servicios</h2>
            <ul className="mt-5 space-y-3">
              {footerLinks.servicios.map((item) => <FooterLink key={item.href} href={item.href}>{item.name}</FooterLink>)}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-[#d7b878]">El centro</h2>
            <ul className="mt-5 space-y-3">
              {footerLinks.centro.map((item) => <FooterLink key={item.href} href={item.href}>{item.name}</FooterLink>)}
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-[#d7b878]">Atención y consultas</h2>
            <a href="tel:+51976936575" className="mt-5 inline-block text-xl font-medium tracking-[-0.01em] text-white transition-colors hover:text-[#e2c68d]">
              +51 976 936 575
            </a>
            <a href="mailto:mchabogados@legalmch.com" className="mt-3 block break-words text-sm leading-6 text-white/65 underline-offset-4 hover:text-[#e2c68d] hover:underline">
              mchabogados@legalmch.com
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[0.7rem] leading-6 text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MCH Abogados. Todos los derechos reservados.</p>
          <Link href="/Admin" className="text-white/60 underline-offset-4 hover:text-[#e2c68d] hover:underline">Mesa de partes ARGUS</Link>
        </div>
      </div>
    </footer>
  );
}
