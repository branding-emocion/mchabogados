"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, FileText, BadgeCheck, LibraryBig } from "lucide-react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/firebase/firebaseReader";

export default function NormativaSection() {
  const [isos, setIsos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    let isActive = true;
    const loadISOs = async () => {
      setLoading(true);
      setHasError(false);
      try {
        // Home solo muestra 3: traer 6 como máximo (antes 100)
        const snapshot = await getDocs(query(collection(db, "isos"), limit(6)));
        if (isActive) {
          setIsos(snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          })));
        }
      } catch (error) {
        console.error("Error cargando isos:", error);
        if (isActive) setHasError(true);
      } finally {
        if (isActive) setLoading(false);
      }
    };
    loadISOs();
    return () => { isActive = false; };
  }, [requestCount]);

  return (
    <section id="normativas" aria-labelledby="standards-title" className="relative scroll-mt-20 overflow-hidden bg-white pb-20 pt-16 lg:scroll-mt-24 lg:pb-24 lg:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#f6f1e3] blur-3xl" />
      <div className="home-shell relative">
        <div className="mb-10 lg:mb-12">
          <p className="home-kicker inline-flex items-center gap-2">
            <LibraryBig className="h-4 w-4" aria-hidden="true" /> Biblioteca del centro
          </p>
          <h2 id="standards-title" className="home-title mt-3">Normativas ISO</h2>
          <p className="home-copy mt-4 max-w-2xl">
            Documentos de consulta a su alcance. Acceda a los estándares disponibles en nuestra biblioteca normativa.
          </p>
        </div>

        <div aria-busy={loading}>
          {loading ? (
            <div className="grid gap-5 md:grid-cols-3" role="status" aria-label="Cargando normativas">
              {[0, 1, 2].map((index) => (
                <div key={index} className="overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-7">
                  <div className="flex items-center justify-between">
                    <div className="h-14 w-14 animate-pulse rounded-2xl bg-[#eef1f5]" />
                    <div className="h-6 w-16 animate-pulse rounded-full bg-[#eef1f5]" />
                  </div>
                  <div className="mx-auto mt-6 h-36 w-full animate-pulse rounded-2xl bg-[#eef1f5]" />
                  <div className="mt-6 h-7 w-3/4 animate-pulse rounded-md bg-[#eef1f5]" />
                  <div className="mt-3 h-4 w-1/2 animate-pulse rounded-md bg-[#eef1f5]" />
                </div>
              ))}
            </div>
          ) : hasError ? (
            <div className="rounded-3xl border border-[#dce2e9] bg-white p-10 text-center" role="status">
              <p className="text-sm leading-6 text-[#606570]">No se pudieron cargar las normativas en este momento.</p>
              <button type="button" onClick={() => setRequestCount((count) => count + 1)} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#14243e] px-5 text-sm font-semibold text-white hover:bg-[#244467]">
                Volver a intentar
              </button>
            </div>
          ) : isos.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-[#c9a45c]/50 bg-[#faf7ef] p-10 text-center text-sm leading-6 text-[#7a5f2a]">
              Aún no se han publicado normativas ISO.
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-3 md:auto-rows-fr">
              {isos.map((iso, i) => {
                const Document = iso.pdfURL ? "a" : "article";
                return (
                  <Document
                    key={iso.id}
                    {...(iso.pdfURL ? { href: iso.pdfURL, target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]"
                  >
                    <span aria-hidden="true" className="absolute inset-x-7 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]" />
                    <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-6 font-[family-name:var(--font-playfair)] text-[3.5rem] font-semibold leading-none text-[#14243e]/[0.05] select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative flex items-center justify-between gap-3">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30 transition-transform duration-300 group-hover:scale-105">
                        <BadgeCheck className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#7a5f2a]">
                        <FileText className="h-3.5 w-3.5" aria-hidden="true" /> ISO · PDF
                      </span>
                    </div>

                    <div className="relative mt-6 flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-[#eef1f5] bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] p-6">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-60"
                        style={{
                          backgroundImage: "radial-gradient(rgba(20,36,62,0.08) 1px, transparent 1px)",
                          backgroundSize: "18px 18px",
                        }}
                      />
                      {iso.imagenURL ? (
                        <Image src={iso.imagenURL} alt="" width={200} height={140} sizes="200px" className="relative h-32 w-auto rounded-lg bg-white object-contain p-2 shadow-[0_12px_30px_-15px_rgba(20,36,62,0.4)] ring-1 ring-[#e5e8ed] transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <FileText className="relative h-10 w-10 text-[#9a7840]" aria-hidden="true" />
                      )}
                    </div>

                    <h3 className="relative mt-6 font-[family-name:var(--font-playfair)] text-[1.45rem] font-medium leading-snug tracking-[-0.015em] text-[#14243e] transition-colors group-hover:text-[#7a5f2a]">
                      {iso.nombre}
                    </h3>
                    <p className="relative mt-2 text-xs font-medium uppercase tracking-[0.12em] text-[#87919d]">Documento normativo</p>

                    <span className="relative mt-6 inline-flex items-center gap-3 border-t border-[#eef1f5] pt-5 text-sm font-semibold text-[#14243e]">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#14243e] text-[#e2c488] transition-all duration-300 group-hover:bg-[#c9a45c] group-hover:text-[#0b1a33]">
                        <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                      {iso.pdfURL ? "Consultar documento" : "Normativa ISO"}
                    </span>
                  </Document>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
