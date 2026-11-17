import dynamic from "next/dynamic";
import HeroCarousel from "../components/hero-carousel";
import ServicesSection from "../components/services-section";

// Debajo del fold: dividir en chunks separados para no bloquear el LCP
const ResourcesSection = dynamic(() => import("../components/stats-section"), {
  loading: () => <div aria-hidden="true" className="min-h-[420px] bg-white" />,
});
const NormativaSection = dynamic(() => import("@/components/NormativaSection"), {
  loading: () => <div aria-hidden="true" className="min-h-[420px] bg-white" />,
});
const LicenciaFuncionamiento = dynamic(() => import("@/components/ContactSection"), {
  loading: () => <div aria-hidden="true" className="min-h-[300px] bg-white" />,
});

export default function HomePage() {
  return (
    <main className="home-page min-h-screen">
      <HeroCarousel />
      <ServicesSection />
      <ResourcesSection />
      <NormativaSection />
      <LicenciaFuncionamiento />
    </main>
  );
}
