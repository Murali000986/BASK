import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/sections/CTA";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Northbeam Digital Agency Chennai" },
      { name: "description", content: "A small, senior studio in Chennai building digital experiences for modern brands." },
    ],
  }),
});

const VALUES = [
  { t: "Craft over output", d: "Fewer projects, made well. Detail at every layer." },
  { t: "Transparent operations", d: "Open boards, predictable timelines, no surprises." },
  { t: "Outcomes, not deliverables", d: "We measure work by what it moves for the business." },
  { t: "Senior by default", d: "Real practitioners on every project — no juniors hidden in the deck." },
];

const TEAM = [
  { name: "Aditya Iyer", role: "Founder · Strategy", initials: "AI", tint: "from-[#4F46E5] to-[#2563EB]" },
  { name: "Meera Nair", role: "Design Director", initials: "MN", tint: "from-[#0EA5E9] to-[#22D3EE]" },
  { name: "Kunal Shetty", role: "Engineering Lead", initials: "KS", tint: "from-[#7C3AED] to-[#4F46E5]" },
  { name: "Tara Krishnan", role: "Head of Production", initials: "TK", tint: "from-[#F472B6] to-[#FB7185]" },
];

const STATS = [
  { v: "9 yrs", l: "in business" },
  { v: "120+", l: "brands shipped" },
  { v: "18", l: "people on the team" },
  { v: "4.9★", l: "avg client rating" },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About"
        title="A small studio building things that matter."
        subtitle="We're a senior team of strategists, designers, editors and engineers based in Chennai, working with ambitious teams across India and the world."
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="text-[12px] font-600 uppercase tracking-[0.16em] text-brand">Our story</p>
            <h2 className="mt-3 font-display text-[32px] font-700 tracking-[-0.02em] text-ink sm:text-[40px] text-balance">
              Started as a two-person studio in 2017. Same care, more capability.
            </h2>
            <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-ink-soft">
              <p>
                Northbeam began as a small design partnership working with
                early-stage founders. Nine years on, we're a multi-disciplinary
                studio — but the operating principles are the same: senior
                people, clear thinking, careful craft.
              </p>
              <p>
                Today we partner with consumer brands, SaaS companies and
                ambitious founders to design, build and grow their digital
                presence — websites, software, video and campaigns.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div key={s.l} className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                <p className="font-display text-[34px] font-800 leading-none tracking-[-0.02em] text-ink">{s.v}</p>
                <p className="mt-2 text-[13px] text-ink-muted">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface-muted/60">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-600 uppercase tracking-[0.16em] text-brand">Values</p>
            <h2 className="mt-3 font-display text-[32px] font-700 tracking-[-0.02em] text-ink sm:text-[40px] text-balance">
              How we work, said simply.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.t}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-line bg-white p-6 shadow-soft"
              >
                <h3 className="font-display text-[17px] font-700 text-ink">{v.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-600 uppercase tracking-[0.16em] text-brand">The team</p>
            <h2 className="mt-3 font-display text-[32px] font-700 tracking-[-0.02em] text-ink sm:text-[40px] text-balance">
              People you'll actually work with.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <div key={m.name} className="rounded-3xl border border-line bg-white p-5 shadow-soft">
                <div className={`relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br ${m.tint}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_30%_30%,rgba(255,255,255,0.4),transparent_60%)]" />
                  <div className="absolute inset-0 flex items-center justify-center font-display text-[40px] font-800 text-white/90">
                    {m.initials}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-display text-[16px] font-700 text-ink">{m.name}</p>
                  <p className="text-[13px] text-ink-muted">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </SiteLayout>
  );
}
