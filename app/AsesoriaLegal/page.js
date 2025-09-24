"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Gavel, Clock } from "lucide-react";
import Link from "next/link";

const legalServices = [
  {
    title: "Arbitraje en Contratación Pública",
    description:
      "Resolución de controversias surgidas en procesos de contratación con el Estado mediante arbitraje especializado.",
    icon: Gavel,
    href: "/AsesoriaLegal/ContratacionPublica",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Arbitraje de Emergencia",
    description:
      "Mecanismo expedito para atender solicitudes urgentes y medidas cautelares antes de la constitución del tribunal arbitral.",
    icon: Shield,
    href: "/AsesoriaLegal/ArbitrajeEmergencia",
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Arbitraje entre Privados",
    description:
      "Solución de disputas comerciales, civiles o contractuales entre particulares de forma confidencial y efectiva.",
    icon: Users,
    href: "/AsesoriaLegal/EntrePrivados",
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Arbitraje Express",
    description:
      "Procedimiento arbitral simplificado y rápido, diseñado para resolver controversias en plazos más cortos.",
    icon: Clock,
    href: "/AsesoriaLegal/ArbitrajeExpress",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function AsesoriaLegal() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('/professional-legal-office-arbitration-center.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 uppercase">
              Asesoría Legal Especializada
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Más de una década de experiencia ofreciendo servicios legales
              integrales y soluciones personalizadas en diversas áreas del
              derecho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/Contacto"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 uppercase"
              >
                Consulta Gratuita
              </Link>
              <Link
                href="/Cotizar"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 uppercase"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
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
    </main>
  );
}
