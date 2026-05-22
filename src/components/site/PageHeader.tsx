import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaTo?: string;
};

export function PageHeader({ eyebrow, title, subtitle, ctaLabel, ctaTo }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 -z-10 mesh-bg" />
      <div className="container-page pt-20 pb-16 md:pt-28 md:pb-20">
        <p className="text-[12px] font-600 uppercase tracking-[0.16em] text-brand">{eyebrow}</p>
        <div className="mt-3 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <h1 className="font-display text-[40px] font-800 leading-[1.05] tracking-[-0.03em] text-ink sm:text-[56px] lg:text-[64px] text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[16px] leading-relaxed text-ink-muted md:text-[17.5px]">{subtitle}</p>
          )}
        </div>
        {ctaLabel && ctaTo && (
          <div className="mt-8">
            <Link
              to={ctaTo}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-3 text-[14.5px] font-500 text-white hover:shadow-lift"
            >
              {ctaLabel} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
