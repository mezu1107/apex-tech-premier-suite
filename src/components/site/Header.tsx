import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/team", label: "Team" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/70 bg-white/80 backdrop-blur-xl shadow-soft"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-3 lg:px-10">
        <Link to="/" className="flex items-center gap-2" aria-label="Adphira LLC — Home">
          <Logo className="h-11 w-auto" />
          <span className="hidden font-display text-lg font-extrabold tracking-tight text-espresso sm:inline">
            adphira<span className="ml-1 text-[0.7em] font-semibold text-copper">LLC</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-7 xl:flex">
          {nav.map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`relative text-sm font-medium transition ${
                    active ? "text-cocoa" : "text-espresso/70 hover:text-cocoa"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded bg-copper" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden rounded-full bg-cocoa px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-espresso sm:inline-flex"
          >
            Get Started
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-border p-2 xl:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5 text-espresso" /> : <Menu className="h-5 w-5 text-espresso" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`xl:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-3xl border border-border bg-white/95 p-6 shadow-luxury backdrop-blur-xl">
          <ul className="space-y-1">
            {nav.map((l) => {
              const active = pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition ${
                      active
                        ? "bg-sand text-cocoa"
                        : "text-espresso/80 hover:bg-sand"
                    }`}
                  >
                    {l.label}
                    <ChevronDown className="h-4 w-4 -rotate-90 opacity-40" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            to="/contact"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
