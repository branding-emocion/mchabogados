"use client";

import ContactSection from "@/components/ContactSection";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Shield,
  Scale,
  FileText,
  CheckCircle,
  AlertTriangle,
  Briefcase,
  Eye,
  Phone,
} from "lucide-react";
import Link from "next/link";

export default function DerechoPenalPage() {
  const criminalAreas = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Delitos Económicos",
      description:
        "Defensa especializada en delitos financieros, lavado de activos, estafa y fraude empresarial.",
      features: [
        "Lavado de activos",
        "Estafa agravada",
        "Fraude financiero",
        "Delitos tributarios",
      ],
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Delitos de Corrupción",
      description:
        "Representación en casos de corrupción de funcionarios, cohecho y tráfico de influencias.",
      features: [
        "Cohecho activo/pasivo",
        "Tráfico de influencias",
        "Malversación",
        "Enriquecimiento ilícito",
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Delitos contra la Propiedad",
      description:
        "Defensa en casos de hurto, robo, apropiación ilícita y daños patrimoniales.",
      features: [
        "Hurto agravado",
        "Robo",
        "Apropiación ilícita",
        "Receptación",
      ],
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Delitos Informáticos",
      description:
        "Especialización en cibercrímenes, fraude electrónico y delitos contra datos personales.",
      features: [
        "Fraude electrónico",
        "Acceso ilícito",
        "Sabotaje informático",
        "Suplantación digital",
      ],
    },
  ];

  const services = [
    {
      icon: <Scale className="w-12 h-12" />,
      title: "Defensa Penal Integral",
      description:
        "Evaluamos cada caso minuciosamente para garantizar la mejor defensa posible, con un excelente y eficaz enfoque en la protección de los derechos constitucionales de nuestros clientes.",
      benefits: [
        "Análisis exhaustivo del caso",
        "Estrategia de defensa personalizada",
        "Protección de derechos constitucionales",
        "Acompañamiento en todas las etapas",
      ],
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Actualización Legal Continua",
      description:
        "Mantenemos al tanto de las últimas reformas al Código Penal, como la reciente inclusión de delitos informáticos, y cómo estos cambios pueden afectar a ciudadanos y empresas.",
      benefits: [
        "Monitoreo de reformas legales",
        "Análisis de nuevas tipificaciones",
        "Capacitación empresarial",
        "Prevención de riesgos penales",
      ],
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Consulta Inicial",
      description:
        "Evaluación gratuita del caso y análisis de viabilidad de la defensa.",
    },
    {
      number: "02",
      title: "Estrategia Legal",
      description:
        "Desarrollo de estrategia de defensa personalizada según el tipo de delito.",
    },
    {
      number: "03",
      title: "Representación",
      description:
        "Acompañamiento legal en todas las etapas del proceso penal.",
    },
    {
      number: "04",
      title: "Seguimiento",
      description:
        "Monitoreo continuo y actualización sobre el estado del proceso.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/DefensaArbitral.avif')`,
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
              DERECHO
              <br />
              <span className="text-primary">PENAL</span>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-8" />
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              En MCH ABOGADOS, proporcionamos defensa penal en delitos de alta
              complejidad, incluyendo delitos económicos, corrupción, delitos
              contra la propiedad y delitos informáticos. Nos especializamos en
              estrategias de defensa eficaces en las diversas etapas del proceso
              penal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">
              Nuestros Servicios Penales
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Brindamos servicios integrales de defensa penal con el más alto
              nivel profesional
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-primary mb-6">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-3">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-slate-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">
              Nuestro Proceso de Defensa
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Un enfoque sistemático y profesional para garantizar la mejor
              defensa posible
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-primary/20 transform translate-x-10" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
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
