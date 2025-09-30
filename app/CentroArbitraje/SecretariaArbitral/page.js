"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function SecretariaArbitral() {
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
            <h1 className="text-3xl md:text-6xl font-bold mb-6 font-serif uppercase">
              secretaría arbitral <br />
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8" />
          </motion.div>
        </div>
      </section>

      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8 text-primary uppercase">
              ¿Qué es la Secretaría Arbitral?{" "}
            </h2>
            <Card className="mb-8">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed mb-6">
                  La <strong>Secretaría Arbitral</strong> es el servicio
                  administrativo especializado que brinda soporte integral a los
                  procesos de arbitraje. Actúa como el centro operativo que
                  coordina, gestiona y administra todos los aspectos
                  procedimentales del arbitraje, desde su inicio hasta la
                  emisión del laudo arbitral.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 ">
                  <Button href="/pdfs/SECRETARIOGENERAL.pdf">
                    Secretario General{" "}
                  </Button>

                  <Button href="/pdfs/EduardoAdolfo.pdf">
                    Secretario Arbitral
                  </Button>
                  <Button href="/pdfs/JuanArmando.pdf">
                    {" "}
                    Secretario Arbitral
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
