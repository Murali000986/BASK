import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/sections/CTA";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About BASK — Full-Service Digital Agency for Web Dev & Marketing | bask.studio" },
      {
        name: "description",
        content:
          "Learn about BASK — a full-service digital agency specializing in web development, digital marketing, web service development and video production. Senior people, clear thinking, careful craft.",
      },
      {
        name: "keywords",
        content:
          "about BASK, BASK digital agency, BASK digital marketing agency, BASK web development team, BASK studio, BASK story, who is BASK, digital marketing agency India",
      },
      { property: "og:title", content: "About BASK — Full-Service Digital Agency" },
      { property: "og:description", content: "BASK is a full-service digital agency for web development, digital marketing and video production. Senior team, real results." },
      { property: "og:url", content: "https://bask.studio/about" },
      { property: "og:image", content: "https://bask.studio/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://bask.studio/about" }],
  }),
});

const VALUES = [
  { t: "Craft over output", d: "Fewer projects, made well. Detail at every layer." },
  { t: "Transparent operations", d: "Open boards, predictable timelines, no surprises." },
  { t: "Outcomes, not deliverables", d: "We measure work by what it moves for the business." },
  { t: "Senior by default", d: "Real practitioners on every project — no juniors hidden in the deck." },
];

const TEAM = [
  { name: "Aditya Iyer", role: "Founder · Strategy", image: "/team/aditya.png" },
  { name: "Meera Nair", role: "Design Director", image: "/team/meera.png" },
  { name: "Kunal Shetty", role: "Engineering Lead", image: "/team/kunal.png" },
  { name: "Tara Krishnan", role: "Head of Production", image: "/team/tara.png" },
];

const STATS = [
  { v: "2 yrs", l: "in business" },
  { v: "20+", l: "clients" },
  { v: "10+", l: "people on the team" },
  { v: "4.9★", l: "avg client rating" },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About"
        title="A small studio building things that matter."
        subtitle="We're a senior team of strategists, designers, editors and engineers, working with ambitious teams across the world."
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="text-[12px] font-600 uppercase tracking-[0.16em] text-brand">Our story</p>
            <h2 className="mt-3 font-display text-[32px] font-700 tracking-[-0.02em] text-ink sm:text-[40px] text-balance">
              Started as a two-person studio in 2024. Same care, more capability.
            </h2>
            <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-ink-soft">
              <p>
                BASK began as a small design partnership working with
                early-stage founders. Two years on, we're a multi-disciplinary
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
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface-muted">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
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
