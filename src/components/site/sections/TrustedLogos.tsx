const LOGOS = [
  "Aurora", "Northwind", "Lumen", "Vertex", "Quanta", "Helios", "Parallel", "Mosaic",
];

export function TrustedLogos() {
  return (
    <section className="border-y border-line bg-white/60">
      <div className="container-page py-10">
        <p className="text-center text-[12px] font-500 uppercase tracking-[0.18em] text-ink-muted">
          Trusted by ambitious teams across India & beyond
        </p>
        <div className="mt-6 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-4 md:grid-cols-8">
          {LOGOS.map((name) => (
            <div
              key={name}
              className="group flex items-center justify-center"
            >
              <span className="font-display text-[18px] font-700 tracking-tight text-ink-muted/70 transition-colors duration-300 group-hover:text-ink">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
