import { motion } from "framer-motion";

const LOGOS = [
  "Aurora", "Northwind", "Lumen", "Vertex", "Quanta", "Helios", "Parallel", "Mosaic",
];

export function TrustedLogos() {
  return (
    <section className="border-y border-line bg-white/60 overflow-hidden">
      <div className="py-10">
        <p className="text-center text-[12px] font-500 uppercase tracking-[0.18em] text-ink-muted mb-8">
          Trusted by ambitious teams across India & beyond
        </p>
        
        <div className="relative flex w-full items-center">
          {/* Edge fade gradients */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />
          
          <motion.div
            className="flex min-w-max items-center gap-x-20 px-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="group flex items-center justify-center"
              >
                <span className="font-display text-[20px] font-700 tracking-tight text-ink-muted/50 transition-colors duration-300 hover:text-ink cursor-default">
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
