"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Scale, Award, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function NuestroEquipo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch("/api/consejo-miembros");
      const data = await response.json();

      if (data.success) {
        // Filter only active members
        const activeMembers = data.members.filter((member) => member.active);
        setTeamMembers(activeMembers);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="text-3xl md:text-6xl font-bold mb-6 font-serif uppercase">
              Nuestro Equipo
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
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
              Consejo superior de arbitraje
            </h2>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4">Cargando miembros...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No hay miembros disponibles en este momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
              {teamMembers.map((member, index) => (
                <motion.a
                  key={member.id}
                  id={member.id}
                  className="group hover:cursor-pointer hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  href={member.cv || "#"}
                  target={member.cv ? "_blank" : undefined}
                  rel={member.cv ? "noopener noreferrer" : undefined}
                >
                  <Card className="shadow-lg border-0 h-full hover:shadow-xl transition-shadow duration-300 p-0">
                    <CardContent className="p-0 flex items-center">
                      {/* Imagen a la izquierda */}
                      <div className="relative overflow-hidden rounded-l-lg min-w-[160px] max-w-[180px]">
                        <img
                          src={member.image || ""}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                      </div>

                      {/* Texto a la derecha */}
                      <div className="p-6 text-left flex-1 uppercase">
                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                          {member.name}
                        </h3>
                        <p className="text-sm text-primary font-semibold tracking-wide">
                          {member.position}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>
          )}
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
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 uppercase">
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
    </main>
  );
}