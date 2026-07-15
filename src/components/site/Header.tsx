import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

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
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-cream/85 backdrop-blur-xl border-b border-espresso/10 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="font-display text-xl font-extrabold tracking-tight text-espresso">
          Apex<span className="text-copper">.</span>Technologies
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`relative text-sm font-medium transition ${
                    active ? "text-copper" : "text-espresso/80 hover:text-copper"
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
            className="hidden rounded-full bg-cocoa px-6 py-2.5 text-sm font-semibold text-cream shadow-soft transition hover:bg-espresso sm:inline-flex"
          >
            Get Started
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-espresso/20 p-2 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5 text-espresso" /> : <Menu className="h-5 w-5 text-espresso" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-3xl border border-espresso/10 bg-card/95 p-6 shadow-luxury backdrop-blur-xl">
          <ul className="space-y-1">
            {nav.map((l) => {
              const active = pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition ${
                      active
                        ? "bg-sand/70 text-espresso"
                        : "text-espresso/80 hover:bg-sand/50"
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
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-cream shadow-soft"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
