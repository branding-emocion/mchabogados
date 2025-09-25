"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function LicenciaFuncionamiento() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">
            Licencia de funcionamiento
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Nuestra licencia de funcionamiento es su respaldo: trabajamos con
            total legalidad, transparencia y compromiso hacia cada cliente. .
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className={"uppercase"} variant="secondary">
              <a
                href="/LicenciaFuncionamiento.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Licencia
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export default LicenciaFuncionamiento;
