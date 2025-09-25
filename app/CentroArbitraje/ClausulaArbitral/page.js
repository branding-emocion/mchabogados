"use client";

import { motion } from "framer-motion";

export default function ClausulaArbitralPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/professional-legal-office-arbitration-center.png')`,
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
            <h1 className="text-3xl md:text-6xl font-bold mb-6 font-serif">
              CLÁUSULA ARBITRAL
              <br />
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8" />
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
            <h2 className="text-3xl font-bold mb-8 text-primary uppercase">
              Cláusula Arbitral Modelo
            </h2>
            <p className="text-lg text-gray-600">
              &quot;Las partes acuerdan que todo litigio y controversia
              resultante de este contrato o relativo a éste, se resolverá
              mediante el arbitraje organizado y administrado por MCH ABOGADOS
              S.A.C. con numero de RUC: 20613091158, de conformidad con sus
              reglamentos y directivas vigentes, a los cuales las partes se
              someten libremente, señalando que el laudo que se emita en el
              proceso será inapelable y definitivo.”
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
