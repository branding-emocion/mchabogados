import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import ServicesSection from "@/components/services-section";
import StatsSection from "@/components/stats-section";
import TeamSection from "@/components/team-section";
import ContactCTASection from "@/components/contact-cta-section";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroCarousel />
      <ServicesSection />
      <StatsSection />
      <TeamSection />
      <ContactCTASection />
    </main>
  );
}
