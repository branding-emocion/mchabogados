"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PresentacionPage() {
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
              CENTRO DE PRESENTACIÓN
              <br />
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8" />
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              MCH ABOGADOS - Resolución especializada de controversias a través
              de arbitraje, brindando un servicio integral y confidencial en
              procesos arbitrales de alta complejidad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centro de Arbitraje Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary font-serif">
                  CENTRO DE ARBITRAJE `&quot;`MCH ABOGADOS`&quot;`
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 mb-8">
                  MCH Abogados es un centro especializado en la resolución de
                  controversias a través de arbitraje, brindando un servicio
                  integral y confidencial en procesos arbitrales de alta
                  complejidad. Nuestro equipo de árbitros está compuesto por
                  profesionales altamente calificados, garantizando
                  imparcialidad y celeridad en la emisión de laudos arbitrales
                  vinculantes. Contamos con una estructura diseñada para la
                  administración eficiente de los procedimientos, desde la
                  constitución del tribunal hasta la ejecución del laudo,
                  cumpliendo con los más altos estándares técnicos y legales.
                </p>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="bg-gray-200 rounded-lg p-8 text-center">
                    <div className="w-64 h-80 mx-auto bg-gray-300 rounded-lg mb-6 flex items-center justify-center">
                      <Image
                        src="/professional-lawyer-juan-armando-morillas-arbildo-.png"
                        alt="Juan Armando Morillas Arbildo"
                        width={256}
                        height={320}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      Juan Armando Morillas Arbildo
                    </h3>
                    <p className="text-gray-600 font-medium">
                      GERENTE GENERAL DEL CENTRO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Importancia del Arbitraje Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-primary font-serif text-center">
                IMPORTANCIA DE UN ARBITRAJE
              </h2>
              <div className="bg-gray-50 rounded-lg p-8 lg:p-12">
                <p className="text-lg leading-relaxed text-gray-700">
                  Un arbitraje es crucial debido a sus ventajas técnicas y
                  procesales frente a la justicia ordinaria. Permite elegir
                  árbitros especializados, lo que garantiza un análisis profundo
                  y preciso del conflicto. Además, se caracteriza por su
                  rapidez, evitando demoras propias de los tribunales
                  judiciales. El arbitraje es confidencial, protegiendo la
                  información sensible de las partes y salvaguardando su
                  reputación, especialmente en disputas comerciales. El laudo
                  arbitral es vinculante y, generalmente, inapelable, lo que
                  otorga seguridad jurídica y asegura su ejecución como una
                  sentencia judicial.
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
