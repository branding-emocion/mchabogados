"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useBanners } from "@/hooks/useBanners";

const fallbackSlides = [
  {
    idDoc: "default-banner",
    title: "Enfoque dedicado y eficaz",
    description: "Centro especializado en Arbitraje y Asesoría Legal.",
    mediaType: "fallback",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { banners } = useBanners(6, true);
  const prefersReducedMotion = useReducedMotion();
  const slides = useMemo(() => {
    const activeBanners = (banners || []).filter((banner) => banner.isActive);
    return activeBanners.length > 0 ? activeBanners : fallbackSlides;
  }, [banners]);

  useEffect(() => {
    if (slides.length < 2 || prefersReducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setCurrentSlide((index) => (index + 1) % slides.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [slides.length, prefersReducedMotion]);

  useEffect(() => {
    setCurrentSlide((index) => (index < slides.length ? index : 0));
  }, [slides.length]);

  const slide = slides[currentSlide] || slides[0];
  const backgroundImage = slide.mediaType === "image" && slide.imageUrl
    ? slide.imageUrl
    : "/slider/Banner.avif";
  const primaryHref = slide.linkUrl || "/Contacto";
  const externalLink = /^https?:\/\//i.test(primaryHref);
  const primaryLabel = slide.linkUrl
    ? slide.mediaType === "video" ? "Ver video" : "Ver más"
    : "Solicitar consulta";
  const title = slide.title || "MCH Abogados";
  const displayTitle = title === title.toLocaleUpperCase("es") && title.length > 12
    ? (title.charAt(0) + title.slice(1).toLocaleLowerCase("es"))
      .replace(/\bmch\b/gi, "MCH")
      .replace(/\bargus\b/gi, "ARGUS")
      .replace(/\biso\b/gi, "ISO")
    : title;
  const titleWords = displayTitle.split(/\s+/);
  const highlightedWord = titleWords.length > 3 ? titleWords.pop() : null;

  return (
    <section aria-label="Presentación de MCH Abogados" className="relative isolate overflow-hidden bg-[#0c2038] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          quality={75}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,28,49,0.95)_0%,rgba(8,28,49,0.83)_38%,rgba(8,28,49,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,28,49,0.88)_0%,transparent_45%,rgba(8,28,49,0.2)_100%)]" />
      </div>

      <div className="home-shell relative flex min-h-[800px] flex-col pb-28 pt-36 sm:min-h-[820px] lg:min-h-[min(900px,100svh)] lg:pb-32 lg:pt-40">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="relative z-10 max-w-2xl">
            <p className="home-kicker mb-6 max-w-xs text-[#e2c68d] sm:max-w-none">
              Centro de Arbitraje · MCH Abogados
            </p>

            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={slide.idDoc || currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
              >
                <h1 className="home-hero-title max-w-[10ch] text-white sm:max-w-[11.5ch]">
                  {highlightedWord ? <>{titleWords.join(" ")} <span className="font-normal italic text-[#ddc18a]">{highlightedWord}</span></> : displayTitle}
                </h1>
                {slide.subtitle && (
                  <p className="mt-6 max-w-[18rem] text-xl font-medium leading-snug text-[#e2c68d] sm:max-w-lg sm:text-2xl">
                    {slide.subtitle}
                  </p>
                )}
                {slide.description && (
                  <p className="mt-6 max-w-[17rem] text-base leading-7 text-white/80 sm:max-w-md sm:text-lg sm:leading-8">
                    {slide.description}
                  </p>
                )}
                <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
                  <Link href={primaryHref} target={externalLink ? "_blank" : undefined} rel={externalLink ? "noopener noreferrer" : undefined} className="home-button bg-[#c9a45c] text-[#09142f] hover:bg-[#dfc283]">
                    {primaryLabel}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href="/Admin" className="home-button border border-white/45 bg-transparent text-white hover:border-[#e2c68d] hover:bg-white/5">
                    Mesa de partes ARGUS
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <Link href="#servicios" className="mt-6 inline-flex min-h-10 items-center gap-3 text-xs font-medium text-white/65 transition-colors hover:text-[#e2c68d]">
                  Conozca nuestros servicios
                  <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </motion.div>
            </AnimatePresence>

            {slides.length > 1 && (
              <div className="mt-8 flex items-center gap-3" aria-label="Elegir banner">
                {slides.map((item, index) => (
                  <button key={item.idDoc || index} type="button" onClick={() => setCurrentSlide(index)} aria-label={`Mostrar banner ${index + 1}`} aria-pressed={index === currentSlide} className="flex h-9 items-center py-3">
                    <span className={"h-px transition-all " + (index === currentSlide ? "w-9 bg-[#e2c68d]" : "w-5 bg-white/40")} />
                  </button>
                ))}
                <span className="ml-1 text-[0.7rem] tabular-nums tracking-[0.12em] text-white/60">
                  {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
              </div>
            )}
          </div>

          <aside className="pointer-events-none absolute -right-12 top-60 flex h-32 w-32 items-center justify-center min-[380px]:right-2 sm:right-4 sm:top-56 sm:h-60 sm:w-60 lg:static lg:h-auto lg:w-full" role="img" aria-label="Emblema de MCH Abogados">
            <div className="relative aspect-square w-full max-w-[380px] opacity-55 sm:opacity-75 lg:opacity-100">
              <div className="absolute inset-0 rounded-full border border-[#e2c68d]/35 bg-white/[0.06] backdrop-blur-[2px]" />
              <motion.div
                aria-hidden="true"
                className="absolute inset-[12%] rounded-full border border-white/15"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                <span className="absolute right-0 top-1/2 h-3.5 w-3.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e2c68d]" />
                <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white" />
                <span className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e2c68d]" />
              </motion.div>
              <Image src="/LogoSolo.png" alt="" width={180} height={180} className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 object-contain" />
            </div>
          </aside>
        </div>

      </div>
    </section>
  );
}
