"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Clock,
  DollarSign,
  Shield,
  FileCheck,
  Users,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Scale,
  Handshake,
  Target,
} from "lucide-react";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";

export default function ConciliacionExtrajudicialPage() {
  const advantages = [
    {
      icon: Clock,
      title: "Rapidez",
      description:
        "La conciliación extrajudicial es un medio alternativo más ágil que un litigio judicial. Mientras que los procesos en los tribunales pueden extenderse por años debido a la congestión judicial, la conciliación se lleva a cabo en un número limitado de sesiones, ahorrando tiempo valioso a las partes.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: DollarSign,
      title: "Costos Reducidos",
      description:
        "Al ser un proceso más expedito, se minimizan los costos legales y administrativos. La reducción de trámites y la menor duración del proceso disminuyen considerablemente los gastos asociados a honorarios de abogados y tasas judiciales.",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Shield,
      title: "Confidencialidad",
      description:
        "Los procedimientos conciliatorios se llevan a cabo de forma privada, garantizando la reserva de la información tratada. A diferencia de los juicios públicos, la conciliación protege la privacidad de las partes y la naturaleza del conflicto.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: FileCheck,
      title: "Ejecución Forzosa",
      description:
        "El acuerdo alcanzado tiene fuerza de título ejecutivo, permitiendo su ejecución inmediata en caso de incumplimiento, sin necesidad de un nuevo proceso judicial. Esto implica que se pueden solicitar medidas coercitivas como embargos o ejecuciones directas ante el juzgado competente.",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Solicitud de Conciliación",
      description:
        "Presentación de la solicitud ante el centro de conciliación autorizado",
    },
    {
      number: "02",
      title: "Invitación a las Partes",
      description:
        "Notificación formal a todas las partes involucradas en el conflicto",
    },
    {
      number: "03",
      title: "Audiencia de Conciliación",
      description:
        "Sesión dirigida por conciliador certificado para facilitar el diálogo",
    },
    {
      number: "04",
      title: "Acuerdo Conciliatorio",
      description: "Formalización del acuerdo con valor de título ejecutivo",
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: "Control de las Partes",
      description:
        "Las partes mantienen el control sobre la solución del conflicto",
    },
    {
      icon: Handshake,
      title: "Preserva Relaciones",
      description: "Mantiene las relaciones comerciales y personales a futuro",
    },
    {
      icon: Target,
      title: "Soluciones Creativas",
      description: "Permite encontrar soluciones innovadoras y personalizadas",
    },
    {
      icon: Scale,
      title: "Equidad",
      description:
        "Proceso equitativo donde ambas partes pueden expresarse libremente",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/DefensaArbitral.avif')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <Badge className="mb-4 bg-primary/20 text-primary-foreground border-primary/30">
                Resolución Alternativa de Conflictos
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                CONCILIACIÓN
                <span className="block text-primary">EXTRAJUDICIAL</span>
              </h1>
              <div className="w-16 h-1 bg-primary mb-6" />
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                La Conciliación Extrajudicial es un mecanismo rápido,
                confidencial y voluntario para resolver conflictos sin recurrir
                a los tribunales. En MCH ABOGADOS, facilitamos este proceso en
                disputas civiles, familiares y comerciales, brindando un espacio
                neutral donde las partes pueden dialogar y llegar a acuerdos que
                beneficien a ambas partes, evitando el desgaste de un juicio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Solicitar Conciliación
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  ¿Por qué elegir la conciliación?
                </h3>
                <div className="space-y-4">
                  {[
                    "Proceso más rápido que un juicio",
                    "Costos significativamente menores",
                    "Total confidencialidad",
                    "Acuerdo con fuerza ejecutiva",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center text-white">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Beneficios Clave</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Ventajas de la Conciliación Extrajudicial
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre por qué la conciliación extrajudicial es la mejor
              alternativa para resolver conflictos de manera eficiente y
              satisfactoria para todas las partes involucradas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl ${advantage.color} flex items-center justify-center mb-6`}
                    >
                      <advantage.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {advantage.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Proceso Estructurado</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Proceso de Conciliación
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un proceso claro y estructurado que garantiza la efectividad y
              transparencia en la resolución de conflictos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 transform translate-x-10" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Beneficios Adicionales
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              La conciliación extrajudicial ofrece ventajas únicas que van más
              allá del ahorro de tiempo y dinero.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-primary-foreground/80">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <ContactSection />
    </div>
  );
}
