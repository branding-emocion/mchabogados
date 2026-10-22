"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function LicenciaFuncionamiento() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-[#101c44] via-[#1a2757] to-[#101c44] text-white">
      <div className="pointer-events-none absolute -top-28 right-0 h-72 w-72 rounded-full bg-[#c9a45c]/15 blur-3xl" />
      <div className="hairline-oro absolute inset-x-0 top-0 h-[2px] opacity-70" />
      <div className="container mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow-oro !text-[#e6c886]">
            Respaldo y legalidad
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-3 uppercase">
            Licencia de funcionamiento
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Nuestra licencia de funcionamiento es su respaldo: trabajamos con
            total legalidad, transparencia y compromiso hacia cada cliente. .
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="btn-oro shadow-none uppercase font-semibold"
            >
              <a
                href="/LicenciaFuncionamiento.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Licencia
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="uppercase bg-transparent border-white/60 text-white hover:bg-white hover:text-[#1a2757]"
            >
              <a
                href="/ResolucionAdministrativa.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Resolución Administrativa
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export default LicenciaFuncionamiento;
