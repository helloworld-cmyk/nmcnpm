import { SiteShell } from "@/components/layout/site-shell";
import { CtaSection } from "./_components/cta-section";
import { FaqSection } from "./_components/faq-section";
import { FeaturesSection } from "./_components/features-section";
import { FleetSection } from "./_components/fleet-section";
import { Hero } from "./_components/hero";
import { HomeMotion } from "./_components/home-motion";
import { RoutesSection } from "./_components/routes-section";
import { StepsSection } from "./_components/steps-section";
import { TestimonialsSection } from "./_components/testimonials-section";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <FleetSection />
      <RoutesSection />
      <StepsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <HomeMotion />
    </SiteShell>
  );
}