import NormativaSection from "@/components/NormativaSection";
import HeroCarousel from "../components/hero-carousel";
import ServicesSection from "../components/services-section";
import StatsSection from "../components/stats-section";
import LicenciaFuncionamiento from "@/components/ContactSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroCarousel />
      <ServicesSection />
      <StatsSection />
      <NormativaSection />
      <LicenciaFuncionamiento />
      {/* <TeamSection /> */}
    </main>
  );
}
