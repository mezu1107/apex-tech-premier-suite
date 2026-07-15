import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Palette,
  Sparkles,
  Globe,
  Briefcase,
  Database,
  ShoppingCart,
  Cloud,
  Bot,
  Star,
  Check,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Menu,
} from "lucide-react";
import heroImg from "@/assets/hero-tech.png";
import whyImg from "@/assets/why-choose.png";
import bannerImg from "@/assets/banner-tech.jpg";
import avatar1 from "@/assets/avatar1.jpg";
import avatar2 from "@/assets/avatar2.jpg";
import avatar3 from "@/assets/avatar3.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const navLinks = ["Home", "About", "Services", "Solutions", "Portfolio", "Pricing", "Contact"];

const services = [
  { icon: Code2, title: "Web Development", desc: "Fast, scalable and elegantly crafted websites tailored to your brand." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform apps designed for performance and delight." },
  { icon: Palette, title: "UI/UX Design", desc: "Human-centred interfaces that turn visitors into loyal customers." },
  { icon: Sparkles, title: "AI Solutions", desc: "Intelligent automation and machine learning built for real outcomes." },
];

const featured = [
  { icon: Globe, title: "Responsive Websites", desc: "Pixel-perfect sites that shine on every screen." },
  { icon: Briefcase, title: "Business Software", desc: "Bespoke tools that streamline your operations." },
  { icon: Database, title: "ERP Systems", desc: "Unified platforms to run every part of your business." },
  { icon: ShoppingCart, title: "POS Software", desc: "Fast, reliable point-of-sale for modern retail." },
  { icon: Cloud, title: "Cloud Hosting", desc: "Secure, scalable infrastructure with 99.99% uptime." },
  { icon: Bot, title: "AI Automation", desc: "Smart workflows that save hours every week." },
];

const testimonials = [
  { name: "Amelia Carter", role: "CEO, Northwind Retail", avatar: avatar1, quote: "Apex rebuilt our entire commerce platform. Sales grew 42% in the first quarter — the craftsmanship is remarkable." },
  { name: "Marcus Reyes", role: "CTO, Fable Logistics", avatar: avatar2, quote: "Their AI automation freed our team from thousands of manual tasks. A truly premium partner from day one." },
  { name: "Zara Okafor", role: "Founder, Bloom Studio", avatar: avatar3, quote: "Elegant design, flawless code, on-time delivery. Apex feels like an in-house team, only sharper." },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="absolute inset-x-0 top-0 z-40">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <a href="#home" className="font-display text-xl font-extrabold tracking-tight text-espresso">
            Apex<span className="text-copper">.</span>Technologies
          </a>
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="text-sm font-medium text-espresso/80 transition hover:text-copper">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-cream shadow-soft transition hover:bg-espresso sm:inline-flex"
            >
              Get Started
            </a>
            <button className="rounded-full border border-espresso/20 p-2 lg:hidden" aria-label="Menu">
              <Menu className="h-5 w-5 text-espresso" />
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-sand/60 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-espresso/15 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-espresso backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-copper" /> Software · AI · Cloud
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] text-espresso sm:text-6xl lg:text-7xl">
              Empowering Businesses Through <span className="italic text-copper">Smart</span> Technology
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
              We build scalable websites, powerful mobile apps, AI solutions and cloud platforms that accelerate your business growth.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-cocoa px-8 py-4 text-sm font-semibold text-cream shadow-luxury transition hover:bg-espresso">
                Get Started <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-espresso/20 bg-card px-8 py-4 text-sm font-semibold text-espresso transition hover:border-copper hover:text-copper">
                Our Services
              </a>
            </div>
            <div className="mt-12 flex items-center gap-8">
              <div>
                <p className="font-display text-3xl font-bold text-espresso">250+</p>
                <p className="text-xs uppercase tracking-widest text-foreground/60">Projects Shipped</p>
              </div>
              <div className="h-10 w-px bg-espresso/15" />
              <div>
                <p className="font-display text-3xl font-bold text-espresso">98%</p>
                <p className="text-xs uppercase tracking-widest text-foreground/60">Client Retention</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-sand via-cream to-sand/60" />
            <div className="rounded-[3rem] p-6 lg:p-10">
              <img src={heroImg} alt="Apex Technologies digital workspace" width={1024} height={1024} className="mx-auto w-full max-w-lg drop-shadow-2xl" />
            </div>
            <div className="absolute -left-6 bottom-10 hidden rounded-2xl bg-card/90 p-4 shadow-soft backdrop-blur md:flex md:items-center md:gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-copper/15 text-copper">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-foreground/60">AI Ready</p>
                <p className="font-display font-semibold text-espresso">Deploy in days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Our Services</p>
            <h2 className="mt-4 font-display text-4xl font-bold text-espresso sm:text-5xl">Crafted for modern businesses</h2>
            <p className="mt-4 text-foreground/70">Four core practices, one obsession: shipping software that feels effortless.</p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group rounded-3xl border border-border bg-card p-8 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-luxury">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-sand to-cream text-espresso ring-1 ring-border transition group-hover:from-copper/20 group-hover:to-sand">
                  <Icon className="h-8 w-8 text-copper" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-espresso">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="about" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="overflow-hidden rounded-[2.5rem] bg-espresso text-cream shadow-luxury">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="p-10 lg:p-16">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Why Choose Us</p>
                <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">Why Choose <span className="italic text-copper">Apex Technologies</span></h2>
                <p className="mt-5 text-cream/70">A boutique team of engineers, designers and strategists delivering enterprise-grade results with a hand-crafted touch.</p>

                <ul className="mt-8 space-y-4">
                  {["Modern, future-proof solutions", "Senior, experienced developers", "Rapid, on-time delivery", "24/7 dedicated support"].map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-copper/20 text-copper">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-cream/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <a href="#contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-copper px-8 py-4 text-sm font-semibold text-espresso transition hover:bg-cream">
                  Learn More <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="relative bg-cocoa p-8 lg:p-12">
                <div className="absolute inset-0 bg-gradient-to-br from-cocoa via-espresso to-cocoa" />
                <img src={whyImg} alt="Apex development team workspace" width={1024} height={1024} loading="lazy" className="relative mx-auto w-full max-w-md drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIAL OFFER */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sand via-cream to-sand p-12 text-center shadow-soft lg:p-20">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-copper/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-espresso/10 blur-3xl" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Limited Time</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold text-espresso sm:text-6xl">
              Free Consultation <span className="italic text-copper">or</span> 20% Off Website Development
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-foreground/70">Book a discovery call this month and receive a complimentary product audit alongside our launch discount.</p>
            <a href="#contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-cocoa px-10 py-4 text-sm font-semibold text-cream shadow-luxury transition hover:bg-espresso">
              Claim Offer <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section id="solutions" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Featured Services</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-espresso sm:text-5xl">Everything you need to scale</h2>
            </div>
            <a href="#contact" className="text-sm font-semibold text-espresso underline decoration-copper decoration-2 underline-offset-4 hover:text-copper">Explore all solutions →</a>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:-translate-y-1 hover:border-copper/40 hover:shadow-luxury">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-espresso text-cream transition group-hover:bg-copper">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-espresso">{title}</h3>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-foreground/70">{desc}</p>
                <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-copper">
                  Learn more <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL WIDTH BANNER */}
      <section className="relative isolate overflow-hidden py-32 lg:py-40">
        <img src={bannerImg} alt="Premium technology workspace" width={1920} height={912} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso/95 via-espresso/85 to-espresso/60" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Our Vision</p>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
              Innovating Today,<br />Building <span className="italic text-copper">Tomorrow.</span>
            </h2>
            <p className="mt-6 max-w-xl text-cream/80">Partner with a team that treats every product as a long-term craft — engineered for scale, designed for people.</p>
            <a href="#contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-copper px-10 py-4 text-sm font-semibold text-espresso shadow-luxury transition hover:bg-cream">
              Contact Us <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="portfolio" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Testimonials</p>
            <h2 className="mt-4 font-display text-4xl font-bold text-espresso sm:text-5xl">Loved by teams that ship</h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-soft">
                <div className="flex items-center gap-1 text-copper">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-copper" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 leading-relaxed text-foreground/80">"{t.quote}"</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} width={512} height={512} loading="lazy" className="h-14 w-14 rounded-full object-cover ring-2 ring-copper/30" />
                  <div>
                    <p className="font-display font-bold text-espresso">{t.name}</p>
                    <p className="text-xs text-foreground/60">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-cocoa text-cream">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-display text-2xl font-extrabold">Apex<span className="text-copper">.</span>Technologies</p>
              <p className="mt-4 text-sm leading-relaxed text-cream/70">Premium software, AI and cloud solutions crafted for growing businesses across the globe.</p>
              <div className="mt-6 flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition hover:border-copper hover:bg-copper hover:text-espresso">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="font-display font-bold">Quick Links</p>
              <ul className="mt-5 space-y-3 text-sm text-cream/70">
                {navLinks.slice(0, 5).map((l) => (
                  <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-copper">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display font-bold">Services</p>
              <ul className="mt-5 space-y-3 text-sm text-cream/70">
                <li>Web Development</li>
                <li>Mobile Apps</li>
                <li>AI Solutions</li>
                <li>Cloud Hosting</li>
                <li>UI/UX Design</li>
              </ul>
            </div>
            <div>
              <p className="font-display font-bold">Newsletter</p>
              <p className="mt-5 text-sm text-cream/70">Get product tips and industry insights, monthly.</p>
              <form className="mt-4 flex overflow-hidden rounded-full border border-cream/20 bg-espresso/40">
                <input type="email" placeholder="you@company.com" className="w-full bg-transparent px-5 py-3 text-sm text-cream placeholder:text-cream/50 focus:outline-none" />
                <button type="button" className="bg-copper px-5 text-sm font-semibold text-espresso transition hover:bg-cream">
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/60 sm:flex-row">
            <p>© {new Date().getFullYear()} Apex Technologies. All rights reserved.</p>
            <p>Crafted with care · Privacy · Terms</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
