"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    servicios: [
      {
        name: "Arbitraje en contratación pública",
        href: "/AsesoriaLegal/ContratacionPublica",
      },
      {
        name: "Arbitraje de emergencia",
        href: "/AsesoriaLegal/ArbitrajeEmergencia",
      },
      {
        name: "Arbitraje entre privados",
        href: "/AsesoriaLegal/EntrePrivados",
      },
      { name: "Arbitraje Express", href: "/AsesoriaLegal/ArbitrajeExpress" },
    ],
    empresa: [
      { name: "Nuestro Equipo", href: "/NuestroEquipo" },
      { name: "Banco de Laudos", href: "/Laudos" },
      { name: "Contacto", href: "/Contacto" },
    ],
  };

  const socialLinks = [
    { name: "LinkedIn", href: "#", icon: "💼" },
    { name: "Facebook", href: "#", icon: "📘" },
    { name: "Twitter", href: "#", icon: "🐦" },
    { name: "Instagram", href: "#", icon: "📷" },
  ];

  return (
    <footer className="bg-[#080f26] text-white">
      <div className="hairline-oro h-[3px] w-full opacity-80" />
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center ">
          {/* Company Info */}
          <div className="">
            <motion.div
              className="flex items-center space-x-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="/LogoBlanco.png"
                alt="logo"
                width={281}
                height={87}
                className="object-cover"
              />
            </motion.div>

            {/* <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </motion.div> */}
          </div>

          {/* Services Links */}
          <div>
            <motion.h3
              className="text-lg font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Servicios
            </motion.h3>
            <div className="w-10 h-0.5 bg-gradient-to-r from-[#c9a45c] to-transparent rounded-full mb-5" />
            <ul className="space-y-3">
              {footerLinks.servicios.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#e6c886] transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <motion.h3
              className="text-lg font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Empresa
            </motion.h3>
            <div className="w-10 h-0.5 bg-gradient-to-r from-[#c9a45c] to-transparent rounded-full mb-5" />
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#e6c886] transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} MCH Abogados. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-sm">
            Diseñado con ❤️ para brindar la mejor experiencia
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
