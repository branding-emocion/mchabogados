"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Scale,
  Shield,
  Users,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
} from "lucide-react";

export default function RecusacionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/professional-legal-office-arbitration-center.png')`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
              <span className="text-white">ARBITRAJE EXPRESS</span>
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8" />
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Solución eficiente y profesional .
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        {/* Features Section */}
        <section className=" ">
          <div className="container mx-auto px-4">
            <div className="text-center ">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
                ¿Por qué elegir Arbitraje Express?
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Un proceso optimizado que combina rapidez, eficiencia y
                garantías legales
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Máximo 15 días</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Resolución garantizada en un plazo máximo de 15 días hábiles
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    Proceso Simplificado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Solo demanda, contestación y reconvención. Sin
                    complicaciones innecesarias
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    Documentación Mínima
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Pruebas presentadas junto con los escritos. Proceso basado
                    en documentos
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    Árbitros Especializados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Profesionales designados por el Consejo Superior de
                    Arbitraje
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 lg:py-28 bg-accent/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
                Proceso Simple y Eficiente
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Tres pasos para resolver tu disputa comercial
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Solicitud de Arbitraje
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Presenta tu solicitud con los documentos necesarios. Tenemos 5
                  días hábiles para notificar a la otra parte.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Designación de Árbitro
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  El Consejo Superior designa un árbitro especializado.
                  Instalación del tribunal y fijación de reglas procesales.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4">Resolución</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Presentación de escritos, actuación de pruebas y laudo final
                  en máximo 15 días hábiles.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
