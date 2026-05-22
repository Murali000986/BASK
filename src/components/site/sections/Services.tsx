import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Megaphone,
  Video,
  Film,
  Code2,
  Cpu,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "Performance campaigns, SEO and content engines that bring qualified attention to your brand.",
    tag: "Growth",
  },
  {
    icon: Video,
    title: "Video Production",
    desc: "End-to-end production for brand films, product reels and ad creative — directed, shot, finished.",
    tag: "Studio",
  },
  {
    icon: Film,
    title: "Video Editing",
    desc: "Cinematic editing, color, sound design and motion polish for performance-grade output.",
    tag: "Post",
  },
  {
    icon: Code2,
    title: "Web Development",
    desc: "Marketing sites and product surfaces built with modern stacks — fast, accessible, measurable.",
    tag: "Engineering",
  },
  {
    icon: Cpu,
    title: "Software Development",
    desc: "Internal tools, dashboards and SaaS products — designed and shipped by a senior team.",
    tag: "Product",
  },
  {
    icon: ShoppingBag,
    title: "Ecommerce Websites",
    desc: "Conversion-led storefronts on Shopify, Next.js and headless stacks built to scale revenue.",
    tag: "Commerce",
  },
] as const;

export function Services() {
  return (
    <section id="services" className="section-y">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-[12px] font-600 uppercase tracking-[0.16em] text-brand">What we do</p>
            <h2 className="mt-3 font-display text-[34px] font-700 leading-[1.08] tracking-[-0.02em] text-ink sm:text-[44px] lg:text-[48px] text-balance">
              Complete digital solutions under one roof.
            </h2>
          </div>
          <p className="max-w-md text-[15.5px] leading-relaxed text-ink-muted">
            Strategy, design, content and engineering — one senior team, one
            operating system, one outcome: a brand that ships and grows.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <Link
                to="/services"
                className="group block h-full rounded-2xl border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-line bg-white px-2.5 py-0.5 text-[11px] font-500 uppercase tracking-wider text-ink-muted">
                    {s.tag}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[20px] font-700 tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{s.desc}</p>
                <div className="mt-6 flex items-center text-[13.5px] font-500 text-brand">
                  Learn more
                  <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
