import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Play,
  TrendingUp,
  Sparkles,
  Globe,
  BarChart3,
  Layers,
} from "lucide-react";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-bg" />
      <div className="absolute inset-0 -z-10 grid-faint" />

      <div className="container-page pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1.5 text-[12.5px] font-500 text-ink-soft backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              Digital Growth Partner · Chennai
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 font-display text-[44px] font-800 leading-[1.04] tracking-[-0.03em] text-ink text-balance sm:text-[56px] lg:text-[72px]"
            >
              We build{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
                  digital experiences
                </span>
                <svg
                  className="absolute -bottom-2 left-0 h-2 w-full text-brand/40"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M2 5 Q 50 1, 100 4 T 198 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              that help brands grow.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-ink-muted md:text-[18px]"
            >
              A full-service digital studio creating websites, campaigns, videos
              and software that help modern brands scale with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-3 text-[14.5px] font-500 text-white shadow-soft transition-all hover:shadow-lift"
              >
                Start a Project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-5 py-3 text-[14.5px] font-500 text-ink transition-colors hover:bg-surface-muted"
              >
                <Play className="h-3.5 w-3.5 fill-ink" /> View Our Work
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] text-ink-muted"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["#c7d2fe", "#fecaca", "#bbf7d0", "#fde68a"].map((c) => (
                    <span key={c} className="h-6 w-6 rounded-full ring-2 ring-white" style={{ background: c }} />
                  ))}
                </div>
                <span><span className="font-600 text-ink">120+ brands</span> trust us</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-500">★★★★★</span>
                <span><span className="font-600 text-ink">4.9</span> avg client rating</span>
              </div>
            </motion.div>
          </div>

          {/* Right visual */}
          <HeroVisual reduce={!!reduce} />
        </div>
      </div>
    </section>
  );
}

function HeroVisual({ reduce }: { reduce: boolean }) {
  const float = (delay = 0, y = 6): any =>
    reduce
      ? {}
      : {
          animate: { y: [0, -y, 0] },
          transition: { duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay },
        };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative mx-auto w-full max-w-[640px]"
    >
      {/* Soft glow */}
      <div className="absolute -inset-10 -z-10 bg-[radial-gradient(60%_60%_at_60%_40%,rgba(79,70,229,0.18),transparent_60%)] blur-2xl" />

      {/* Main dashboard card */}
      <motion.div
        {...float(0, 6)}
        className="relative rounded-3xl border border-line bg-white p-5 shadow-card"
      >
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex items-center gap-2 rounded-md bg-surface-muted px-2.5 py-1 text-[11.5px] text-ink-muted">
            <Globe className="h-3 w-3" /> northbeam.studio/dashboard
          </div>
          <div className="h-5 w-5" />
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4">
          <Stat label="Visitors" value="48.2k" trend="+12.4%" />
          <Stat label="Conv. rate" value="4.92%" trend="+0.6%" />
          <Stat label="Revenue" value="$184k" trend="+22%" />
        </div>

        <div className="mt-4 rounded-2xl border border-line bg-gradient-to-b from-white to-[#FAFBFF] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-500 uppercase tracking-wider text-ink-muted">Performance</p>
              <p className="mt-0.5 font-display text-lg font-700 text-ink">Last 30 days</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11.5px] font-500 text-emerald-700">
              <TrendingUp className="h-3 w-3" /> Trending
            </span>
          </div>
          <Sparkline />
        </div>
      </motion.div>

      {/* Floating card – campaign */}
      <motion.div
        {...float(1.4, 8)}
        className="absolute -left-6 bottom-10 w-[230px] rounded-2xl border border-line bg-white p-3.5 shadow-card md:-left-10"
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-soft text-brand">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12.5px] font-600 text-ink">Spring Campaign</p>
            <p className="text-[11px] text-ink-muted">Live · 6 channels</p>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#4F46E5] to-[#2563EB]" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11.5px] text-ink-muted">
          <span>ROAS 4.8x</span><span className="font-600 text-ink">72%</span>
        </div>
      </motion.div>

      {/* Floating card – video timeline */}
      <motion.div
        {...float(0.6, 10)}
        className="absolute -right-4 -top-6 w-[260px] rounded-2xl border border-line bg-white p-3.5 shadow-card md:-right-10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F172A] text-white">
              <Play className="h-3.5 w-3.5 fill-white" />
            </span>
            <div>
              <p className="text-[12.5px] font-600 text-ink">Brand Film · v3</p>
              <p className="text-[11px] text-ink-muted">00:42 / 01:18</p>
            </div>
          </div>
          <Layers className="h-4 w-4 text-ink-muted" />
        </div>
        <div className="mt-3 space-y-1.5">
          <Track color="#4F46E5" w="80%" />
          <Track color="#22C55E" w="55%" />
          <Track color="#F59E0B" w="68%" />
        </div>
      </motion.div>

      {/* Floating tiny KPI */}
      <motion.div
        {...float(2.2, 6)}
        className="absolute -right-6 bottom-[-1.25rem] hidden w-[190px] rounded-2xl border border-line bg-white p-3.5 shadow-card md:block"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-500 uppercase tracking-wider text-ink-muted">CTR</span>
          <BarChart3 className="h-3.5 w-3.5 text-ink-muted" />
        </div>
        <p className="mt-1 font-display text-2xl font-700 text-ink">6.8%</p>
        <p className="text-[11.5px] text-emerald-600">+1.2% vs last week</p>
      </motion.div>
    </motion.div>
  );
}

function Stat({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-3">
      <p className="text-[11px] font-500 uppercase tracking-wider text-ink-muted">{label}</p>
      <p className="mt-1 font-display text-[18px] font-700 text-ink">{value}</p>
      <p className="text-[11px] text-emerald-600">{trend}</p>
    </div>
  );
}

function Track({ color, w }: { color: string; w: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2 flex-1 rounded-full bg-surface-muted">
        <span className="block h-full rounded-full" style={{ width: w, background: color }} />
      </span>
    </div>
  );
}

function Sparkline() {
  return (
    <svg viewBox="0 0 320 90" className="mt-3 h-24 w-full">
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 70 L30 60 L60 64 L90 48 L120 52 L150 36 L180 42 L210 28 L240 32 L270 20 L300 24 L320 12 L320 90 L0 90 Z"
        fill="url(#sparkFill)"
      />
      <path
        d="M0 70 L30 60 L60 64 L90 48 L120 52 L150 36 L180 42 L210 28 L240 32 L270 20 L300 24 L320 12"
        fill="none"
        stroke="#4F46E5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
