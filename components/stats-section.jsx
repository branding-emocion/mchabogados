"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Calculator } from "lucide-react";

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden py-20 bg-[#0a1330] text-white" ref={ref}>
      {/* Resplandores dorados ambientales */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[52rem] -translate-x-1/2 rounded-full bg-[#c9a45c]/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-80 w-80 rounded-full bg-[#c9a45c]/10 blur-3xl" />
      <div className="hairline-oro absolute inset-x-0 top-0 h-[2px] opacity-70" />
      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white uppercase">
            Resultados que Importan
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Respaldamos cada caso con compromiso, transparencia y excelencia
            jurídica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/Cotizar" className="cursor-pointer">
              <Button
                className="btn-oro shadow-none uppercase cursor-pointer px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 items-center gap-2"
                size="lg"
              >
                <Calculator className="w-5 h-5 " />
                Calculadora de Costos
              </Button>
            </Link>

            {/* <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 bg-transparent"
              size="lg"
            >
              Consulta Gratuita
            </Button> */}
          </div>
        </motion.div>
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
