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
      { title: "Services — Northbeam Digital Agency Chennai" },
      { name: "description", content: "Digital marketing, video production, web & software development, and ecommerce websites — built by a senior studio in Chennai." },
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
  { q: "Do you work with international clients?", a: "Yes. We're based in Chennai and work with teams across India, the UK, EU and US — async-friendly with weekly demos." },
  { q: "Can you join an existing team?", a: "Yes. We embed cleanly with in-house product, brand and marketing teams when needed." },
  { q: "How do you price projects?", a: "Fixed-scope for builds, monthly retainers for growth and media work. We share clear estimates after discovery." },
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
                <span className="text-[12px] font-500 uppercase tracking-wider text-ink-muted">From ₹1.2L</span>
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
