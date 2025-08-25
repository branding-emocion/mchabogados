"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, MessageCircle, Phone } from "lucide-react"; // Added icons for floating buttons

export default function ContratacionPublica() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const legalServices = [
    { name: "Defensa Arbitral", href: "/AsesoriaLegal/proceso-arbitral" }, // Updated to specific page
    {
      name: "Derecho Administrativo",
      href: "/AsesoriaLegal/derecho-administrativo",
    }, // Updated to specific page
    { name: "Derecho Civil", href: "/AsesoriaLegal/derecho-civil" }, // Updated to specific page
    { name: "Derecho Penal", href: "/AsesoriaLegal/derecho-penal" }, // Updated to specific page
    {
      name: "Contratación Pública",
      href: "/AsesoriaLegal/contratacion-publica",
    }, // Updated to specific page
    {
      name: "Conciliación Extrajudicial",
      href: "/AsesoriaLegal/conciliacion-extrajudicial",
    }, // Updated to specific page
  ];

  const navItems = [
    { name: "Inicio", href: "/" },
    {
      name: "Asesoría Legal",
      href: "/AsesoriaLegal",
      hasDropdown: true,
      dropdownItems: legalServices,
    },
    { name: "Centro de Arbitraje", href: "/centro-arbitraje" },
    { name: "Nuestro Equipo", href: "/nuestro-equipo" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">MCH</span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-lg font-serif font-bold ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  MCH
                </span>
                <span
                  className={`text-sm ${
                    isScrolled ? "text-gray-600" : "text-white/90"
                  }`}
                >
                  ABOGADOS
                </span>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.a
                    href={item.href}
                    className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                      isScrolled ? "text-gray-700" : "text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                    )}
                  </motion.a>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.name && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.dropdownItems?.map(
                          (dropdownItem, dropdownIndex) => (
                            <motion.a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: dropdownIndex * 0.05,
                              }}
                            >
                              {dropdownItem.name}
                            </motion.a>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Quote Button - Always visible */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Button
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg ${
                  isScrolled
                    ? "bg-primary text-white hover:bg-primary/90 hover:shadow-xl"
                    : "bg-white text-primary hover:bg-white/90 hover:shadow-xl"
                }`}
                onClick={() => (window.location.href = "/contacto")}
              >
                Cotizar
              </Button>

              {/* Mobile Menu Button */}
              <motion.button
                className={`lg:hidden p-2 ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-4">
        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/51999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.a>

        {/* Contact Button */}
        <motion.a
          href="/contacto"
          className="w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Phone className="w-6 h-6" />
        </motion.a>
      </div>
    </>
  );
}
