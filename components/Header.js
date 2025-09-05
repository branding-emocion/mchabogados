"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const legalServices = [
    { name: "Defensa Arbitral", href: "/AsesoriaLegal/DefensaArbitral" },
    {
      name: "Derecho Administrativo",
      href: "/AsesoriaLegal/DerechoAdministrativo",
    },
    { name: "Derecho Civil", href: "/AsesoriaLegal/DerechoCivil" },
    { name: "Derecho Penal", href: "/AsesoriaLegal/DefensaPenal" },
    {
      name: "Contratación Pública",
      href: "/AsesoriaLegal/ContratacionPublica",
    },
    {
      name: "Conciliación Extrajudicial",
      href: "/AsesoriaLegal/ConciliacionExtrajudicial",
    },
  ];

  const arbitrationCenter = [
    { name: "Presentación", href: "/CentroArbitraje/Presentacion" },

    { name: "Proceso Arbitral", href: "/CentroArbitraje/ProcesoArbitral" },
    {
      name: "Nuestros Reglamentos",
      href: "/CentroArbitraje/NuestrosReglamentos",
    },
    { name: "Nómina de Árbitros", href: "/CentroArbitraje/NominaDeArbitros" },
    { name: "Cláusula Arbitral", href: "/CentroArbitraje/ClausulaArbitral" },
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
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={"/"} className="flex flex-col hover:cursor-pointer">
                  {isScrolled ? (
                    <Image
                      src="/logo.png"
                      alt="logo"
                      width={281}
                      height={87}
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="/LogoBlanco.png"
                      alt="logo"
                      width={281}
                      height={87}
                      className="object-cover"
                    />
                  )}
                </Link>
              </motion.div>
            </motion.div>

            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      isScrolled ? "text-gray-700" : "text-white bg-transparent"
                    )}
                  >
                    Asesoría Legal
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-80 p-2">
                      {legalServices.map((service) => (
                        <Link key={service.name} href={service.href} passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">
                              {service.name}
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 bg-transparent",
                      isScrolled ? "text-gray-700" : "text-white "
                    )}
                  >
                    Centro de Arbitraje
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-80 p-2">
                      {arbitrationCenter.map((item) => (
                        <Link key={item.name} href={item.href} passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">
                              {item.name}
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/Laudos" passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isScrolled ? "text-gray-700 " : "text-white  "
                      )}
                    >
                      Banco de Laudos
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/NuestroEquipo" passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isScrolled ? "text-gray-700" : "text-white"
                      )}
                    >
                      Nuestro Equipo
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/Contacto" passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isScrolled ? "text-gray-700" : "text-white"
                      )}
                    >
                      Contacto
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Quote Button - Always visible */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Link href="/Cotizar">
                <Button
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:cursor-pointer ${
                    isScrolled
                      ? "bg-primary text-white hover:bg-primary/90 hover:shadow-xl"
                      : "bg-white text-primary hover:bg-white/90 hover:shadow-xl"
                  }`}
                >
                  Cotizar
                </Button>
              </Link>

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
    </>
  );
};

export { Header };
export default Header;
