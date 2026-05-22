import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#2563EB] shadow-soft">
        <span className="block h-2.5 w-2.5 rounded-sm bg-white/95" />
      </span>
      <span className="font-display text-[17px] font-700 tracking-tight text-ink">
        Northbeam<span className="text-brand">.</span>
      </span>
    </Link>
  );
}
