import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/sections/CTA";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: "Work — Northbeam Digital Agency Chennai" },
      { name: "description", content: "Selected work from Northbeam — ecommerce, brand campaigns, video production, and software dashboards." },
    ],
  }),
});

const CATEGORIES = ["All", "Web", "Ecommerce", "Campaign", "Video", "Software"] as const;

type Item = { title: string; cat: typeof CATEGORIES[number]; metric: string; gradient: string };

const ITEMS: Item[] = [
  { title: "Lumen — Ecommerce Replatform", cat: "Ecommerce", metric: "+38% conversion", gradient: "from-[#c7d2fe] to-[#bae6fd]" },
  { title: "Aurora — Spring Campaign", cat: "Campaign", metric: "12M impressions", gradient: "from-[#fde68a] to-[#fda4af]" },
  { title: "Northwind — Brand Film", cat: "Video", metric: "1.8M views", gradient: "from-[#0f172a] to-[#1e293b]" },
  { title: "Vertex — Ops Dashboard", cat: "Software", metric: "−42% time-to-insight", gradient: "from-[#0b1224] to-[#1e293b]" },
  { title: "Helios — Marketing Site", cat: "Web", metric: "98 Lighthouse", gradient: "from-[#bbf7d0] to-[#a5f3fc]" },
  { title: "Mosaic — D2C Launch", cat: "Ecommerce", metric: "₹2.1Cr in Q1", gradient: "from-[#fbcfe8] to-[#c4b5fd]" },
  { title: "Quanta — Product Reel", cat: "Video", metric: "Used in 14 markets", gradient: "from-[#1e293b] to-[#4F46E5]" },
  { title: "Parallel — Internal Suite", cat: "Software", metric: "11 modules shipped", gradient: "from-[#e0e7ff] to-[#c7d2fe]" },
];

function PortfolioPage() {
  const [active, setActive] = useState<typeof CATEGORIES[number]>("All");
  const filtered = active === "All" ? ITEMS : ITEMS.filter((i) => i.cat === active);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Selected work"
        title="Brands we've helped take a step forward."
        subtitle="A small slice of recent projects across ecommerce, brand, video and software."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-2 text-[13.5px] font-500 transition-colors ${
                  active === c
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-ink-soft hover:bg-surface-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {filtered.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div className={`relative aspect-[16/10] bg-gradient-to-br ${p.gradient}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_30%_30%,rgba(255,255,255,0.45),transparent_60%)]" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1 text-[11.5px] font-500 uppercase tracking-wider text-ink backdrop-blur">
                    {p.cat}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-display text-[20px] font-700 text-ink">{p.title}</h3>
                    <p className="mt-1.5 text-[13.5px] text-ink-soft">{p.metric}</p>
                  </div>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft group-hover:border-brand/40 group-hover:bg-soft group-hover:text-brand">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </SiteLayout>
  );
}
