"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone, Mail, MessageCircle } from "lucide-react";

export default function Contacto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que el form recargue la página (si es dentro de un <form>)
    setLoading(true);

    try {
      const response = await fetch("/api/SendMailPageContacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(InputValues),
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      const data = await response.json();
      alert(data.body || "Mensaje enviado correctamente ✅");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert("❌ Ocurrió un error al enviar el mensaje. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Teléfono",
      info: "+51 1 234-5678",
    },
    {
      icon: Mail,
      title: "Email",
      info: "mchabogados@legalmch.com",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      info: "+51 987 654 321",
    },
  ];

  return (
    <main className="min-h-screen">
      <section className="relative h-[30vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/Contacto.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Contáctanos
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Estamos aquí para ayudarte con tus necesidades legales
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50" ref={ref}>
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Solicita tu Consulta
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contáctanos para una consulta personalizada y descubre cómo
              podemos resolver tus necesidades legales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="shadow-lg border-0 h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                    Información de Contacto
                  </h3>
                  <div className="space-y-6">
                    {contactMethods.map((method, index) => (
                      <div
                        key={method.title}
                        className="flex items-center gap-4"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <method.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {method.title}
                          </h4>
                          <p className="text-gray-600">{method.info}</p>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Dirección
                        </h4>
                        <p className="text-gray-600">
                          Av. Larco 1234, Miraflores, Lima
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Horarios de Atención
                        </h4>
                        <p className="text-gray-600">
                          Lunes - Viernes: 9:00 AM - 6:00 PM
                        </p>
                        <p className="text-gray-600">
                          Sábados: 9:00 AM - 1:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="shadow-lg border-0 h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                    Formulario de Contacto
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Nombre Completo *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Teléfono
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="+51 987 654 321"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="service"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Servicio de Interés
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Seleccionar servicio</option>
                          <option value="corporativo">
                            Derecho Corporativo
                          </option>
                          <option value="civil">Derecho Civil</option>
                          <option value="penal">Derecho Penal</option>
                          <option value="arbitraje">
                            Arbitraje y Mediación
                          </option>
                          <option value="laboral">Derecho Laboral</option>
                          <option value="administrativo">
                            Derecho Administrativo
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Mensaje *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full"
                        placeholder="Describe tu consulta o caso..."
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg"
                      >
                        Enviar Consulta
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
