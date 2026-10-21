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
            backgroundImage: `url('/professional-legal-office-arbitration-center.webp')`,
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
            <h1 className="text-3xl md:text-6xl font-bold mb-6 font-serif">
              <span className="text-white">ARBITRAJE EXPRESS</span>
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8" />
            <p className="text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed">
              SoluciÃ³n eficiente y profesional .
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
              <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4 uppercase">
                Â¿Por quÃ© elegir Arbitraje Express?
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Un proceso optimizado que combina rapidez, eficiencia y
                garantÃ­as legales
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">MÃ¡ximo 15 dÃ­as</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    ResoluciÃ³n garantizada en un plazo mÃ¡ximo de 15 dÃ­as hÃ¡biles
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
                    Solo demanda, contestaciÃ³n y reconvenciÃ³n. Sin
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
                    DocumentaciÃ³n MÃ­nima
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
                    Ãrbitros Especializados
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
              <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4 uppercase">
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
                  dÃ­as hÃ¡biles para notificar a la otra parte.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  DesignaciÃ³n de Ãrbitro
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  El Consejo Superior designa un Ã¡rbitro especializado.
                  InstalaciÃ³n del tribunal y fijaciÃ³n de reglas procesales.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4">ResoluciÃ³n</h3>
                <p className="text-muted-foreground leading-relaxed">
                  PresentaciÃ³n de escritos, actuaciÃ³n de pruebas y laudo final
                  en mÃ¡ximo 15 dÃ­as hÃ¡biles.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
