"use client";

import { motion } from "framer-motion";

export default function ClausulaArbitralPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-12 font-serif">
              CLÁUSULA ARBITRAL
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
            >
              <p>
                `&quot;`Las partes acuerdan que todo litigio y controversia
                resultante de este contrato o relativo a éste, se resolverá
                mediante el arbitraje organizado y administrado por MCH ABOGADOS
                S.A.C. con número de RUC: 20613091158, de conformidad con sus
                reglamentos y directivas vigentes, a los cuales las partes se
                someten libremente, señalando que el laudo que se emita en el
                proceso será inapelable y definitivo.`&quot;`
              </p>
            </motion.div>
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
              Cláusula Arbitral Modelo
            </h2>
            <p className="text-lg text-gray-600">
              Contenido en desarrollo. Aquí se presentará la cláusula arbitral
              modelo.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
