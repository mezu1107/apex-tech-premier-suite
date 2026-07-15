import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cocoa text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-extrabold">
              Apex<span className="text-copper">.</span>Technologies
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">
              Premium software, AI and cloud solutions crafted for growing businesses across the globe.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition hover:border-copper hover:bg-copper hover:text-espresso"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display font-bold">Quick Links</p>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              <li><Link to="/about" className="hover:text-copper">About</Link></li>
              <li><Link to="/services" className="hover:text-copper">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-copper">Portfolio</Link></li>
              <li><Link to="/team" className="hover:text-copper">Team</Link></li>
              <li><Link to="/careers" className="hover:text-copper">Careers</Link></li>
              <li><Link to="/pricing" className="hover:text-copper">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-display font-bold">Resources</p>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              <li><Link to="/blog" className="hover:text-copper">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-copper">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-copper">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-copper">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-copper">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-display font-bold">Get in touch</p>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper" /> 42 Innovation Blvd, London, UK</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-copper" /> +44 20 7946 0000</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-copper" /> hello@apex.tech</li>
            </ul>
            <form className="mt-5 flex overflow-hidden rounded-full border border-cream/20 bg-espresso/40">
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full bg-transparent px-4 py-2.5 text-sm text-cream placeholder:text-cream/50 focus:outline-none"
              />
              <button type="button" className="bg-copper px-4 text-sm font-semibold text-espresso transition hover:bg-cream">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Apex Technologies. All rights reserved.</p>
          <p>Crafted with care · <Link to="/privacy" className="hover:text-copper">Privacy</Link> · <Link to="/terms" className="hover:text-copper">Terms</Link></p>
        </div>
      </div>
    </footer>
  );
}
