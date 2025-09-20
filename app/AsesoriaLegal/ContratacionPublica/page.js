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
              ARBITRAJE EN
              <br />
              <span className="text-white">CONTRATACIÓN PÚBLICA</span>
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8" />
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Resolución especializada de controversias en procesos de
              contratación estatal, garantizando transparencia y eficiencia en
              la administración pública.
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
                ARBITRAJE EN CONTRATACIÓN PÚBLICA
              </h2>
              <div className="bg-gray-50 rounded-lg p-8 lg:p-12">
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  El arbitraje en contratación pública es un mecanismo
                  especializado para resolver controversias que surgen en los
                  procesos de contratación del Estado. Este procedimiento
                  permite una resolución más ágil y técnica de los conflictos
                  entre entidades públicas y contratistas.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Nuestro centro cuenta con árbitros especializados en derecho
                  administrativo y contratación estatal, garantizando decisiones
                  fundamentadas en la normativa vigente y las mejores prácticas
                  del sector público.
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
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 font-serif mb-4">
                Áreas de Especialización
              </h3>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Building2,
                  title: "Obras Públicas",
                  description:
                    "Controversias en contratos de construcción, infraestructura y proyectos de inversión pública.",
                },
                {
                  icon: FileText,
                  title: "Servicios Públicos",
                  description:
                    "Disputas en contratos de prestación de servicios, consultoría y asesoría al Estado.",
                },
                {
                  icon: Clock,
                  title: "Procesos Ágiles",
                  description:
                    "Resolución eficiente que respeta los tiempos de la administración pública.",
                },
                {
                  icon: Shield,
                  title: "Cumplimiento Legal",
                  description:
                    "Estricto apego a la normativa de contratación pública y transparencia.",
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
                <h3 className="text-3xl md:text-4xl font-bold text-slate-800 font-serif mb-4">
                  Ventajas del Arbitraje Público
                </h3>
                <div className="w-20 h-1 bg-primary mx-auto" />
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-2xl font-semibold mb-6 text-slate-800">
                    Para Entidades Públicas
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">
                        Resolución técnica especializada en contratación estatal
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">
                        Reducción de tiempos procesales comparado con la vía
                        judicial
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">
                        Confidencialidad en asuntos sensibles de la
                        administración
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
                        Acceso a árbitros con experiencia en sector público
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
                        Ejecución efectiva de laudos arbitrales
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-900 text-white rounded-2xl p-8 lg:p-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold font-serif mb-4">
                Consulte su Caso de Contratación Pública
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Nuestros especialistas en derecho administrativo están listos
                para asesorarle en su controversia de contratación estatal.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Teléfono</h4>
                <p className="text-gray-300">+51 1 234-5678</p>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Email</h4>
                <p className="text-gray-300">mchabogados@legalmch.com</p>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Dirección</h4>
                <p className="text-gray-300">
                  Av. Larco 1234, Miraflores, Lima
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
                asChild
              >
                <a href="/Contacto">Solicitar Consulta Especializada</a>
              </Button>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
