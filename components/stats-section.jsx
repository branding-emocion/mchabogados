"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      number: 15,
      suffix: "+",
      label: "Años de Experiencia",
      description: "Brindando asesoría legal especializada",
    },
    {
      number: 500,
      suffix: "+",
      label: "Casos Exitosos",
      description: "Resueltos satisfactoriamente",
    },
    {
      number: 50,
      suffix: "+",
      label: "Empresas Asesoradas",
      description: "Confiando en nuestros servicios",
    },
    {
      number: 98,
      suffix: "%",
      label: "Satisfacción Cliente",
      description: "Índice de recomendación",
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">
            Resultados que Hablan por Nosotros
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Más de una década de experiencia respaldando nuestro compromiso con
            la excelencia jurídica
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.div
                className="mb-4"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
              >
                <CountUpNumber
                  end={stat.number}
                  suffix={stat.suffix}
                  isInView={isInView}
                  delay={index * 0.2 + 0.5}
                />
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {stat.label}
              </h3>
              <p className="text-gray-300">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Counter component for animated numbers
const CountUpNumber = ({ end, suffix, isInView, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      let start = 0;
      const increment = end / 50;
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 30);

      return () => clearInterval(counter);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, end, delay]);

  return (
    <span className="text-5xl md:text-6xl font-bold">
      {count}
      {suffix}
    </span>
  );
};

export default StatsSection;
