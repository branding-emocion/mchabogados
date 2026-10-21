"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Shield,
  Zap,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function ArbitrajeEmergenciaPage() {
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
              ARBITRAJE DE EMERGENCIA
              <br />
            </h1>
            <div className="w-24 h-1  mx-auto bg-white mb-8" />
            <p className="text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Procedimiento acelerado para situaciones urgentes que requieren
              medidas cautelares inmediatas y resoluciÃ³n expedita.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-12 text-primary font-serif text-center">
                ARBITRAJE DE EMERGENCIA
              </h2>
              <div className="bg-gray-50 rounded-lg p-8 lg:p-12">
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  El arbitraje de emergencia es un procedimiento especial
                  diseÃ±ado para atender situaciones urgentes que no pueden
                  esperar la constituciÃ³n formal del tribunal arbitral. Permite
                  obtener medidas cautelares de manera inmediata para proteger
                  los derechos de las partes.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Este mecanismo garantiza que las situaciones crÃ­ticas reciban
                  atenciÃ³n prioritaria, con plazos reducidos y procedimientos
                  simplificados, manteniendo siempre los principios de debido
                  proceso y contradicciÃ³n.
                </p>
              </div>
            </div>
          </motion.section>

          {/* CaracterÃ­sticas del Procedimiento */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold mb-12 text-center text-slate-800 font-serif">
              CaracterÃ­sticas del Procedimiento de Emergencia
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary">
                <Clock className="w-12 h-12 text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-4 text-slate-800">
                  Plazos Acelerados
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Procedimiento expedito diseÃ±ado para situaciones crÃ­ticas.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-4 text-slate-800">
                  Medidas Cautelares
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  ProtecciÃ³n inmediata de derechos y activos mientras se
                  constituye el tribunal arbitral principal.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary">
                <Zap className="w-12 h-12 text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-4 text-slate-800">
                  Ãrbitro de Emergencia
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  DesignaciÃ³n inmediata de Ã¡rbitro especializado con amplia
                  experiencia en procedimientos urgentes.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Casos de AplicaciÃ³n */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="bg-slate-50 rounded-lg p-8 lg:p-12">
              <h3 className="text-3xl font-bold mb-8 text-center text-slate-800 font-serif uppercase">
                Casos TÃ­picos de Arbitraje de Emergencia
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-primary">
                    Situaciones Contractuales
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        SuspensiÃ³n de ejecuciÃ³n de garantÃ­as bancarias
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        ParalizaciÃ³n de obras o servicios
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        ProtecciÃ³n de informaciÃ³n confidencial
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-primary">
                    Medidas Patrimoniales
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        Embargo preventivo de activos
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        AdministraciÃ³n judicial de empresas
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        ProhibiciÃ³n de enajenar bienes
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Proceso del Arbitraje de Emergencia */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold mb-12 text-center text-slate-800 font-serif uppercase">
              Proceso del Arbitraje de Emergencia
            </h3>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="hidden md:flex bg-primary text-white rounded-full w-8 h-8 items-center justify-center font-bold mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-slate-800">
                      Solicitud de Emergencia
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      PresentaciÃ³n de solicitud fundamentada con evidencia de
                      urgencia y riesgo inminente.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="hidden md:flex bg-primary text-white rounded-full w-8 h-8 items-center justify-center font-bold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-slate-800">
                      DesignaciÃ³n del Ãrbitro
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Nombramiento inmediato de Ã¡rbitro de emergencia
                      especializado en 24 horas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="hidden md:flex bg-primary text-white rounded-full w-8 h-8 items-center justify-center font-bold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-slate-800">
                      Audiencia
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Audiencia virtual o presencial para escuchar a las partes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="hidden md:flex bg-primary text-white rounded-full w-8 h-8 items-center justify-center font-bold mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-slate-800">
                      DecisiÃ³n y EjecuciÃ³n
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Laudo de emergencia ejecutable inmediatamente con medidas
                      cautelares especÃ­ficas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Ventajas del Arbitraje de Emergencia */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-8 lg:p-12 text-white">
              <h3 className="text-3xl font-bold mb-8 text-center font-serif">
                Ventajas del Arbitraje de Emergencia
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <Clock className="w-12 h-12 text-white mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Rapidez</h4>
                  <p className="text-sm text-gray-300">
                    DecisiÃ³n en dÃ­as, no meses
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 text-white mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">ProtecciÃ³n</h4>
                  <p className="text-sm text-gray-300">
                    Salvaguarda inmediata de derechos
                  </p>
                </div>
                <div className="text-center">
                  <Zap className="w-12 h-12 text-white mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Eficiencia</h4>
                  <p className="text-sm text-gray-300">
                    Procedimiento simplificado
                  </p>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-white mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Ejecutabilidad</h4>
                  <p className="text-sm text-gray-300">
                    Cumplimiento inmediato
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
