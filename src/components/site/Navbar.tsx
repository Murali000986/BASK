import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight, LogOut, Shield } from "lucide-react";
import { Logo } from "./Logo";
import { useAuth } from "@/contexts/AuthContext";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Stories", to: "/stories" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [avatarMenu, setAvatarMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);



  const handleLogout = () => {
    logout();
    setAvatarMenu(false);
    navigate({ to: "/" });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-line shadow-[0_1px_0_rgba(15,23,42,0.04)]"
          : "bg-white/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-[72px]">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-ink bg-surface-muted" }}
              inactiveProps={{ className: "text-ink-soft hover:text-ink hover:bg-surface-muted/70" }}
              className="rounded-full px-4 py-2 text-[14px] font-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setAvatarMenu((v) => !v)}
                className="flex items-center gap-2.5 rounded-full border border-line bg-white px-3 py-1.5 text-[13.5px] font-500 text-ink shadow-soft transition-all hover:shadow-lift"
              >
                <img
                  src={user.picture}
                  alt={user.name}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span>{user.name.split(" ")[0]}</span>
              </button>

              {avatarMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setAvatarMenu(false)}
                  />
                  <div className="absolute right-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
                    <div className="border-b border-line px-4 py-3">
                      <p className="text-[13px] font-600 text-ink">{user.name}</p>
                      <p className="text-[12px] text-ink-muted">{user.email}</p>
                    </div>
                    {user.email === "murali701081@gmail.com" && (
                      <Link
                        to="/admin"
                        onClick={() => setAvatarMenu(false)}
                        className="flex w-full items-center gap-2.5 px-4 py-3 text-[13.5px] font-500 text-indigo-600 transition-colors hover:bg-indigo-50"
                      >
                        <Shield className="h-4 w-4" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 px-4 py-3 text-[13.5px] font-500 text-ink-soft transition-colors hover:bg-surface-muted hover:text-ink"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full px-4 py-2 text-[14px] font-500 text-ink-soft hover:text-ink hover:bg-surface-muted transition-colors"
            >
              Login
            </Link>
          )}

          <a
            href="https://wa.me/919800000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[14px] font-500 text-white transition-all hover:bg-ink/90 hover:shadow-lift"
          >
            Start Project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg border border-line bg-white p-2 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white">
          <div className="container-page flex h-full flex-col gap-2 py-8">
            {user ? (
              <div className="mb-2 flex items-center gap-3 rounded-2xl border border-line bg-surface-muted/60 px-5 py-4">
                <img src={user.picture} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-[14px] font-600 text-ink">{user.name}</p>
                  <p className="text-[12px] text-ink-muted">{user.email}</p>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="mb-4 rounded-2xl border border-line bg-surface-muted/30 px-5 py-4 text-lg font-600 text-ink text-center"
              >
                Login
              </Link>
            )}
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-line bg-white px-5 py-4 text-lg font-600 text-ink"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://wa.me/919800000000"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-2xl bg-ink px-5 py-4 text-base font-600 text-white"
            >
              Start Project <ArrowUpRight className="h-4 w-4" />
            </a>
            {user && (
              <>
                {user.email === "murali701081@gmail.com" && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 px-5 py-3.5 text-[14px] font-600 text-indigo-700"
                  >
                    <Shield className="h-4 w-4" /> Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => { setOpen(false); handleLogout(); }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-line px-5 py-3.5 text-[14px] font-500 text-ink-soft"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
