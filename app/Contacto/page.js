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

  const inputClassName =
    "w-full border-[#e5e8ed] bg-white text-[#14243e] placeholder:text-[#8a94a3] focus-visible:border-[#c9a45c] focus-visible:ring-2 focus-visible:ring-[#c9a45c]/30 focus-visible:ring-offset-0";
  const labelClassName =
    "block text-sm font-semibold text-[#14243e] mb-2";

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b1a33]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/Contacto.jpg')` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,20,38,0.93)_0%,rgba(11,32,62,0.82)_45%,rgba(20,50,90,0.45)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-[#c9a45c]/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-20 lg:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-[#c9a45c]/40 bg-[#c9a45c]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f3e3bb]">
              Contacto · Centro de arbitraje
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              Contáctanos
            </h1>
            <div className="mt-6 h-[3px] w-24 rounded-full bg-[#c9a45c]" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Estamos aquí para ayudarte con tus necesidades legales.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20" ref={ref}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <p className="home-kicker">Atención personalizada</p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-medium tracking-[-0.02em] text-[#14243e] sm:text-4xl lg:text-[2.75rem]">
              Solicita tu Consulta
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6a7f]">
              Contáctanos para una consulta personalizada y descubre cómo
              podemos resolver tus necesidades legales.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-full overflow-hidden rounded-3xl bg-[#0b1a33] p-8 sm:p-10">
                <p className="home-kicker text-[#ddc18a]">
                  Información de contacto
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-medium leading-tight text-white sm:text-3xl">
                  Información de Contacto
                </h3>
                <div className="mt-4 h-[3px] w-16 rounded-full bg-[#c9a45c]" />
                <div className="mt-8 space-y-6">
                  {contactMethods.map((method) => (
                    <div
                      key={method.title}
                      className="flex items-center gap-4"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c9a45c]/30 bg-[#c9a45c]/15">
                        <method.icon
                          className="h-6 w-6 text-[#e2c488]"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">
                          {method.title}
                        </h4>
                        <p className="text-sm text-white/65">{method.info}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c9a45c]/30 bg-[#c9a45c]/15">
                      <MapPin
                        className="h-6 w-6 text-[#e2c488]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Dirección</h4>
                      <p className="text-sm text-white/65">
                        Residencial San Francisco A&apos;-27, Huanchaco.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c9a45c]/30 bg-[#c9a45c]/15">
                      <Clock
                        className="h-6 w-6 text-[#e2c488]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        Horarios de Atención
                      </h4>
                      <p className="text-sm text-white/65">
                        Lunes - Viernes: 9:00 AM - 6:00 PM
                      </p>
                      <p className="text-sm text-white/65">
                        Sábados: 9:00 AM - 1:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full rounded-3xl border border-[#e5e8ed] bg-white shadow-[0_18px_48px_-28px_rgba(14,31,58,0.35)]">
                <CardContent className="p-8">
                  <p className="home-kicker">Escríbenos</p>
                  <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-medium leading-tight text-[#14243e] sm:text-3xl">
                    Formulario de Contacto
                  </h3>
                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="Nombre" className={labelClassName}>
                          Nombre Completo *
                        </label>
                        <Input
                          id="Nombre"
                          name="Nombre"
                          type="text"
                          required
                          value={formData.Nombre}
                          onChange={handleInputChange}
                          className={inputClassName}
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div>
                        <label htmlFor="Email" className={labelClassName}>
                          Email *
                        </label>
                        <Input
                          id="Email"
                          name="Email"
                          type="email"
                          required
                          value={formData.Email}
                          onChange={handleInputChange}
                          className={inputClassName}
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="Telefono" className={labelClassName}>
                          Teléfono *
                        </label>
                        <Input
                          id="Telefono"
                          name="Telefono"
                          type="tel"
                          value={formData?.Telefono}
                          onChange={handleInputChange}
                          className={inputClassName}
                          placeholder="+51 976 936 575"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="Servicio" className={labelClassName}>
                          Servicio de Interés
                        </label>

                        <Select
                          value={formData.Servicio}
                          id="Servicio"
                          name="Servicio"
                          onValueChange={(value) => {
                            setFormData({
                              ...formData,
                              Servicio: value,
                            });
                          }}
                        >
                          <SelectTrigger
                            className={`${inputClassName} w-full`}
                          >
                            <SelectValue placeholder="Seleccione una opción" />
                          </SelectTrigger>
                          <SelectContent className="border-[#e5e8ed] bg-white">
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
                      <label htmlFor="Mensaje" className={labelClassName}>
                        Mensaje *
                      </label>
                      <Textarea
                        id="Mensaje"
                        name="Mensaje"
                        required
                        value={formData?.Mensaje}
                        onChange={handleInputChange}
                        rows={4}
                        className={inputClassName}
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
                        className="w-full rounded-xl bg-[#c9a45c] py-3 text-lg font-bold text-[#0b1a33] hover:cursor-pointer hover:bg-[#e8cf8f] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#c9a45c]"
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
