"use client";

import { motion } from "framer-motion";

export default function NominaDeArbitrosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/professional-arbitrators-team-legal-experts.png')`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
              NÓMINA DE
              <br />
              <span className="text-primary">ÁRBITROS</span>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          </motion.div>
        </div>
      </section>

      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8 text-primary">
              Nuestros Árbitros Especializados
            </h2>
            <p className="text-lg text-gray-600">
              Contenido en desarrollo. Aquí se presentará la nómina de árbitros
              del centro.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
