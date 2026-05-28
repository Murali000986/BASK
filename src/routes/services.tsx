import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/sections/CTA";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Megaphone, Video, Film, Code2, Cpu, ShoppingBag, Check,
} from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "BASK Services — Web Development, Digital Marketing & Web Service Dev | bask.studio" },
      {
        name: "description",
        content:
          "BASK offers professional web development, digital marketing, web service development, video production, software development and ecommerce solutions. Senior-level work. Real results.",
      },
      {
        name: "keywords",
        content:
          "BASK digital marketing, BASK web service dev, BASK web service development, BASK web development, BASK services, BASK agency services, web development service, digital marketing agency, web service development company, software development, ecommerce development, SEO service, video production",
      },
      { property: "og:title", content: "BASK Services — Web Dev, Digital Marketing & Web Services" },
      { property: "og:description", content: "BASK delivers web development, digital marketing, web service dev, video production and software development. Helping modern brands grow worldwide." },
      { property: "og:url", content: "https://bask.studio/services" },
      { property: "og:image", content: "https://bask.studio/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://bask.studio/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What digital marketing services does BASK offer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "BASK offers a full range of digital marketing services including SEO, social media marketing, paid advertising (Meta, Google, LinkedIn), content marketing, email marketing and brand strategy.",
              },
            },
            {
              "@type": "Question",
              name: "Does BASK do web service development?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. BASK provides end-to-end web service development including REST APIs, full-stack web applications, SaaS products, internal tools and custom software solutions built with modern stacks.",
              },
            },
            {
              "@type": "Question",
              name: "What web development services does BASK provide?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "BASK builds marketing websites, web apps and product surfaces using React, Next.js and TanStack. We focus on performance, Core Web Vitals and conversion-led design.",
              },
            },
            {
              "@type": "Question",
              name: "How do you price BASK projects?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "BASK works on fixed-scope engagements for builds and monthly retainers for ongoing digital marketing. Get in touch at bask.studio/contact for a tailored estimate.",
              },
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Digital Marketing and Web Service Development",
          provider: {
            "@type": "Organization",
            name: "BASK",
            url: "https://bask.studio",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "BASK Services",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "BASK Digital Marketing" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "BASK Web Service Development" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "BASK Web Development" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "BASK Video Production" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "BASK Software Development" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "BASK Ecommerce Development" } },
            ],
          },
        }),
      },
    ],
  }),
});

const SERVICES = [
  { icon: Megaphone, title: "Digital Marketing", desc: "Performance marketing, content and SEO programs that compound.", points: ["Paid media · Meta, Google, LinkedIn", "SEO & content systems", "Lifecycle & CRM"] },
  { icon: Video, title: "Video Production", desc: "End-to-end production for brand films and ad creative.", points: ["Direction & pre-production", "On-set production", "Color, sound, finishing"] },
  { icon: Film, title: "Video Editing", desc: "Editorial, motion and post for performance-grade output.", points: ["Edit & motion", "Subtitling & versioning", "Performance variants"] },
  { icon: Code2, title: "Web Development", desc: "Marketing sites and product surfaces built with modern stacks.", points: ["React, Next.js, TanStack", "Headless CMS", "Core Web Vitals first"] },
  { icon: Cpu, title: "Software Development", desc: "Internal tools, dashboards and SaaS products built to scale.", points: ["Product discovery", "Design systems", "API & data architecture"] },
  { icon: ShoppingBag, title: "Ecommerce Websites", desc: "Conversion-led storefronts on Shopify and headless stacks.", points: ["Shopify · Hydrogen", "Headless commerce", "CRO programs"] },
];

const FAQS = [
  { q: "What does a typical engagement look like?", a: "Most engagements start with a 2-week discovery, followed by a fixed-scope build (4–12 weeks) and an optional growth retainer after launch." },
  { q: "Do you work with international clients?", a: "Yes. We work with teams across the UK, EU and US — async-friendly with weekly demos." },
  { q: "Can you join an existing team?", a: "Yes. We embed cleanly with in-house product, brand and marketing teams when needed." },
  { q: "How do you price projects?", a: "We work on fixed-scope engagements for builds and retainers for ongoing growth work. Get in touch and we'll share a tailored estimate after a discovery call." },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Services"
        title="One studio. Everything a modern brand needs."
        subtitle="Strategy, design, content and engineering — all under one roof. Senior teams, clear processes, measurable outcomes."
      />

      <section className="section-y">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="rounded-3xl border border-line bg-surface p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-soft text-brand">
                  <s.icon className="h-5 w-5" />
                </span>

              </div>
              <h3 className="mt-6 font-display text-[22px] font-700 text-ink">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{s.desc}</p>
              <ul className="mt-5 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[14px] text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 text-brand" /> {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-y bg-surface-muted/60">
        <div className="container-page mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-[12px] font-600 uppercase tracking-[0.16em] text-brand">FAQ</p>
            <h2 className="mt-3 font-display text-[32px] font-700 tracking-[-0.02em] text-ink sm:text-[40px] text-balance">
              Answers before you ask.
            </h2>
          </div>
          <div className="mt-10 rounded-2xl border border-line bg-white p-2 shadow-soft">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`q-${i}`} className="border-b last:border-b-0">
                  <AccordionTrigger className="px-4 py-5 text-left text-[15.5px] font-600 text-ink hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5 text-[14.5px] leading-relaxed text-ink-muted">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <CTA />
    </SiteLayout>
  );
}
