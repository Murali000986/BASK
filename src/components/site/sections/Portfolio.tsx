import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  category: string;
  metric: string;
  image: string;
};

const PROJECTS: Project[] = [
  {
    title: "Lumen — Ecommerce Replatform",
    category: "Ecommerce · Shopify",
    metric: "+38% conversion · 2.4x AOV",
    image: "/portfolio/lumen.png",
  },
  {
    title: "Aurora — Spring Brand Campaign",
    category: "Campaign · Multi-channel",
    metric: "12M impressions · 4.8x ROAS",
    image: "/portfolio/aurora.png",
  },
  {
    title: "Northwind — Brand Film",
    category: "Video Production",
    metric: "1.8M views · Vimeo Staff Pick",
    image: "/portfolio/northwind.png",
  },
  {
    title: "Vertex — Ops Dashboard",
    category: "Software · SaaS",
    metric: "−42% time-to-insight",
    image: "/portfolio/vertex.png",
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
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
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
