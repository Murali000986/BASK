import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function CTA() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-gradient-to-br from-[#EEF2FF] via-white to-[#E0E7FF] px-6 py-16 md:px-16 md:py-24">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(79,70,229,0.30),transparent)]" />
          <div className="absolute -left-20 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.25),transparent)]" />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-600 uppercase tracking-[0.16em] text-brand">Let's build</p>
            <h2 className="mt-3 font-display text-[36px] font-800 leading-[1.05] tracking-[-0.03em] text-ink sm:text-[52px] text-balance">
              Let's build something exceptional.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-soft md:text-[17.5px]">
              Tell us what you want to create, and we'll help turn it into a
              polished digital experience.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3.5 text-[15px] font-500 text-white shadow-soft transition-all hover:shadow-lift"
              >
                Book a Free Call
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-6 py-3.5 text-[15px] font-500 text-ink hover:bg-white"
              >
                See our work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
