import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Northbeam ran our replatform with calm precision. We launched faster than planned and revenue is up almost 40%.",
    name: "Priya Raghavan",
    role: "VP Marketing, Lumen",
    initials: "PR",
  },
  {
    quote:
      "Their team operates more like an in-house product squad than an agency. Strategy, design and engineering in one room.",
    name: "Arjun Mehta",
    role: "Founder, Vertex",
    initials: "AM",
  },
  {
    quote:
      "The brand film became the centerpiece of our quarter. The craft is genuinely cinematic.",
    name: "Sara Iqbal",
    role: "Head of Brand, Aurora",
    initials: "SI",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[i];

  return (
    <section className="section-y bg-surface-muted/60">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-600 uppercase tracking-[0.16em] text-brand">Client voices</p>
          <h2 className="mt-3 font-display text-[32px] font-700 leading-[1.1] tracking-[-0.02em] text-ink sm:text-[40px] text-balance">
            People we've worked with, in their own words.
          </h2>
        </div>

        <div className="relative mx-auto mt-12 max-w-3xl">
          <div className="rounded-3xl border border-line bg-white p-8 shadow-card md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-display text-[22px] font-600 leading-[1.45] tracking-tight text-ink md:text-[26px] text-pretty">
                  “{t.quote}”
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#4F46E5] to-[#2563EB] font-display text-[13px] font-700 text-white">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-[14.5px] font-600 text-ink">{t.name}</p>
                    <p className="text-[13px] text-ink-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Show testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-8 bg-ink" : "w-2 bg-line hover:bg-ink-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
