import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

const documents = [
  { title: "Licencia de funcionamiento", href: "/LicenciaFuncionamiento.pdf" },
  { title: "Resolución administrativa", href: "/ResolucionAdministrativa.pdf" },
];

export function LicenciaFuncionamiento() {
  return (
    <>
      <section aria-labelledby="institutional-documents-title" className="bg-[#f3f5f8] pb-20 lg:pb-24">
        <div className="home-shell">
          <div className="mb-7 border-t border-[#dce2ea] pt-10">
            <h2 id="institutional-documents-title" className="text-[1.7rem] font-medium leading-tight tracking-[-0.025em] text-[#14243e]">Documentación institucional</h2>
            <p className="mt-3 text-sm leading-6 text-[#727e8d]">Consulte los documentos de funcionamiento del centro.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {documents.map((document) => (
              <a key={document.href} href={document.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-xl border border-[#e0e6ed] bg-white p-5 transition-colors hover:border-[#c9ac77] sm:gap-5 sm:p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f6f1e7] text-[#a48041]">
                  <FileText className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block text-[0.94rem] font-semibold leading-6 text-[#253b56]">{document.title}</span>
                  <span className="mt-1 block text-xs text-[#87919d]">Consultar PDF</span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-[#a48041] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="home-contact-title" className="bg-white py-20 lg:py-24">
        <div className="home-shell">
          <div className="grid gap-10 overflow-hidden rounded-[1.25rem] bg-[#112943] p-7 text-white sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:p-14">
            <div className="max-w-xl">
              <p className="home-kicker text-[#ddc18a]">Conversemos</p>
              <h2 id="home-contact-title" className="home-title mt-4 text-white">Estamos para atender su consulta.</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-white/65">
                Reciba información sobre los servicios y los canales de atención del centro.
              </p>
              <Link href="/Contacto" className="home-button mt-7 bg-[#c9a45c] text-[#112943] hover:bg-[#dfc283]">
                Contactar al centro <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex flex-col justify-center gap-7 border-t border-white/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <div>
                <p className="mb-2 text-xs text-white/50">Teléfono de atención</p>
                <a href="tel:+51976936575" className="text-[1.7rem] font-medium tracking-[-0.02em] text-white transition-colors hover:text-[#ddc18a]">+51 976 936 575</a>
              </div>
              <div>
                <p className="mb-2 text-xs text-white/50">Correo electrónico</p>
                <a href="mailto:mchabogados@legalmch.com" className="break-words text-[0.92rem] text-white/85 underline-offset-4 hover:text-[#ddc18a] hover:underline">mchabogados@legalmch.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LicenciaFuncionamiento;
