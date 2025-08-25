"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export function ContactSection() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Necesita Asesoría en Derecho Civil?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Proteja sus derechos con el respaldo de nuestros especialistas en
            derecho civil. Contáctenos para una consulta personalizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/Contacto">Contacto </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="/Cotizar">Cotizar Servicios</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export default ContactSection;
