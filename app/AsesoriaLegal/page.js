"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Scale,
  Shield,
  Users,
  FileText,
  Building,
  Gavel,
} from "lucide-react";
import Link from "next/link";

const legalServices = [
  {
    title: "Proceso Arbitral",
    description:
      "Defensa arbitral especializada en arbitraje comercial, laboral e internacional con soluciones rápidas y efectivas.",
    icon: Scale,
    href: "/AsesoriaLegal/DefensaArbitral",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Derecho Penal",
    description:
      "Defensa penal especializada en delitos económicos, corrupción, contra la propiedad y delitos informáticos.",
    icon: Shield,
    href: "/AsesoriaLegal/DefensaPenal",
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Derecho Administrativo",
    description:
      "Representación ante entidades públicas, procedimientos administrativos, licencias y recursos contencioso-administrativos.",
    icon: Building,
    href: "/AsesoriaLegal/DerechoAdministrativo",
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Derecho Civil",
    description:
      "Contratos, derecho inmobiliario, derecho de familia y responsabilidad civil con enfoque personalizado.",
    icon: FileText,
    href: "/AsesoriaLegal/DerechoCivil",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Conciliación Extrajudicial",
    description:
      "Resolución alternativa de conflictos de manera rápida, confidencial y voluntaria sin recurrir a tribunales.",
    icon: Users,
    href: "/AsesoriaLegal/conciliaConciliacionExtrajudicial",
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Contratación Pública",
    description:
      "Asesoría integral en licitaciones públicas, normativa estatal, consorcios y cumplimiento contractual.",
    icon: Gavel,
    href: "/AsesoriaLegal/ContratacionPublica",
    color: "bg-teal-50 text-teal-600",
  },
];

export default function AsesoriaLegal() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Asesoría Legal
              <span className="block text-primary mt-2">Especializada</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Brindamos servicios legales integrales con más de una década de
              experiencia, especializándonos en diversas áreas del derecho para
              ofrecer soluciones efectivas y personalizadas a nuestros clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Consulta Gratuita
              </Link>
              <Link
                href="/cotizar"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                Cotizar Servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Nuestras Especialidades
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contamos con especialistas en cada área del derecho para brindar
              la mejor asesoría legal adaptada a sus necesidades específicas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {legalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={service.href}>
                  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                    <div
                      className={`w-16 h-16 rounded-lg ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span>Conocer más</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                ¿Por qué elegir MCH Abogados?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nuestra experiencia y compromiso nos posicionan como líderes en
                asesoría legal especializada en el mercado peruano.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Experiencia Comprobada
                    </h3>
                    <p className="text-gray-600">
                      Más de una década brindando servicios legales
                      especializados con resultados exitosos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Atención Personalizada
                    </h3>
                    <p className="text-gray-600">
                      Cada caso recibe atención individual con estrategias
                      adaptadas a necesidades específicas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Equipo Multidisciplinario
                    </h3>
                    <p className="text-gray-600">
                      Especialistas en diferentes áreas del derecho trabajando
                      en conjunto para su caso.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Equipo legal MCH Abogados"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              ¿Necesita Asesoría Legal Especializada?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Contáctenos hoy mismo para una consulta gratuita y descubra cómo
              podemos ayudarle a resolver su situación legal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Agendar Consulta
              </Link>
              <Link
                href="tel:+51999999999"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                Llamar Ahora
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
