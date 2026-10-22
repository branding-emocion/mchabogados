"use client";

import { motion } from "framer-motion";

/**
 * Aparecer — entrada suave al hacer scroll (una sola vez).
 * Uso: <Aparecer className="...">contenido</Aparecer>
 */
export function Aparecer({
  children,
  className,
  retraso = 0,
  distancia = 28,
  ...rest
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distancia }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: retraso, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Escalonar — contenedor que anima a sus <Elemento> hijos uno tras otro.
 * Uso: <Escalonar className="grid ..."><Elemento>…</Elemento></Escalonar>
 */
export function Escalonar({ children, className, intervalo = 0.1, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        oculto: {},
        visible: { transition: { staggerChildren: intervalo } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Elemento — hijo animable dentro de <Escalonar>. */
export function Elemento({ children, className, ...rest }) {
  return (
    <motion.div
      className={className}
      variants={{
        oculto: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: "easeOut" },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
