import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/sections/Hero";
import { TrustedLogos } from "@/components/site/sections/TrustedLogos";
import { Services } from "@/components/site/sections/Services";
import { Showreel } from "@/components/site/sections/Showreel";
import { Process } from "@/components/site/sections/Process";
import { Portfolio } from "@/components/site/sections/Portfolio";
import { WhyChooseUs } from "@/components/site/sections/WhyChooseUs";
import { Testimonials } from "@/components/site/sections/Testimonials";
import { CTA } from "@/components/site/sections/CTA";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Northbeam — Digital Agency in Chennai" },
      {
        name: "description",
        content:
          "We build digital experiences — websites, campaigns, videos and software — that help modern brands grow.",
      },
    ],
  }),
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <TrustedLogos />
      <Services />
      <Showreel />
      <Process />
      <Portfolio />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </SiteLayout>
  );
}
