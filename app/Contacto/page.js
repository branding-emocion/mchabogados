"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone, Mail, MessageCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Contacto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Nombre: "",
    Email: "",
    Telefono: "",
    Servicio: "",
    Mensaje: "",
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
      const response = await fetch("/api/SendMailForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      const data = await response.json();
      toast.success(data.body || "Mensaje enviado correctamente ");

      e.target.reset();
      setFormData({
        Nombre: "",
        Email: "",
        Telefono: "",
        Servicio: "",
        Mensaje: "",
      });
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      toast.error(
        " Ocurrió un error al enviar el mensaje. Inténtalo nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Teléfono",
      info: "+51 976 936 575",
    },
    {
      icon: Mail,
      title: "Email",
      info: "mchabogados@legalmch.com",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      info: "+51 976 936 575",
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
            <h1 className="text-3xl md:text-6xl font-bold mb-6 font-serif uppercase">
              Contáctanos
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Estamos aquí para ayudarte con tus necesidades legales.
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
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4 uppercase">
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
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 uppercase">
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
                          Residencial San Francisco A&apos;-27, Huanchaco.
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
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 uppercase">
                    Formulario de Contacto
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="Nombre"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Nombre Completo *
                        </label>
                        <Input
                          id="Nombre"
                          name="Nombre"
                          type="text"
                          required
                          value={formData.Nombre}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email *
                        </label>
                        <Input
                          id="Email"
                          name="Email"
                          type="email"
                          required
                          value={formData.Email}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="Telefono"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Teléfono *
                        </label>
                        <Input
                          id="Telefono"
                          name="Telefono"
                          type="tel"
                          value={formData?.Telefono}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="+51 976 936 575"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Servicio"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Servicio de Interés
                        </label>

                        <Select
                          value={formData.Servicio}
                          id="Servicio"
                          name="Servicio"
                          className="w-full "
                          onValueChange={(value) => {
                            setFormData({
                              ...formData,
                              Servicio: value,
                            });
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder=" seleccione una opción" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Arbitraje en contratación pública">
                              Arbitraje en contratación pública
                            </SelectItem>
                            <SelectItem value="Arbitraje de emergencia">
                              Arbitraje de emergencia
                            </SelectItem>
                            <SelectItem value="Arbitraje entre privados">
                              Arbitraje entre privados
                            </SelectItem>
                            <SelectItem value="Arbitraje Express">
                              Arbitraje Express
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="Mensaje"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Mensaje *
                      </label>
                      <Textarea
                        id="Mensaje"
                        name="Mensaje"
                        required
                        value={formData?.Mensaje}
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
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 hover:cursor-pointer text-white py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
                      >
                        {loading ? "Enviando..." : "Enviar Consulta"}
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
