import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/sections/Hero";
import { TrustedLogos } from "@/components/site/sections/TrustedLogos";
import { Services } from "@/components/site/sections/Services";
import { Showreel } from "@/components/site/sections/Showreel";
import { Process } from "@/components/site/sections/Process";
import { CustomerStories } from "@/components/site/sections/CustomerStories";
import { WhyChooseUs } from "@/components/site/sections/WhyChooseUs";
import { Testimonials } from "@/components/site/sections/Testimonials";
import { CTA } from "@/components/site/sections/CTA";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BASK — Digital Agency | Web Development, Digital Marketing & Web Service Dev" },
      {
        name: "description",
        content:
          "BASK is a full-service digital agency. We build websites, run digital marketing campaigns, develop web services and produce videos that help modern brands grow worldwide.",
      },
      {
        name: "keywords",
        content:
          "BASK, BASK studio, BASK digital marketing, BASK web service dev, BASK web service development, BASK web dev, BASK digital, BASK agency, BASK digital agency, digital marketing, web development, web service development, video production, software development, ecommerce website, brand design, SEO services",
      },
      { property: "og:image", content: "https://bask.studio/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: "https://bask.studio/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://bask.studio" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "BASK",
          url: "https://bask.studio",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://bask.studio/?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
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
      <CustomerStories />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </SiteLayout>
  );
}
