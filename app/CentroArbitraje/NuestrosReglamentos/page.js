"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function NuestrosReglamentosPage() {
  const regulations = [
    {
      title: "Reglamento de Arbitraje",
      href: "/pdfs/Arbitral.pdf",
    },
    {
      title: "REGLAMENTO INTERNO DEL CENTRO",
      href: "/pdfs/REGLAMENTOINTERNODELCENTRO.pdf",
    },

    { title: "Código de Ética", href: "/pdfs/Etica.pdf" },
    {
      title: "Reglamento de Arbitraje Express",
      href: "/pdfs/Express.pdf",
    },
    {
      title: "Reglamento de Arbitraje de Emergencia",
      href: "/pdfs/EMERGENCA2.pdf",
    },
  ];

  const directives = [
    {
      title: `Directiva N°001-${new Date().getFullYear()}`,
      description: "Regulación sobre la Nómina de Árbitros",
      href: "/pdfs/001.pdf",
    },
    {
      title: "Directiva N°002-2024",
      description: "Recusación de Árbitros",
      href: "/pdfs/002.pdf",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/legal-regulations-documents-books.png')`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
            viewport={{ once: true }}
          >
            <h1 className="text-3xl md:text-6xl font-bold mb-6 font-serif uppercase">
              NUESTROS REGLAMENTOS
              <br />
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8 " />
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Documentos normativos que rigen los procesos arbitrales en MCH
              ABOGADOS, garantizando transparencia, eficiencia y cumplimiento de
              los más altos estándares legales.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#0f172b] mb-8">
              REGLAMENTOS PRINCIPALES
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10"
          >
            {regulations.map((regulation, index) => (
              <motion.a
                key={index}
                href={regulation.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-[#b39306]   text-white py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg uppercase ${
                  index == 4 && "md:col-span-2 text-center"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg font-medium">{regulation.title}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#0f172b] mb-4">
              DIRECTIVAS - TABLA DE PAGOS Y ARANCELES
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Directives */}
            <div className="space-y-6">
              {directives.map((directive, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold text-[#0f172b] mb-2 uppercase">
                    {directive.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{directive.description}</p>
                  <a
                    href={directive.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#b39306]  text-white px-4 py-2 rounded-lg transition-colors duration-300 uppercase"
                  >
                    <Download size={16} />
                    Descargar
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Payment Table */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-[#0f172b] mb-2 uppercase">
                Tabla de Pagos y Aranceles
              </h3>
              <p className="text-gray-600 mb-4">
                En este documento nuestros usuarios podrán encontrar los costos
                de los servicios brindados por el Centro de Arbitraje,
                categorizados según la cuantía de la materia controvertida para
                efectos de tener mayor información antes de iniciar los
                arbitrajes en nuestra institución.
              </p>
              <a
                href="/pdfs/Tabla.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#b39306]  text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <Download size={16} />
                Descargar
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
