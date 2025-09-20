"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Scale,
  Shield,
  Users,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function RecusacionPage() {
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
              <span className="text-white">RECUSACIÓN</span>
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8" />
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Procedimiento para garantizar la imparcialidad e independencia de
              los árbitros en el proceso arbitral.
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
                RECUSACIÓN DE ÁRBITROS
              </h2>
              <div className="bg-gray-50 rounded-lg p-8 lg:p-12">
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  La recusación es un mecanismo fundamental para garantizar la
                  imparcialidad e independencia de los árbitros. Permite a las
                  partes cuestionar la participación de un árbitro cuando
                  existen circunstancias que puedan generar dudas justificadas
                  sobre su neutralidad.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Nuestro centro maneja estos procedimientos con estricto apego
                  a los principios de transparencia y debido proceso, asegurando
                  que el tribunal arbitral mantenga la confianza de todas las
                  partes involucradas en el proceso.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Key Features */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 font-serif mb-4">
                Características del Procedimiento
              </h3>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Scale,
                  title: "Imparcialidad",
                  description:
                    "Garantizamos la neutralidad absoluta en todos los procedimientos de recusación.",
                },
                {
                  icon: Shield,
                  title: "Transparencia",
                  description:
                    "Proceso claro y transparente con plazos definidos y comunicación constante.",
                },
                {
                  icon: Users,
                  title: "Debido Proceso",
                  description:
                    "Respeto estricto a los derechos de todas las partes involucradas.",
                },
                {
                  icon: CheckCircle,
                  title: "Eficiencia",
                  description:
                    "Resolución ágil para no afectar los tiempos del proceso arbitral principal.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="text-xl font-semibold mb-3 text-slate-800">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Process Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 font-serif mb-4">
                Proceso de Recusación
              </h3>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Presentación de la Solicitud",
                    description:
                      "La parte interesada presenta la solicitud de recusación fundamentando las causales que afectan la imparcialidad del árbitro.",
                  },
                  {
                    step: "02",
                    title: "Evaluación Preliminar",
                    description:
                      "Nuestro equipo evalúa la procedencia de la solicitud conforme a los criterios legales y reglamentarios aplicables.",
                  },
                  {
                    step: "03",
                    title: "Audiencia y Alegatos",
                    description:
                      "Se otorga oportunidad a todas las partes para presentar sus argumentos y al árbitro para su defensa.",
                  },
                  {
                    step: "04",
                    title: "Resolución",
                    description:
                      "Emisión de la resolución fundamentada sobre la procedencia o improcedencia de la recusación.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-3 text-slate-800">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
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
                ¿Necesita Asesoría en Recusación?
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Nuestros expertos están listos para guiarle en el proceso de
                recusación y garantizar la imparcialidad en su arbitraje.
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
                <a href="/Contacto">Solicitar Consulta</a>
              </Button>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
