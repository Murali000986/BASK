import { motion } from "framer-motion";
import { Compass, LayoutGrid, Rocket, LineChart } from "lucide-react";

const BENEFITS = [
  { icon: Compass, title: "Strategy-first execution", desc: "Every project starts with a real plan — positioning, narrative, KPIs and measurement, before pixels." },
  { icon: LayoutGrid, title: "Modern design system", desc: "We design with systems, not screens. Components, tokens and rules that scale with the brand." },
  { icon: Rocket, title: "Fast delivery workflow", desc: "Tight rituals, no agency theater. Weekly demos, transparent boards and predictable timelines." },
  { icon: LineChart, title: "Growth-focused results", desc: "Work is measured by what it moves — pipeline, revenue and retention. Not awards alone." },
];

export function WhyChooseUs() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[12px] font-600 uppercase tracking-[0.16em] text-brand">Why teams choose us</p>
            <h2 className="mt-3 font-display text-[34px] font-700 leading-[1.08] tracking-[-0.02em] text-ink sm:text-[44px] text-balance">
              A senior team that thinks in outcomes, not deliverables.
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink-muted">
              We're a small, deliberate studio — strategists, designers and
              engineers who collaborate as one team and care about the result.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-2xl border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-soft text-brand">
                  <b.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[18px] font-700 text-ink">{b.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
