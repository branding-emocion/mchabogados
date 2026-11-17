"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Scale, Award, Users } from "lucide-react";

export default function NuestroEquipo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch("/api/consejo-miembros");
      const data = await response.json();

      if (data.success) {
        // Filter only active members
        const activeMembers = data.members.filter((member) => member.active);
        setTeamMembers(activeMembers);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  const values = [
    {
      icon: Scale,
      title: "Asesoramiento Integral",
      description:
        "Ofrecemos un servicio completo que abarca todas las áreas del derecho, garantizando una solución integral para cada caso.",
    },
    {
      icon: Award,
      title: "Seriedad y Profesionalismo",
      description:
        "Nuestro equipo mantiene los más altos estándares éticos y profesionales en cada consulta y representación legal.",
    },
    {
      icon: Users,
      title: "Tenacidad y Transparencia",
      description:
        "Trabajamos con determinación y mantenemos una comunicación clara y honesta con nuestros clientes en todo momento.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b1a33]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/QuienesSomos.jpg')` }}
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
              Nuestro equipo · Centro de arbitraje
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              Nuestro Equipo
            </h1>
            <div className="mt-6 h-[3px] w-24 rounded-full bg-[#c9a45c]" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Profesionales altamente calificados con décadas de experiencia
              combinada, comprometidos con brindar el mejor servicio legal a
              nuestros clientes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="bg-white py-16 lg:py-20" ref={ref}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <p className="home-kicker">Consejo superior</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl lg:text-[2.75rem]">
              Consejo superior de arbitraje
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Profesionales altamente calificados que garantizan la
              imparcialidad y excelencia en cada procedimiento arbitral.
            </p>
          </motion.div>

          {loading ? (
            <div className="py-12 text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#c9a45c]"></div>
              <p className="mt-4 text-[#5b6a7f]">Cargando miembros...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="py-12 text-center text-[#5b6a7f]">
              No hay miembros disponibles en este momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 items-stretch justify-center gap-5 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <motion.a
                  key={member.id}
                  id={member.id}
                  className="group"
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  href={member.cv || "#"}
                  target={member.cv ? "_blank" : undefined}
                  rel={member.cv ? "noopener noreferrer" : undefined}
                >
                  <div className="relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                    />
                    <div className="relative">
                      {member.image && (
                        <Image
                          src={member.image}
                          alt={member.name || "Miembro del equipo"}
                          width={160}
                          height={160}
                          sizes="160px"
                          className="h-36 w-36 rounded-full object-cover ring-2 ring-[#c9a45c] ring-offset-4 ring-offset-white transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <h3 className="mt-6 font-[family-name:var(--font-playfair)] text-2xl font-medium leading-tight tracking-[-0.015em] text-[#14243e]">
                      {member.name}
                    </h3>
                    <span className="mt-3 inline-flex items-center rounded-full border border-[#e6dcc5] bg-[#faf7ef] px-3 py-1.5 text-[0.63rem] font-semibold uppercase tracking-[0.14em] text-[#7a5f2a]">
                      {member.position}
                    </span>
                    <span className="mt-6 inline-flex items-center gap-2 border-t border-[#eef1f5] pt-5 text-sm font-semibold text-[#14243e]">
                      <span className="h-px w-8 bg-[#c9a45c]/60" aria-hidden="true" />
                      Ver hoja de vida
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <p className="home-kicker">Nuestros principios</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl lg:text-[2.75rem]">
              Nuestros Valores
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Los principios que guían nuestro trabajo y definen nuestra
              excelencia profesional
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#e5e8ed] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a45c]/60 hover:shadow-[0_28px_60px_-28px_rgba(20,36,62,0.35)]"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,#c9a45c,#f0dcae,#c9a45c)]"
                />
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14243e] text-[#e2c488] shadow-[0_12px_24px_-10px_rgba(20,36,62,0.6)] ring-1 ring-[#c9a45c]/30">
                  <value.icon className="h-7 w-7" strokeWidth={1.4} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-[family-name:var(--font-playfair)] text-2xl font-medium leading-tight text-[#14243e]">
                  {value.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-7 text-[#5b6a7f]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
