"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  FileText,
  Clock,
  Shield,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function ArbitrajeContratacionPublicaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/professional-legal-office-arbitration-center.webp')`,
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
              ARBITRAJE EN
              <br />
              <span className="text-white">CONTRATACIÃ“N PÃšBLICA</span>
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8" />
            <p className="text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed">
              ResoluciÃ³n especializada de controversias en procesos de
              contrataciÃ³n estatal, garantizando transparencia y eficiencia en
              la administraciÃ³n pÃºblica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-slate-800 font-serif text-center">
                ARBITRAJE EN CONTRATACIÃ“N PÃšBLICA
              </h2>
              <div className="bg-gray-50 rounded-lg p-8 lg:p-12">
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  El arbitraje en contrataciÃ³n pÃºblica es un mecanismo
                  especializado para resolver controversias que surgen en los
                  procesos de contrataciÃ³n del Estado. Este procedimiento
                  permite una resoluciÃ³n mÃ¡s Ã¡gil y tÃ©cnica de los conflictos
                  entre entidades pÃºblicas y contratistas.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Nuestro centro cuenta con Ã¡rbitros especializados en derecho
                  administrativo y contrataciÃ³n estatal, garantizando decisiones
                  fundamentadas en la normativa vigente y las mejores prÃ¡cticas
                  del sector pÃºblico.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Expertise Areas */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 font-serif mb-4 uppercase">
                Ãreas de EspecializaciÃ³n
              </h3>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Building2,
                  title: "Obras PÃºblicas",
                  description:
                    "Controversias en contratos de construcciÃ³n, infraestructura y proyectos de inversiÃ³n pÃºblica.",
                },
                {
                  icon: FileText,
                  title: "Servicios PÃºblicos",
                  description:
                    "Disputas en contratos de prestaciÃ³n de servicios, consultorÃ­a y asesorÃ­a al Estado.",
                },
                {
                  icon: Clock,
                  title: "Procesos Ãgiles",
                  description:
                    "ResoluciÃ³n eficiente que respeta los tiempos de la administraciÃ³n pÃºblica.",
                },
                {
                  icon: Shield,
                  title: "Cumplimiento Legal",
                  description:
                    "Estricto apego a la normativa de contrataciÃ³n pÃºblica y transparencia.",
                },
              ].map((area, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <area.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="text-xl font-semibold mb-3 text-slate-800">
                      {area.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {area.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Benefits Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="bg-slate-50 rounded-2xl p-8 lg:p-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-800 font-serif mb-4 uppercase">
                  Ventajas del Arbitraje PÃºblico
                </h3>
                <div className="w-20 h-1 bg-primary mx-auto" />
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-2xl font-semibold mb-6 text-slate-800">
                    Para Entidades PÃºblicas
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">
                        ResoluciÃ³n tÃ©cnica especializada en contrataciÃ³n estatal
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">
                        ReducciÃ³n de tiempos procesales comparado con la vÃ­a
                        judicial
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">
                        Confidencialidad en asuntos sensibles de la
                        administraciÃ³n
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-2xl font-semibold mb-6 text-slate-800">
                    Para Contratistas
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">
                        Acceso a Ã¡rbitros con experiencia en sector pÃºblico
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">
                        Proceso imparcial y transparente
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">
                        EjecuciÃ³n efectiva de laudos arbitrales
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
