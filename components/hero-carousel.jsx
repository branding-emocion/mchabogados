"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scale, Shield, Users, Award } from "lucide-react";
import Link from "next/link";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "MCH ABOGADOS",
      subtitle: "Excelencia Jurídica con Más de 15 Años de Experiencia",
      description:
        "Brindamos asesoría legal especializada con un enfoque integral y personalizado para empresas y particulares en todo el Perú",
      icon: Scale,
      // stats: "500+ Casos Exitosos",
    },
    {
      title: "DERECHO CORPORATIVO",
      subtitle: "Soluciones Estratégicas para tu Empresa",
      description:
        "Acompañamos el crecimiento de tu negocio con asesoría especializada en fusiones, adquisiciones, compliance y gobierno corporativo",
      icon: Shield,
      // stats: "200+ Empresas Asesoradas",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/slider/Banner.avif')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/95" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/20" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-32 right-16 w-24 h-24 border border-white/10 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-10 w-16 h-16 border border-white/10 rounded-full animate-pulse delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Text Content */}
          <div className="text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Badge with Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-6"
                >
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-white border-white/20 px-4 py-2 text-sm font-medium"
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {currentSlideData.stats}
                  </Badge>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {currentSlideData.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                  className="text-2xl md:text-3xl text-teal-200 mb-6 font-light"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {currentSlideData.subtitle}
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {currentSlideData.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Link href="/Contacto">
                    <Button
                      size="lg"
                      className="bg-white text-primary hover:cursor-pointer hover:bg-teal-50 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      Solicitar Consulta
                    </Button>
                  </Link>
                  <Link href="/NuestroEquipo">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold rounded-full bg-transparent backdrop-blur-sm transition-all duration-300"
                    >
                      Nuestro Equipo{" "}
                    </Button>{" "}
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Visual Element */}
          <div className="hidden lg:flex items-center justify-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Main Icon Circle */}
              <div className="w-80 h-80 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.8 }}
                  >
                    <IconComponent className="w-32 h-32 text-white" />
                  </motion.div>
                </AnimatePresence>

                {/* Orbiting Elements */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-teal-300 rounded-full"></div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full"></div>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-teal-200 rounded-full"></div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white/80 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative overflow-hidden transition-all duration-500 ${
                index === currentSlide
                  ? "w-12 h-3 bg-white rounded-full"
                  : "w-3 h-3 bg-white/40 rounded-full hover:bg-white/60"
              }`}
            >
              {index === currentSlide && (
                <motion.div
                  className="absolute inset-0 bg-teal-300 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom CSS for slow spin animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroCarousel;
