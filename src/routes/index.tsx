import { createFileRoute, Link } from "@tanstack/react-router";
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
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-tech.png";
import whyImg from "@/assets/why-choose.png";
import bannerImg from "@/assets/banner-tech.jpg";
import avatar1 from "@/assets/avatar1.jpg";
import avatar2 from "@/assets/avatar2.jpg";
import avatar3 from "@/assets/avatar3.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adphira LLC — Empowering Businesses Through Smart Technology" },
      { name: "description", content: "Premium software, mobile, AI and cloud solutions that accelerate business growth." },
      { property: "og:title", content: "Adphira LLC — Smart Software, Elegant Results" },
      { property: "og:description", content: "Premium software, mobile, AI and cloud solutions." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

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

const trusted = ["NORTHWIND", "FABLE", "BLOOM", "ORION", "LUMEN", "ATLAS", "VERTEX", "HELIX"];

const process = [
  { step: "01", title: "Discover", desc: "Deep-dive workshops to understand goals, users and constraints." },
  { step: "02", title: "Design", desc: "Concept, prototype, iterate — luxury-grade design systems." },
  { step: "03", title: "Build", desc: "Senior engineers ship production code with test coverage." },
  { step: "04", title: "Launch", desc: "Deploy, monitor and continuously improve after go-live." },
];

const stats = [
  { value: 250, suffix: "+", label: "Projects Shipped" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 42, suffix: "", label: "Countries Served" },
  { value: 12, suffix: "y", label: "Years Experience" },
];

function useCountUp(target: number, active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const duration = 1600;
    const raf = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round(p * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, [target, active]);
  return n;
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const n = useCountUp(value, active);
  return (
    <div ref={ref} className="rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
      <p className="font-display text-4xl font-extrabold text-espresso sm:text-5xl">
        {n}
        {suffix}
      </p>
      <p className="mt-2 text-xs uppercase tracking-widest text-foreground/60">{label}</p>
    </div>
  );
}

const activities = [
  "John from London booked a consultation",
  "Sarah requested a website quote",
  "New client joined from Dubai",
  "Project 'Orion Dashboard' completed",
  "Aisha subscribed to Enterprise plan",
];

function LiveActivity() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % activities.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="fixed bottom-24 right-5 z-30 hidden max-w-xs rounded-2xl border border-border bg-card/95 p-4 shadow-luxury backdrop-blur lg:block">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-copper">Live activity</p>
      <p key={i} className="slide-in mt-1 text-sm font-medium text-espresso">✅ {activities[i]}</p>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-sand/60 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-espresso/15 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-espresso backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-copper" /> Software · AI · Cloud
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] text-espresso sm:text-6xl lg:text-7xl">
                Empowering Businesses Through <span className="italic text-copper">Smart</span> Technology
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
                We build scalable websites, powerful mobile apps, AI solutions and cloud platforms that accelerate your business growth.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-cocoa px-7 py-4 text-sm font-semibold text-cream shadow-luxury transition hover:bg-espresso">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-espresso/20 bg-card px-7 py-4 text-sm font-semibold text-espresso transition hover:border-copper hover:text-copper">
                  Our Services
                </Link>
              </div>
            </Reveal>
            <Reveal delay={400}>
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
            </Reveal>
          </div>

          <Reveal variant="zoom" delay={200}>
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-sand via-cream to-sand/60" />
              <div className="rounded-[3rem] p-6 lg:p-10">
                <img src={heroImg} alt="Adphira LLC digital workspace" width={1024} height={1024} className="mx-auto w-full max-w-lg drop-shadow-2xl" />
              </div>
              <div className="absolute -left-2 bottom-6 flex items-center gap-3 rounded-2xl bg-card/90 p-3 shadow-soft backdrop-blur sm:-left-6 sm:bottom-10 sm:p-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-copper/15 text-copper">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-foreground/60">AI Ready</p>
                  <p className="font-display text-sm font-semibold text-espresso">Deploy in days</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUSTED */}
      <section className="border-y border-border/60 bg-cream/60 py-10">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">Trusted by teams worldwide</p>
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max gap-14 px-6">
            {[...trusted, ...trusted].map((n, i) => (
              <span key={i} className="font-display text-lg font-black tracking-widest text-espresso/40">
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Our Services</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 font-display text-3xl font-bold text-espresso sm:text-5xl">Crafted for modern businesses</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-foreground/70">Four core practices, one obsession: shipping software that feels effortless.</p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
            {services.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 100} variant="up">
                <div className="group h-full rounded-3xl border border-border bg-card p-8 text-center shadow-soft transition duration-500 hover:-translate-y-2 hover:shadow-luxury">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-sand to-cream text-espresso ring-1 ring-border transition group-hover:from-copper/20 group-hover:to-sand">
                    <Icon className="h-8 w-8 text-copper" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-espresso">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-12 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal variant="zoom">
            <div className="overflow-hidden rounded-[2rem] bg-espresso text-cream shadow-luxury lg:rounded-[2.5rem]">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="p-8 sm:p-12 lg:p-16">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Why Choose Us</p>
                  <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl">
                    Why Choose <span className="italic text-copper">Adphira LLC</span>
                  </h2>
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
                  <Link to="/about" className="mt-10 inline-flex items-center gap-2 rounded-full bg-copper px-8 py-4 text-sm font-semibold text-espresso transition hover:bg-cream">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="relative bg-cocoa p-8 lg:p-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-cocoa via-espresso to-cocoa" />
                  <img src={whyImg} alt="Apex team workspace" width={1024} height={1024} loading="lazy" className="relative mx-auto w-full max-w-md drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Live Dashboard</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-3 font-display text-3xl font-bold text-espresso sm:text-4xl">By the numbers</h2>
            </Reveal>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal><p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Our Process</p></Reveal>
            <Reveal delay={100}><h2 className="mt-3 font-display text-3xl font-bold text-espresso sm:text-5xl">How we ship excellence</h2></Reveal>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 120}>
                <div className="relative h-full rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-luxury">
                  <span className="font-display text-5xl font-black text-copper/30">{p.step}</span>
                  <h3 className="mt-3 font-display text-xl font-bold text-espresso">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL OFFER */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal variant="zoom">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sand via-cream to-sand p-10 text-center shadow-soft sm:p-14 lg:p-20 lg:rounded-[2.5rem]">
              <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-copper/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-espresso/10 blur-3xl" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Limited Time</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-espresso sm:text-5xl lg:text-6xl">
                Free Consultation <span className="italic text-copper">or</span> 20% Off Website Development
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-foreground/70">Book a discovery call this month and receive a complimentary product audit alongside our launch discount.</p>
              <Link to="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-cocoa px-10 py-4 text-sm font-semibold text-cream shadow-luxury transition hover:bg-espresso">
                Claim Offer <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Reveal><p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Featured Services</p></Reveal>
              <Reveal delay={100}><h2 className="mt-3 font-display text-3xl font-bold text-espresso sm:text-5xl">Everything you need to scale</h2></Reveal>
            </div>
            <Reveal delay={200}>
              <Link to="/services" className="text-sm font-semibold text-espresso underline decoration-copper decoration-2 underline-offset-4 hover:text-copper">Explore all solutions →</Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {featured.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="group h-full rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:-translate-y-1 hover:border-copper/40 hover:shadow-luxury">
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-espresso text-cream transition group-hover:bg-copper">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-espresso">{title}</h3>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-foreground/70">{desc}</p>
                  <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-copper">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="relative isolate overflow-hidden py-24 lg:py-40">
        <img src={bannerImg} alt="Premium technology workspace" width={1920} height={912} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso/95 via-espresso/85 to-espresso/60" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <Reveal><p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Our Vision</p></Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
                Innovating Today,<br />Building <span className="italic text-copper">Tomorrow.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}><p className="mt-6 max-w-xl text-cream/80">Partner with a team that treats every product as a long-term craft — engineered for scale, designed for people.</p></Reveal>
            <Reveal delay={300}>
              <Link to="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-copper px-10 py-4 text-sm font-semibold text-espresso shadow-luxury transition hover:bg-cream">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal><p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Testimonials</p></Reveal>
            <Reveal delay={100}><h2 className="mt-4 font-display text-3xl font-bold text-espresso sm:text-5xl">Loved by teams that ship</h2></Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-luxury">
                  <div className="flex items-center gap-1 text-copper">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-copper" />
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <div className="rounded-[2rem] bg-espresso p-10 text-center text-cream sm:p-14 lg:rounded-[2.5rem]">
              <h2 className="font-display text-3xl font-extrabold sm:text-5xl">Ready to build something remarkable?</h2>
              <p className="mx-auto mt-4 max-w-xl text-cream/70">Let's turn your idea into a beautifully crafted product.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-copper px-8 py-4 text-sm font-semibold text-espresso hover:bg-cream">Start a project</Link>
                <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-4 text-sm font-semibold text-cream hover:bg-cream/10">View pricing</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <LiveActivity />
    </div>
  );
}
