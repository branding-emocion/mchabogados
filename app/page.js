import ContactSection from "../components/ContactSection";
import HeroCarousel from "../components/hero-carousel";
import ServicesSection from "../components/services-section";
import StatsSection from "../components/stats-section";
import TeamSection from "../components/team-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroCarousel />
      <ServicesSection />
      <StatsSection />
      <TeamSection />
      <ContactSection />{" "}
    </main>
  );
}
