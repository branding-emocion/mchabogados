"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  FileText,
  Scale,
  Users,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactSection from "@/components/ContactSection";

export default function DerechoAdministrativo() {
  const services = [
    {
      icon: FileText,
      title: "Consultoría en Licencias y Permisos",
      description:
        "Asesoramiento integral para la obtención de licencias de funcionamiento, permisos municipales, autorizaciones sectoriales y trámites administrativos.",
      features: [
        "Licencias de funcionamiento",
        "Permisos municipales",
        "Autorizaciones sectoriales",
        "Trámites ante SUNAT y SUNARP",
      ],
    },
    {
      icon: Scale,
      title: "Normativa y Regulación",
      description:
        "Análisis y cumplimiento de normativas administrativas, elaboración de reglamentos internos y asesoría en procedimientos administrativos.",
      features: [
        "Análisis normativo",
        "Elaboración de reglamentos",
        "Procedimientos administrativos",
        "Compliance regulatorio",
      ],
    },
    {
      icon: Users,
      title: "Capacitación a Empresas",
      description:
        "Programas de capacitación especializada en derecho administrativo, procedimientos gubernamentales y cumplimiento normativo para equipos empresariales.",
      features: [
        "Talleres especializados",
        "Capacitación in-house",
        "Seminarios normativos",
        "Consultoría preventiva",
      ],
    },
  ];

  const benefits = [
    "Experiencia en múltiples sectores regulados",
    "Conocimiento profundo de la normativa peruana",
    "Relación directa con entidades públicas",
    "Enfoque preventivo y estratégico",
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/DefensaArbitral.avif')`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6">
              DERECHO
              <br />
              <span className="text-primary">ADMINISTRATIVO</span>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-8" />
            <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
              En MCH ABOGADOS, representamos a nuestros clientes ante diversas
              entidades públicas, gestionando procedimientos administrativos,
              licencias, autorizaciones y recursos contencioso-administrativos.
              Nos encargamos de proteger los intereses de nuestros clientes en
              casos de sanciones y procedimientos disciplinarios.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-6">
              Te asesoramos en{" "}
              <span className="text-primary">diversas áreas</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Nuestro equipo especializado en derecho administrativo ofrece
              soluciones integrales para empresas y particulares en sus
              relaciones con la administración pública.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-slate-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-slate-700"
                        >
                          <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <ContactSection />
    </div>
  );
}
