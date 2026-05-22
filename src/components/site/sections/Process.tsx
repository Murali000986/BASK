import { motion } from "framer-motion";

const STEPS = [
  { n: "01", title: "Discovery", desc: "Workshops, audits and goal-setting to align on outcomes." },
  { n: "02", title: "Strategy", desc: "Positioning, narrative, channels and measurement plan." },
  { n: "03", title: "Design", desc: "Brand systems, UX flows and high-fidelity visual direction." },
  { n: "04", title: "Development", desc: "Engineering with senior teams on modern, scalable stacks." },
  { n: "05", title: "Launch", desc: "QA, performance, SEO and a calm, coordinated go-live." },
  { n: "06", title: "Growth", desc: "Iteration, experimentation and measurable compounding wins." },
];

export function Process() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-600 uppercase tracking-[0.16em] text-brand">How we work</p>
          <h2 className="mt-3 font-display text-[34px] font-700 leading-[1.08] tracking-[-0.02em] text-ink sm:text-[44px] text-balance">
            A calm, transparent process from kickoff to growth.
          </h2>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="relative mt-16 hidden md:block">
          <div className="absolute left-0 right-0 top-[34px] h-px bg-line" />
          <div className="grid grid-cols-6 gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative"
              >
                <span className="relative z-10 inline-flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-line bg-white font-display text-[15px] font-700 text-ink shadow-soft">
                  {s.n}
                </span>
                <h3 className="mt-5 font-display text-[17px] font-700 text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="mt-12 md:hidden">
          <ol className="relative space-y-6 border-l border-line pl-6">
            {STEPS.map((s) => (
              <li key={s.n} className="relative">
                <span className="absolute -left-[33px] top-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-[12px] font-700 text-ink shadow-soft">
                  {s.n}
                </span>
                <h3 className="font-display text-[17px] font-700 text-ink">{s.title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
