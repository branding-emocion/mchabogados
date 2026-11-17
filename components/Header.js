"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const menuGroups = [
  {
    label: "Servicios",
    links: [
      {
        name: "Arbitraje en contratación pública",
        href: "/AsesoriaLegal/ContratacionPublica",
      },
      {
        name: "Arbitraje de emergencia",
        href: "/AsesoriaLegal/ArbitrajeEmergencia",
      },
      {
        name: "Arbitraje entre privados",
        href: "/AsesoriaLegal/EntrePrivados",
      },
      { name: "Arbitraje express", href: "/AsesoriaLegal/ArbitrajeExpress" },
    ],
  },
  {
    label: "Centro de arbitraje",
    links: [
      { name: "Órgano de dirección", href: "/CentroArbitraje/Presentacion" },
      { name: "Proceso arbitral", href: "/CentroArbitraje/ProcesoArbitral" },
      {
        name: "Nuestros reglamentos",
        href: "/CentroArbitraje/NuestrosReglamentos",
      },
      {
        name: "Nómina de árbitros",
        href: "/CentroArbitraje/NominaDeArbitros",
      },
      { name: "Cláusula arbitral", href: "/CentroArbitraje/ClausulaArbitral" },
    ],
  },
  {
    label: "Laudos",
    links: [
      { name: "Banco de laudos", href: "/Laudos/Emitidos" },
      { name: "Banco de decisiones", href: "/Laudos/Decisiones" },
    ],
  },
];

