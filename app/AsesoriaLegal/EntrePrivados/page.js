"use client";

import { motion } from "framer-motion";
import {
  Scale,
  Users,
  Clock,
  Shield,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

export default function ArbitrajeEntrePrivadosPage() {
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
              ARBITRAJE ENTRE
              <br />
              <span className="text-white">PRIVADOS</span>
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8" />
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Resolución eficiente de controversias comerciales y civiles entre
              particulares, con total confidencialidad y flexibilidad procesal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-primary font-serif text-center">
                ARBITRAJE ENTRE PRIVADOS
              </h2>
              <div className="bg-gray-50 rounded-lg p-8 lg:p-12">
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  El arbitraje entre privados ofrece una alternativa eficaz al
                  sistema judicial tradicional para resolver disputas
                  comerciales, contractuales y civiles. Las partes pueden elegir
                  árbitros especializados en la materia específica del
                  conflicto, garantizando una resolución técnica y fundamentada.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Este procedimiento se caracteriza por su flexibilidad,
                  confidencialidad y celeridad, permitiendo a las empresas y
                  particulares resolver sus controversias de manera privada y
                  eficiente, manteniendo sus relaciones comerciales.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Types of Disputes Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 font-serif">
                Tipos de Controversias
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8" />
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Especialistas en la resolución de diversos tipos de disputas
                entre particulares
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Contratos Comerciales",
                  description:
                    "Incumplimientos, interpretación de cláusulas, y disputas de ejecución contractual.",
                },
                {
                  icon: <Scale className="w-8 h-8" />,
                  title: "Sociedades y Socios",
                  description:
                    "Conflictos societarios, exclusión de socios, y valoración de participaciones.",
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Propiedad Intelectual",
                  description:
                    "Licencias, transferencias tecnológicas, y uso no autorizado de derechos.",
                },
                {
                  icon: <CheckCircle className="w-8 h-8" />,
                  title: "Construcción e Inmobiliario",
                  description:
                    "Contratos de obra, defectos constructivos, y compraventa inmobiliaria.",
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: "Servicios Profesionales",
                  description:
                    "Honorarios, responsabilidad profesional, y contratos de prestación.",
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Distribución y Franquicias",
                  description:
                    "Terminación de contratos, exclusividad territorial, y obligaciones comerciales.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="text-primary mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-slate-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Advantages Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="bg-slate-50 rounded-2xl p-8 lg:p-16">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 font-serif">
                  Ventajas del Arbitraje Privado
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto mb-8" />
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  {[
                    {
                      title: "Confidencialidad Total",
                      description:
                        "Las actuaciones y el laudo son completamente confidenciales, protegiendo la reputación y secretos comerciales de las partes.",
                    },
                    {
                      title: "Flexibilidad Procesal",
                      description:
                        "Las partes pueden adaptar el procedimiento a sus necesidades específicas, incluyendo plazos, idioma y sede del arbitraje.",
                    },
                    {
                      title: "Especialización Técnica",
                      description:
                        "Selección de árbitros con expertise específico en la materia controvertida, garantizando decisiones técnicamente fundamentadas.",
                    },
                  ].map((advantage, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mt-2" />
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-slate-800">
                          {advantage.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {advantage.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-8">
                  {[
                    {
                      title: "Rapidez y Eficiencia",
                      description:
                        "Resolución en plazos significativamente menores que los procesos judiciales ordinarios, con procedimientos streamlined.",
                    },
                    {
                      title: "Ejecutabilidad Internacional",
                      description:
                        "Los laudos arbitrales son reconocidos y ejecutables en más de 160 países bajo la Convención de Nueva York.",
                    },
                    {
                      title: "Control de Costos",
                      description:
                        "Previsibilidad en los costos del procedimiento y posibilidad de establecer límites presupuestarios desde el inicio.",
                    },
                  ].map((advantage, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mt-2" />
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-slate-800">
                          {advantage.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {advantage.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 font-serif">
                Proceso Arbitral
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8" />
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Un procedimiento estructurado y eficiente diseñado para resolver
                controversias de manera definitiva
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Solicitud de Arbitraje",
                  description:
                    "Presentación de la demanda arbitral con exposición de hechos y pretensiones.",
                },
                {
                  step: "02",
                  title: "Constitución del Tribunal",
                  description:
                    "Designación de árbitros según el acuerdo de las partes o reglamento aplicable.",
                },
                {
                  step: "03",
                  title: "Procedimiento",
                  description:
                    "Intercambio de escritos, práctica de pruebas y audiencias según cronograma.",
                },
                {
                  step: "04",
                  title: "Laudo Final",
                  description:
                    "Emisión de decisión definitiva y vinculante para ambas partes.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-2xl p-8 lg:p-16 text-white"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
                Consulte Su Caso
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8" />
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Nuestros especialistas están listos para asesorarle en su
                controversia entre privados
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Teléfono</h3>
                <p className="text-gray-300">+51 1 234-5678</p>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-gray-300">mchabogados@legalmch.com</p>
              </div>
              <div className="text-center">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">WhatsApp</h3>
                <p className="text-gray-300">+51 987 654 321</p>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Dirección</h3>
                <p className="text-gray-300">
                  Av. Larco 1234, Miraflores, Lima
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/Contacto"
                className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Contactar Ahora
              </Link>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
