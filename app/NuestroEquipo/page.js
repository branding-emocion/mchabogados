"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Scale, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NuestroEquipo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teamMembers = [
    {
      id: "JuanArmandoMorillasArbildo",
      name: "Juan Armando Morillas Arbildo",
      position: "GERENTE GENERAL DEL CENTRO",
      image: "/equipo/juan.avif",
    },
    {
      id: "VacnerValverdeJara",
      name: "Vacner Valverde Jara",
      position: "PRESIDENTE DEL CONSEJO SUPERIOR DE ARBITRAJE",
      image: "/equipo/vacner.avif",
    },
    {
      id: "PabloAlbertoMorilloAguilar",
      name: "Pablo Alberto Morillo Aguilar",
      position: "PRIMER VOCAL DEL CONSEJO SUPERIOR DE ARBITRAJE",
      image: "/equipo/pablo.avif",
    },
    {
      id: "EduardoAlexisRuizSanMartin",
      name: "Eduardo Alexis Ruiz San Martin",
      position: "SEGUNDO VOCAL DEL CONSEJO SUPERIOR DE ARBITRAJE",
      image: "/equipo/eduardo.avif",
    },
  ];

  const values = [
    {
      icon: Scale,
      title: "Asesoramiento Integral",
      description:
        "Ofrecemos un servicio completo que abarca todas las áreas del derecho, garantizando una solución integral para cada caso.",
    },
    {
      icon: Award,
      title: "Seriedad y Profesionalismo",
      description:
        "Nuestro equipo mantiene los más altos estándares éticos y profesionales en cada consulta y representación legal.",
    },
    {
      icon: Users,
      title: "Tenacidad y Transparencia",
      description:
        "Trabajamos con determinación y mantenemos una comunicación clara y honesta con nuestros clientes en todo momento.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/QuienesSomos.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 uppercase">
              Nuestro Equipo
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Profesionales altamente calificados con décadas de experiencia
              combinada, comprometidos con brindar el mejor servicio legal a
              nuestros clientes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 uppercase">
              Secretaria Arbitral{" "}
            </h2>
            {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profesionales altamente calificados que lideran nuestro centro de
              arbitraje y asesoría legal
            </p> */}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                id={member.id}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="shadow-lg border-0 h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm text-primary font-semibold uppercase tracking-wide">
                        {member.position}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los principios que guían nuestro trabajo y definen nuestra
              excelencia profesional
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              ¿Necesitas Asesoría Legal?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Nuestro equipo está listo para ayudarte. Contáctanos para una
              consulta personalizada.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100"
            >
              Solicitar Consulta
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
