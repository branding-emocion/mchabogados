"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: "Derecho Corporativo",
      description:
        "Asesoría integral para empresas en constitución, fusiones, adquisiciones y gobierno corporativo.",
      icon: "🏢",
      link: "/AsesoriaLegal", // General link since we don't have a specific corporate law page
    },
    {
      title: "Derecho Civil",
      description:
        "Contratos, obligaciones, derechos reales y responsabilidad civil con enfoque personalizado.",
      icon: "⚖️",
      link: "/AsesoriaLegal/derecho-civil", // Updated to link to specific civil law page
    },
    {
      title: "Derecho Penal",
      description:
        "Defensa penal especializada en delitos económicos, contra la administración pública y empresariales.",
      icon: "🛡️",
      link: "/AsesoriaLegal/derecho-penal",
    },
    {
      title: "Arbitraje y Mediación",
      description:
        "Resolución alternativa de conflictos con árbitros especializados en diversas materias.",
      icon: "🤝",
      link: "/AsesoriaLegal/proceso-arbitral",
    },
    {
      title: "Derecho Laboral",
      description:
        "Asesoría en relaciones laborales, despidos, beneficios sociales y negociación colectiva.",
      icon: "👥",
      link: "/AsesoriaLegal", // General link since we don't have a specific labor law page
    },
    {
      title: "Derecho Administrativo",
      description:
        "Procedimientos administrativos, contratación pública y relaciones con el Estado.",
      icon: "📋",
      link: "/AsesoriaLegal/derecho-administrativo",
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
    <section id="servicios" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Card className="h-full bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-md group cursor-pointer">
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <motion.div
                    className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-3xl">{service.icon}</span>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover Effect Line */}
                  <motion.div
                    className="w-0 h-1 bg-primary mx-auto mt-6 group-hover:w-16 transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: 64 }}
                  />
                  <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                    <span className="text-primary font-medium text-sm">
                      Ver más →
                    </span>
                  </motion.div>
                </CardContent>
              </Card>
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
            className="inline-block bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-colors duration-300"
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
