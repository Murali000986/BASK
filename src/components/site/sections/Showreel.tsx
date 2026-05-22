import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

export function Showreel() {
  const [open, setOpen] = useState(false);

  return (
    <section className="section-y bg-surface-muted/60">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-600 uppercase tracking-[0.16em] text-brand">Showreel 2026</p>
          <h2 className="mt-3 font-display text-[34px] font-700 leading-[1.08] tracking-[-0.02em] text-ink sm:text-[44px] text-balance">
            A year of work, in ninety seconds.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted">
            A short reel of brand films, product launches and campaigns we shipped last year.
          </p>
        </div>

        <motion.button
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="group relative mx-auto mt-12 block w-full max-w-5xl overflow-hidden rounded-[28px] border border-line bg-ink shadow-card"
          aria-label="Play showreel"
        >
          <div className="relative aspect-[16/9] w-full">
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
              style={{
                background:
                  "radial-gradient(80% 60% at 30% 30%, #1e293b 0%, #0f172a 60%, #0b1224 100%)",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_70%_60%,rgba(79,70,229,0.35),transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.5)_100%)]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <span className="absolute inset-0 -m-3 animate-ping rounded-full bg-white/20" />
                <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-white text-ink shadow-lift">
                  <Play className="ml-1 h-7 w-7 fill-ink" />
                </span>
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <p className="text-[11px] font-500 uppercase tracking-[0.18em] text-white/70">Featured</p>
                <p className="mt-1 font-display text-[20px] font-700">Northbeam — Reel 2026</p>
              </div>
              <p className="text-[12px] text-white/70">01:32</p>
            </div>
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 backdrop-blur-md p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lift"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex aspect-video w-full items-center justify-center text-white/70">
                <p className="text-sm">Video player placeholder</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
