import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import Main from "./Main";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "MCH Abogados - Asesoría Legal Especializada",
    template: "%s | MCH Abogados",
  },
  description:
    "Centro de Arbitraje Especializado en Contratación Pública, enfocado en la resolución de controversias de forma eficaz.",
  keywords: [
    "arbitraje emergencia",
    "arbitraje express",
    "arbitraje comercial",
    "arbitraje contratacion publica",
    "arbitraje entre privados",
    "conciliación extrajudicial",
    "defensa arbitral",
    "estudio jurídico",
    "MCH Abogados",
    "centro de arbitraje",
  ],
  authors: [{ name: "MCH Abogados S.A.C." }],
  creator: "MCH Abogados S.A.C.",
  publisher: "MCH Abogados S.A.C.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mchabogados.pe"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MCH Abogados - Asesoría Legal Especializada en Perú",
    description:
      "Estudio jurídico especializado en arbitraje, derecho administrativo, penal y conciliación extrajudicial. Más de 10 años de experiencia.",
    url: "https://mchabogados.pe",
    siteName: "MCH Abogados",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/QuienesSomos1.jpg",
        width: 1200,
        height: 630,
        alt: "MCH Abogados - Asesoría Legal Especializada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MCH Abogados - Asesoría Legal Especializada",
    description:
      "Estudio jurídico especializado en arbitraje, derecho administrativo, penal y conciliación extrajudicial.",
    images: ["/QuienesSomos1.jpg"],
  },

  category: "Legal Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Main>{children}</Main>

        <Toaster />
      </body>
    </html>
  );
}
