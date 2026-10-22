"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Landmark, Zap, Handshake, Scale } from "lucide-react";
import Link from "next/link";

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: "Arbitraje en Contratación Pública",
      description:
        "Resolución especializada de controversias en procesos de contratación con el Estado y entidades públicas.",
      icon: Landmark,
      link: "/AsesoriaLegal/ContratacionPublica",
    },
    {
      title: "Arbitraje de Emergencia",
      description:
        "Procedimientos arbitrales urgentes para la resolución rápida de conflictos que requieren medidas cautelares inmediatas.",
      icon: Zap,
      link: "/AsesoriaLegal/ArbitrajeEmergencia",
    },
    {
      title: "Arbitraje entre Privados",
      description:
        "Mediación y arbitraje comercial entre empresas privadas para resolver disputas contractuales y comerciales.",
      icon: Handshake,
      link: "/AsesoriaLegal/EntrePrivados",
    },
    {
      title: "Arbitraje Express",
      description:
        "Procedimientos de recusación de árbitros y magistrados para garantizar la imparcialidad en los procesos.",
      icon: Scale,
      link: "/AsesoriaLegal/ArbitrajeExpress",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-white via-[#faf6ee] to-white" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow-oro">Áreas de práctica</span>
          <motion.h2
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 mt-3 uppercase"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Nuestros Servicios
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Contamos con los mejores servicios a tu disposición, brindando
            asesoría legal especializada con más de una década de experiencia en
            el mercado peruano.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2   gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services?.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Link href={service.link}>
                <Card className="h-full bg-white rounded-2xl border border-[#c9a45c]/15 shadow-md hover:shadow-[0_24px_50px_-20px_rgba(15,25,60,0.35)] hover:border-[#c9a45c]/45 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-8 text-center">
                    {/* Icon */}
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-br from-[#c9a45c]/25 to-[#a57f3e]/10 ring-1 ring-[#c9a45c]/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-[#c9a45c]/40 group-hover:to-[#a57f3e]/20 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <service.icon className="w-8 h-8 text-[#a57f3e]" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 group-hover:text-[#a57f3e] transition-colors duration-300 uppercase">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Hover Effect Line */}
                    <motion.div
                      className="w-0 h-1 bg-gradient-to-r from-[#c9a45c] to-[#a57f3e] rounded-full mx-auto mt-6 group-hover:w-16 transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: 64 }}
                    />
                    <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4 uppercase">
                      <span className="text-[#a57f3e] font-medium text-sm">
                        Ver más →
                      </span>
                    </motion.div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="/AsesoriaLegal"
            className="btn-oro inline-block px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 uppercase"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Todos los Servicios
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
