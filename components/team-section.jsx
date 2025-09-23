"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Scale, Award, Users, BookOpen } from "lucide-react";
import Link from "next/link";

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teamMembers = [
    {
      id: "JuanArmandoMorillasArbildo",
      name: "Juan Armando Morillas Arbildo",
      position: "GERENTE GENERAL DEL CENTRO",
      // specialization: "Derecho Corporativo y Comercial",
      // experience: "20+ años de experiencia",
      // education: "Universidad Nacional Mayor de San Marcos",
      image: "/equipo/juan.avif",
      // achievements: [
      //   "Especialista en Arbitraje Comercial",
      //   "Miembro del Colegio de Abogados de Lima",
      // ],
    },
    {
      id: "VacnerValverdeJara",
      name: "Vacner Valverde Jara",
      position: "PRESIDENTE DEL CONSEJO SUPERIOR DE ARBITRAJE",
      // specialization: "Derecho Penal y Procesal",
      // experience: "18+ años de experiencia",
      // education: "Pontificia Universidad Católica del Perú",
      image: "/equipo/vacner.avif",
      // achievements: [
      //   "Especialista en Derecho Penal Económico",
      //   "Ex Fiscal Adjunto Provincial",
      // ],
    },
    {
      id: "PabloAlbertoMorilloAguilar",
      name: "Pablo Alberto Morillo Aguilar",
      position: "PRIMER VOCAL DEL CONSEJO SUPERIOR DE ARBITRAJE",
      // specialization: "Derecho Laboral y Tributario",
      // experience: "15+ años de experiencia",
      // education: "Universidad de Lima",
      image: "/equipo/pablo.avif",
      // achievements: [
      //   "Especialista en Derecho Tributario",
      //   "Consultora en Derecho Laboral",
      // ],
    },
    {
      id: "EduardoAlexisRuizSanMartin",
      name: "Eduardo Alexis Ruiz San Martin",
      position: "SEGUNDO VOCAL DEL CONSEJO SUPERIOR DE ARBITRAJE",
      // specialization: "Derecho Laboral y Tributario",
      // experience: "15+ años de experiencia",
      // education: "Universidad de Lima",
      image: "/equipo/eduardo.avif",
      // achievements: [
      //   "Especialista en Derecho Tributario",
      //   "Consultora en Derecho Laboral",
      // ],
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

  const handleMemberClick = (memberId) => {
    window.location.href = `/nuestro-equipo#${memberId}`;
  };

  return (
    <section id="nuestro-equipo" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 uppercase">
            Nuestro Equipo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Profesionales altamente calificados, experiencia combinada,
            comprometidos con brindar el mejor servicio legal a nuestros
            clientes
          </p>
        </motion.div>
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="/NuestroEquipo"
            className="inline-block bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-colors duration-300 uppercase"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Más
          </motion.a>
        </motion.div>

        {/* Team Members */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300  group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onClick={() => handleMemberClick(member.id)}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image || "/"}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary font-semibold mb-2">
                  {member.position}
                </p>
                {member.specialization && (
                  <p className="text-gray-600 mb-3">{member.specialization}</p>
                )}

                <div className="space-y-2 text-sm text-gray-500">
                  {member.education && (
                    <p className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {member.education}
                    </p>
                  )}

                  {member?.experience && (
                    <p className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      {member?.experience}
                    </p>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <ul className="space-y-1 text-sm text-gray-600">
                    {member?.achievements?.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={`/NuestroEquipo`}>
                  <div className="mt-4 text-center">
                    <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver perfil completo →
                    </span>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default TeamSection;
