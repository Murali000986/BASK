import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  category: string;
  metric: string;
  cover: React.ReactNode;
};

const PROJECTS: Project[] = [
  {
    title: "Lumen — Ecommerce Replatform",
    category: "Ecommerce · Shopify",
    metric: "+38% conversion · 2.4x AOV",
    cover: (
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_30%,#c7d2fe,transparent_60%),radial-gradient(60%_60%_at_80%_70%,#bae6fd,transparent_60%)]">
        <div className="absolute inset-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-card" />
        <div className="absolute left-8 top-8 right-8 h-6 rounded-md bg-surface-muted" />
        <div className="absolute left-8 top-20 right-8 grid grid-cols-3 gap-3">
          <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-[#a5b4fc] to-[#818cf8]" />
          <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-[#fbcfe8] to-[#f472b6]" />
          <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-[#bbf7d0] to-[#34d399]" />
        </div>
      </div>
    ),
  },
  {
    title: "Aurora — Spring Brand Campaign",
    category: "Campaign · Multi-channel",
    metric: "12M impressions · 4.8x ROAS",
    cover: (
      <div className="absolute inset-0 bg-gradient-to-br from-[#fde68a] via-[#fda4af] to-[#c4b5fd]">
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_30%_30%,rgba(255,255,255,0.55),transparent_60%)]" />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="font-display text-[28px] font-800 leading-none text-white drop-shadow">Bloom into Spring.</p>
        </div>
      </div>
    ),
  },
  {
    title: "Northwind — Brand Film",
    category: "Video Production",
    metric: "1.8M views · Vimeo Staff Pick",
    cover: (
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_70%_30%,rgba(79,70,229,0.45),transparent_70%)]" />
        <div className="absolute inset-x-6 bottom-6 flex items-center justify-between text-white/80">
          <p className="text-[11px] font-500 uppercase tracking-[0.18em]">Reel · 02:14</p>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink">
            <span className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[10px] border-y-transparent border-l-ink" />
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Vertex — Ops Dashboard",
    category: "Software · SaaS",
    metric: "−42% time-to-insight",
    cover: (
      <div className="absolute inset-0 bg-[#0f172a]">
        <div className="absolute inset-4 rounded-2xl bg-[#0b1224] p-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
            <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
            <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-lg bg-white/5 p-3">
                <div className="h-2 w-10 rounded bg-white/30" />
                <div className="mt-2 h-3 w-14 rounded bg-white/70" />
              </div>
            ))}
          </div>
          <div className="mt-3 h-24 rounded-lg bg-gradient-to-tr from-[#4F46E5]/30 to-transparent" />
        </div>
      </div>
    ),
  },
];

export function Portfolio() {
  return (
    <section id="work" className="section-y bg-surface-muted/60">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-[12px] font-600 uppercase tracking-[0.16em] text-brand">Selected work</p>
            <h2 className="mt-3 font-display text-[34px] font-700 leading-[1.08] tracking-[-0.02em] text-ink sm:text-[44px] lg:text-[48px] text-balance">
              Recent projects we're proud of.
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-[14px] font-500 text-ink hover:bg-white/80"
          >
            View all work <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
                  {p.cover}
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(15,23,42,0.18))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="flex items-start justify-between gap-4 p-6">
                <div>
                  <p className="text-[12px] font-500 uppercase tracking-wider text-ink-muted">{p.category}</p>
                  <h3 className="mt-1.5 font-display text-[20px] font-700 text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-[13.5px] text-ink-soft">{p.metric}</p>
                </div>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-colors group-hover:border-brand/40 group-hover:bg-soft group-hover:text-brand">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
