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
              ARBITRAJE DE
              <br />
              <span className="text-primary">EMERGENCIA</span>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-8" />
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Procedimiento acelerado para situaciones urgentes que requieren
              medidas cautelares inmediatas y resolución expedita.
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
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-primary font-serif text-center">
                ARBITRAJE DE EMERGENCIA
              </h2>
              <div className="bg-gray-50 rounded-lg p-8 lg:p-12">
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  El arbitraje de emergencia es un procedimiento especial
                  diseñado para atender situaciones urgentes que no pueden
                  esperar la constitución formal del tribunal arbitral. Permite
                  obtener medidas cautelares de manera inmediata para proteger
                  los derechos de las partes.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Este mecanismo garantiza que las situaciones críticas reciban
                  atención prioritaria, con plazos reducidos y procedimientos
                  simplificados, manteniendo siempre los principios de debido
                  proceso y contradicción.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Características del Procedimiento */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold mb-12 text-center text-slate-800 font-serif">
              Características del Procedimiento de Emergencia
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary">
                <Clock className="w-12 h-12 text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-4 text-slate-800">
                  Plazos Acelerados
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Decisión en máximo 15 días desde la solicitud. Procedimiento
                  expedito diseñado para situaciones críticas.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-4 text-slate-800">
                  Medidas Cautelares
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Protección inmediata de derechos y activos mientras se
                  constituye el tribunal arbitral principal.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary">
                <Zap className="w-12 h-12 text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-4 text-slate-800">
                  Árbitro de Emergencia
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Designación inmediata de árbitro especializado con amplia
                  experiencia en procedimientos urgentes.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Casos de Aplicación */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="bg-slate-50 rounded-lg p-8 lg:p-12">
              <h3 className="text-3xl font-bold mb-8 text-center text-slate-800 font-serif">
                Casos Típicos de Arbitraje de Emergencia
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
                        Suspensión de ejecución de garantías bancarias
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        Paralización de obras o servicios
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        Protección de información confidencial
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
                        Administración judicial de empresas
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        Prohibición de enajenar bienes
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
            <h3 className="text-3xl font-bold mb-12 text-center text-slate-800 font-serif">
              Proceso del Arbitraje de Emergencia
            </h3>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-slate-800">
                      Solicitud de Emergencia
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Presentación de solicitud fundamentada con evidencia de
                      urgencia y riesgo inminente.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-slate-800">
                      Designación del Árbitro
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Nombramiento inmediato de árbitro de emergencia
                      especializado en 24 horas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-slate-800">
                      Audiencia Expedita
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Audiencia virtual o presencial en máximo 5 días para
                      escuchar a las partes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-slate-800">
                      Decisión y Ejecución
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Laudo de emergencia ejecutable inmediatamente con medidas
                      cautelares específicas.
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
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Rapidez</h4>
                  <p className="text-sm text-gray-300">
                    Decisión en días, no meses
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Protección</h4>
                  <p className="text-sm text-gray-300">
                    Salvaguarda inmediata de derechos
                  </p>
                </div>
                <div className="text-center">
                  <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Eficiencia</h4>
                  <p className="text-sm text-gray-300">
                    Procedimiento simplificado
                  </p>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Ejecutabilidad</h4>
                  <p className="text-sm text-gray-300">
                    Cumplimiento inmediato
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Contacto */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-lg p-8 lg:p-12"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 text-slate-800 font-serif">
                ¿Necesita un Arbitraje de Emergencia?
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Contáctenos inmediatamente para evaluar su situación y activar
                el procedimiento de emergencia. Nuestro equipo está disponible
                para atender casos urgentes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-slate-800 mb-1">Teléfono</h4>
                <p className="text-gray-600">+51 1 234-5678</p>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-slate-800 mb-1">Email</h4>
                <p className="text-gray-600">contacto@mchabogados.pe</p>
              </div>
              <div className="text-center">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-slate-800 mb-1">WhatsApp</h4>
                <p className="text-gray-600">+51 987 654 321</p>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-slate-800 mb-1">Dirección</h4>
                <p className="text-gray-600">
                  Av. Larco 1234, Miraflores, Lima
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/Contacto"
                className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Contactar Ahora
              </Link>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
