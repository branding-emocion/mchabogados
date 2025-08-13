"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Scale, Award, Users, BookOpen } from "lucide-react";

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teamMembers = [
    {
      id: "maria-herrera",
      name: "Dr. María Carmen Herrera",
      position: "Socia Fundadora",
      specialization: "Derecho Corporativo y Comercial",
      experience: "20+ años de experiencia",
      education: "Universidad Nacional Mayor de San Marcos",
      image: "/placeholder.svg?height=400&width=400",
      achievements: [
        "Especialista en Arbitraje Comercial",
        "Miembro del Colegio de Abogados de Lima",
      ],
    },
    {
      id: "carlos-mendoza",
      name: "Dr. Carlos Mendoza",
      position: "Socio Senior",
      specialization: "Derecho Penal y Procesal",
      experience: "18+ años de experiencia",
      education: "Pontificia Universidad Católica del Perú",
      image: "/placeholder.svg?height=400&width=400",
      achievements: [
        "Especialista en Derecho Penal Económico",
        "Ex Fiscal Adjunto Provincial",
      ],
    },
    {
      id: "ana-gonzales",
      name: "Dra. Ana Beatriz Gonzales",
      position: "Socia",
      specialization: "Derecho Laboral y Tributario",
      experience: "15+ años de experiencia",
      education: "Universidad de Lima",
      image: "/placeholder.svg?height=400&width=400",
      achievements: [
        "Especialista en Derecho Tributario",
        "Consultora en Derecho Laboral",
      ],
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
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Profesionales altamente calificados con décadas de experiencia
            combinada, comprometidos con brindar el mejor servicio legal a
            nuestros clientes
          </p>
        </motion.div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onClick={() => handleMemberClick(member.id)}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary font-semibold mb-2">
                  {member.position}
                </p>
                <p className="text-gray-600 mb-3">{member.specialization}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {member.education}
                  </p>
                  <p className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    {member.experience}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <ul className="space-y-1 text-sm text-gray-600">
                    {member.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver perfil completo →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <motion.div
          className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Los principios que guían nuestro trabajo y definen nuestra
              excelencia profesional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