function MobileGroup({ group, closeMenu }) {
  return (
    <details name="mobile-navigation-group" className="group border-b border-current/10">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md px-4 py-4 font-[family-name:var(--font-playfair)] text-[1.05rem] font-medium leading-snug tracking-[0.01em] transition-colors hover:bg-current/5 [&::-webkit-details-marker]:hidden">
        {group.label}
        <ChevronDown
          className="h-4 w-4 shrink-0 text-[#c9a45c] transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="space-y-1 pb-3 pl-4 pr-2">
        {group.links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className="block rounded-md px-4 py-2.5 font-sans text-[0.9rem] leading-relaxed tracking-[0.01em] opacity-80 transition-opacity hover:opacity-100"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </details>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null);
  const headerRef = useRef(null);
  const mobileButtonRef = useRef(null);
  const desktopButtonRefs = useRef([]);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setOpenDesktopMenu(null);
        setIsMobileMenuOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        mobileButtonRef.current?.focus();
      } else if (openDesktopMenu !== null) {
        setOpenDesktopMenu(null);
        desktopButtonRefs.current[openDesktopMenu]?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileMenuOpen, openDesktopMenu]);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setOpenDesktopMenu(null);
  };
  const shellTone = isScrolled
    ? "bg-[#fbfaf7]/[0.97] text-[#17213a] shadow-[0_12px_35px_-24px_rgba(10,19,48,0.5)] backdrop-blur-xl"
    : "bg-transparent text-white";
  const panelTone = isScrolled
    ? "border-[#c9a45c]/25 bg-[#fffdf8] text-[#17213a]"
    : "border-white/15 bg-[#0b1731] text-white";
  const navItem =
    "group relative inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap px-3 font-[family-name:var(--font-playfair)] text-[0.98rem] font-medium tracking-[0.01em] transition-colors after:absolute after:inset-x-3 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-[#c9a45c] after:transition-transform hover:after:scale-x-100 focus-visible:after:scale-x-100";

  return (
    <motion.header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={"transition-[background-color,box-shadow] duration-300 " + shellTone}>
        <div className="mx-auto max-w-[1440px] px-4 sm:px-7 xl:px-10">
          <div
            className={
              "flex items-center justify-between gap-2 border-b transition-[min-height,border-color] duration-300 xl:gap-6 " +
              (isScrolled
                ? "min-h-[72px] border-transparent sm:min-h-[80px] xl:min-h-[84px]"
                : "min-h-[82px] border-white/20 sm:min-h-[92px] xl:min-h-[104px]")
            }
          >
            <Link
              href="/"
              aria-label="MCH Abogados, inicio"
              onClick={closeMenus}
              className="flex shrink-0 items-center"
            >
              <Image
                src={isScrolled ? "/logo.png" : "/LogoBlanco.png"}
                alt="MCH Abogados"
                width={281}
                height={87}
                priority
                className="h-auto w-36 object-contain min-[380px]:w-40 sm:w-52 xl:w-60"
              />
            </Link>

            <nav aria-label="Navegación principal" className="hidden items-center xl:flex">
              {menuGroups.map((group, index) => {
                const isOpen = openDesktopMenu === index;
                const menuId = `desktop-navigation-${index}`;
                return (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => setOpenDesktopMenu(index)}
                    onMouseLeave={() => setOpenDesktopMenu(null)}
                  >
                    <button
                      ref={(element) => { desktopButtonRefs.current[index] = element; }}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={isOpen ? menuId : undefined}
                      aria-haspopup="true"
                      onClick={() => setOpenDesktopMenu(isOpen ? null : index)}
                      onFocus={() => setOpenDesktopMenu(index)}
                      className={navItem + (isOpen ? " after:scale-x-100" : "")}
                    >
                      {group.label}
                      <ChevronDown
                        className={"h-3.5 w-3.5 text-[#c9a45c] transition-transform " + (isOpen ? "rotate-180" : "")}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={menuId}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.16 }}
                          className="absolute left-0 top-full z-50 w-72 pt-3"
                          onMouseEnter={() => setOpenDesktopMenu(index)}
                        >
                          <div className="overflow-hidden rounded-lg border border-[#d8c7a3]/50 bg-[#fffdf8] p-2 text-[#17213a] shadow-[0_24px_60px_-24px_rgba(10,19,48,0.48)]">
                          <p className="border-b border-[#e9e1d3] px-3 pb-3 pt-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8a6732]">
                            {group.label}
                          </p>
                          <div className="pt-1">
                            {group.links.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMenus}
                                className="block rounded-md px-3 py-3 font-sans text-[0.9rem] font-medium leading-relaxed tracking-[0.005em] text-[#414a5c] transition-colors hover:bg-[#f5f0e7] hover:text-[#17213a]"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <Link href="/NuestroEquipo" onClick={closeMenus} className={navItem}>
                Nuestro equipo
              </Link>
              <Link href="/Contacto" onClick={closeMenus} className={navItem}>
                Contacto
              </Link>
            </nav>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Link
                href="/Cotizar"
                onClick={closeMenus}
                className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-[#c9a45c] px-3.5 font-sans text-[0.8rem] font-semibold tracking-[0.015em] text-[#09142f] transition-colors hover:bg-[#dfc283] sm:min-h-11 sm:px-5 sm:text-sm"
              >
                Cotizar
                <ArrowUpRight className="hidden h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" aria-hidden="true" />
              </Link>
              <button
                ref={mobileButtonRef}
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-current/30 transition-colors hover:bg-current/10 sm:h-11 sm:w-11 xl:hidden"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMobileMenuOpen}
                aria-controls={isMobileMenuOpen ? "mobile-navigation" : undefined}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isMobileMenuOpen && (
              <motion.nav
                id="mobile-navigation"
                aria-label="Navegación móvil"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className={"mb-3 mt-2 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-xl border p-2 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.65)] xl:hidden " + panelTone}
              >
                <div className="px-4 pb-2 pt-3 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#c9a45c]">
                  Navegación
                </div>
                {menuGroups.map((group) => (
                  <MobileGroup key={group.label} group={group} closeMenu={closeMenus} />
                ))}
                <Link
                  href="/NuestroEquipo"
                  onClick={closeMenus}
                  className="block rounded-md px-4 py-4 font-[family-name:var(--font-playfair)] text-[1.05rem] font-medium leading-snug tracking-[0.01em]"
                >
                  Nuestro equipo
                </Link>
                <Link
                  href="/Contacto"
                  onClick={closeMenus}
                  className="block rounded-md px-4 py-4 font-[family-name:var(--font-playfair)] text-[1.05rem] font-medium leading-snug tracking-[0.01em]"
                >
                  Contacto
                </Link>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
