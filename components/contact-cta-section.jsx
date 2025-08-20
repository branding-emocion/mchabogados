"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone, Send } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log("Formulario enviado:", formData);
    // Reset form
    setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">CONTÁCTANOS</h2>
        <p className="text-muted-foreground text-lg">
          ¡Visítanos en nuestras oficinas!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Información de contacto */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="h-5 w-5 text-primary" />
                NUESTRA DIRECCIÓN
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground font-medium">
                Residencial San Francisco A'-27, Huanchaco
              </p>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:mchabogados@legalmch.com"
                  className="text-primary hover:underline font-medium"
                >
                  mchabogados@legalmch.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Phone className="h-5 w-5 text-primary" />
                  Teléfono
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="tel:976936575"
                  className="text-primary hover:underline font-medium"
                >
                  976-936-575
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Formulario de contacto */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Consultas Generales</CardTitle>
            <p className="text-muted-foreground">
              Por favor completa el siguiente formulario:
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre completo *</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Tu número de teléfono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensaje">Mensaje *</Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Describe tu consulta o mensaje..."
                  className="min-h-[120px] resize-none"
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Enviar Consulta
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
