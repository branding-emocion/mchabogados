"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ContactCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactMethods = [
    {
      icon: "📞",
      title: "Llámanos",
      description: "Habla directamente con nuestros expertos",
      action: "Llamar Ahora",
      details: "+51 1 234-5678",
    },
    {
      icon: "✉️",
      title: "Escríbenos",
      description: "Envíanos tu consulta por email",
      action: "Enviar Email",
      details: "contacto@mchabogados.pe",
    },
    {
      icon: "📅",
      title: "Agenda una Cita",
      description: "Programa una consulta personalizada",
      action: "Agendar Cita",
      details: "Disponible Lun-Vie",
    },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-br from-slate-50 to-white"
      ref={ref}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            ¿Necesitas Asesoría Legal?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarte. Contáctanos hoy
            mismo y obtén la mejor asesoría legal.
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{method.icon}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <p className="text-sm text-primary font-medium mb-4">
                    {method.details}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Consulta Gratuita de 30 Minutos
            </h3>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Agenda una consulta inicial sin costo y descubre cómo podemos
              ayudarte con tu caso legal.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-medium"
                onClick={() => (window.location.href = "/contacto")}
              >
                Solicitar Consulta Gratuita
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTASection;
