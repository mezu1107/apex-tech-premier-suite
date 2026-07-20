import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Search,
  Sparkles,
  Bot,
  Trophy,
  Users,
  Globe2,
  HeadphonesIcon,
  Zap,
  Rocket,
  Star,
  Plus,
  Minus,
  MapPin,
  Mail,
  Phone,
  Send,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Play,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";

/* ---------- utility card wrappers ---------- */

function BentoCard({
  className = "",
  children,
  gradient = "light",
}: {
  className?: string;
  children: React.ReactNode;
  gradient?: "light" | "teal" | "dark" | "lime" | "mesh";
}) {
  const bg =
    gradient === "teal"
      ? "bg-gradient-to-br from-[#0a4b4f] via-[#0d5a5e] to-[#06363a] text-white border-white/10"
      : gradient === "dark"
      ? "bg-gradient-to-br from-[#06363a] via-[#082a2c] to-[#04191b] text-white border-white/10"
      : gradient === "lime"
      ? "bg-gradient-to-br from-[#c9ee45] via-[#b9e52e] to-[#9ac91a] text-espresso border-espresso/10"
      : gradient === "mesh"
      ? "bg-[radial-gradient(circle_at_20%_0%,#b9e52e33_0%,transparent_45%),radial-gradient(circle_at_80%_100%,#0a4b4f22_0%,transparent_50%),linear-gradient(135deg,#ffffff,#f0f7f5)] text-espresso border-espresso/10"
      : "bg-white text-espresso border-espresso/8";
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border ${bg} shadow-[0_10px_40px_-15px_rgba(6,54,58,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_-20px_rgba(10,75,79,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}

function BentoSection({
  eyebrow,
  title,
  desc,
  children,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
  tone?: "light" | "sand";
}) {
  return (
    <section
      className={`relative overflow-hidden py-20 sm:py-24 lg:py-28 ${
        tone === "sand" ? "bg-sand/60" : "bg-white"
      }`}
    >
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-copper/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-copper/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-espresso">
              <span className="h-1.5 w-1.5 rounded-full bg-copper" />
              {eyebrow}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-3xl font-black leading-[1.05] tracking-tight text-espresso sm:text-4xl md:text-5xl">
              {title}
            </h2>
          </Reveal>
          {desc ? (
            <Reveal delay={160}>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/65 sm:text-base">
                {desc}
              </p>
            </Reveal>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function LearnMore({ label = "Learn more", tone = "dark" }: { label?: string; tone?: "dark" | "light" | "lime" }) {
  const cls =
    tone === "light"
      ? "text-white/90 hover:text-white"
      : tone === "lime"
      ? "text-espresso hover:text-espresso"
      : "text-cocoa hover:text-espresso";
  return (
    <Link
      to="/contact"
      className={`mt-6 inline-flex items-center gap-1.5 text-sm font-bold transition-colors ${cls}`}
    >
      {label}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function IconTile({
  icon: Icon,
  tone = "teal",
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone?: "teal" | "lime" | "white" | "dark";
}) {
  const cls =
    tone === "lime"
      ? "bg-copper text-espresso"
      : tone === "white"
      ? "bg-white/15 text-white ring-1 ring-white/20"
      : tone === "dark"
      ? "bg-espresso text-copper"
      : "bg-espresso text-copper";
  return (
    <div
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl shadow-inner ${cls}`}
    >
      <Icon className="h-6 w-6" />
    </div>
  );
}

/* ---------- 1. Services Bento (5 asymmetric cards) ---------- */

function ServicesBento() {
  return (
    <BentoSection
      eyebrow="Our Services"
      title="Solutions engineered for growth"
      desc="Five specialized practices — one accountable partner. Everything you need to design, build, launch and scale."
    >
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
        {/* Large featured — Web Development */}
        <Reveal className="lg:col-span-2 lg:row-span-1">
          <BentoCard gradient="teal" className="p-7 sm:p-9 h-full min-h-[280px]">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-copper/25 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center gap-3">
                <IconTile icon={Code2} tone="lime" />
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Featured</span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-black leading-tight sm:text-3xl">
                Website & Web App Development
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                Blazing-fast websites, SaaS platforms and internal tools engineered with React, Next.js, TanStack and headless CMS — deployed at the edge.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["React", "Next.js", "TanStack", "Tailwind", "Edge Deploy"].map((t) => (
                  <span key={t} className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium">{t}</span>
                ))}
              </div>
              <LearnMore tone="light" label="Explore Web Development" />
            </div>
          </BentoCard>
        </Reveal>

        {/* Digital Marketing */}
        <Reveal delay={80}>
          <BentoCard gradient="lime" className="p-7 h-full min-h-[280px]">
            <div className="flex h-full flex-col">
              <IconTile icon={Sparkles} tone="dark" />
              <h3 className="mt-5 font-display text-xl font-black leading-tight">Digital Marketing</h3>
              <p className="mt-2 text-sm leading-relaxed text-espresso/75">
                Paid & organic engines that turn traffic into pipeline — Meta, Google, TikTok, SEO.
              </p>
              <LearnMore tone="lime" />
            </div>
          </BentoCard>
        </Reveal>

        {/* SEO */}
        <Reveal delay={120}>
          <BentoCard gradient="mesh" className="p-7 h-full min-h-[240px]">
            <IconTile icon={Search} />
            <h3 className="mt-5 font-display text-xl font-black leading-tight text-espresso">Search Engine Optimization</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              Technical + content SEO that ranks for queries that actually convert.
            </p>
            <LearnMore />
          </BentoCard>
        </Reveal>

        {/* Mobile Apps */}
        <Reveal delay={160}>
          <BentoCard className="p-7 h-full min-h-[240px]">
            <IconTile icon={Smartphone} />
            <h3 className="mt-5 font-display text-xl font-black leading-tight text-espresso">Mobile App Development</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              iOS, Android & cross-platform apps built for performance and delight.
            </p>
            <LearnMore />
          </BentoCard>
        </Reveal>

        {/* AI Automation */}
        <Reveal delay={200}>
          <BentoCard gradient="dark" className="p-7 h-full min-h-[240px]">
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-copper/20 blur-2xl" />
            <div className="relative">
              <IconTile icon={Bot} tone="lime" />
              <h3 className="mt-5 font-display text-xl font-black leading-tight">AI Automation</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Chatbots, LLM workflows & agents that save your team hours every week.
              </p>
              <LearnMore tone="light" />
            </div>
          </BentoCard>
        </Reveal>
      </div>
    </BentoSection>
  );
}

/* ---------- 2. Why Choose Us Bento ---------- */

function WhyBento() {
  return (
    <BentoSection
      eyebrow="Why Choose Adphira"
      title="Built for the enterprises of tomorrow"
      desc="A team, a process and a track record that turn ambitious ideas into shipping software."
      tone="sand"
    >
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-4 lg:grid-rows-3 lg:gap-6">
        <Reveal className="lg:col-span-2 lg:row-span-2">
          <BentoCard gradient="dark" className="p-8 sm:p-10 h-full min-h-[300px]">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-copper/25 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <IconTile icon={Trophy} tone="lime" />
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-6xl font-black text-copper sm:text-7xl">500+</span>
                </div>
                <p className="mt-2 font-display text-2xl font-bold">Projects Delivered</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                  From startups to Fortune 1000 — websites, apps, AI systems and SaaS platforms shipped on time.
                </p>
              </div>
              <div className="mt-8 flex gap-6">
                {[["98%", "Retention"], ["4.9★", "Rating"], ["42", "Countries"]].map(([v, l]) => (
                  <div key={l}>
                    <p className="font-display text-2xl font-black text-copper">{v}</p>
                    <p className="text-xs uppercase tracking-widest text-white/50">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-2">
          <BentoCard gradient="lime" className="p-7 h-full min-h-[160px]">
            <div className="flex items-start gap-4">
              <IconTile icon={Rocket} tone="dark" />
              <div>
                <p className="font-display text-3xl font-black text-espresso">5+ Years</p>
                <p className="mt-1 text-sm text-espresso/75">Engineering excellence across industries and stacks.</p>
              </div>
            </div>
          </BentoCard>
        </Reveal>

        <Reveal delay={120}>
          <BentoCard className="p-6 h-full min-h-[160px]">
            <IconTile icon={Globe2} />
            <p className="mt-4 font-display text-xl font-black text-espresso">Global Clients</p>
            <p className="mt-1 text-sm text-foreground/65">USA, UK, UAE, KSA, Pakistan & 40+ more.</p>
          </BentoCard>
        </Reveal>

        <Reveal delay={160}>
          <BentoCard gradient="mesh" className="p-6 h-full min-h-[160px]">
            <IconTile icon={HeadphonesIcon} />
            <p className="mt-4 font-display text-xl font-black text-espresso">24/7 Support</p>
            <p className="mt-1 text-sm text-foreground/65">SLA-backed engineering support around the clock.</p>
          </BentoCard>
        </Reveal>

        <Reveal delay={200} className="lg:col-span-2">
          <BentoCard gradient="teal" className="p-7 h-full min-h-[160px]">
            <div className="flex items-start gap-4">
              <IconTile icon={Zap} tone="lime" />
              <div>
                <p className="font-display text-xl font-black text-white">AI-Powered Solutions</p>
                <p className="mt-1 text-sm text-white/70">
                  Every project ships with intelligent automation baked in — from copilots to predictive models.
                </p>
              </div>
            </div>
          </BentoCard>
        </Reveal>

        <Reveal delay={240} className="lg:col-span-2">
          <BentoCard className="p-7 h-full min-h-[160px]">
            <div className="flex items-start gap-4">
              <IconTile icon={Users} />
              <div>
                <p className="font-display text-xl font-black text-espresso">Dedicated Team</p>
                <p className="mt-1 text-sm text-foreground/65">
                  Senior engineers, designers and PMs assigned exclusively to your account.
                </p>
              </div>
            </div>
          </BentoCard>
        </Reveal>
      </div>
    </BentoSection>
  );
}

/* ---------- 3. Technologies Bento ---------- */

const techs = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#000" },
  { name: "Node.js", color: "#3C873A" },
  { name: "Laravel", color: "#FF2D20" },
  { name: "PHP", color: "#777BB4" },
  { name: "Python", color: "#3776AB" },
  { name: "Flutter", color: "#02569B" },
  { name: "WordPress", color: "#21759B" },
  { name: "Shopify", color: "#96BF48" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Photoshop", color: "#31A8FF" },
  { name: "Illustrator", color: "#FF9A00" },
];

function TechBento() {
  return (
    <BentoSection
      eyebrow="Tech Stack"
      title="Modern tools, senior engineering"
      desc="We use the same tools the world's best product teams use — chosen for speed, safety and long-term maintainability."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {techs.map((t, i) => (
          <Reveal key={t.name} delay={i * 40}>
            <BentoCard className="flex h-full min-h-[120px] flex-col items-center justify-center p-5 text-center">
              <div
                className="grid h-11 w-11 place-items-center rounded-2xl font-display text-lg font-black text-white shadow-lg"
                style={{ background: t.color }}
              >
                {t.name[0]}
              </div>
              <p className="mt-3 text-sm font-bold text-espresso">{t.name}</p>
            </BentoCard>
          </Reveal>
        ))}
      </div>
    </BentoSection>
  );
}

/* ---------- 4. Process Bento ---------- */

const steps = [
  { n: "01", t: "Discovery", d: "Workshops to align on goals, users & KPIs." },
  { n: "02", t: "Planning", d: "Roadmap, scope, timelines & tech decisions." },
  { n: "03", t: "Design", d: "Luxury-grade UI/UX in Figma with prototypes." },
  { n: "04", t: "Development", d: "Senior engineers shipping tested code." },
  { n: "05", t: "Testing", d: "QA, accessibility, performance & security." },
  { n: "06", t: "Launch", d: "Deploy at the edge with zero-downtime rollout." },
  { n: "07", t: "Support", d: "24/7 SLA-backed monitoring & improvement." },
];

function ProcessBento() {
  return (
    <BentoSection
      eyebrow="How We Work"
      title="A process refined over 500+ launches"
      tone="sand"
    >
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        <Reveal className="lg:row-span-2">
          <BentoCard gradient="teal" className="p-8 h-full min-h-[300px]">
            <div className="absolute -right-10 -bottom-10 h-52 w-52 rounded-full bg-copper/20 blur-3xl" />
            <div className="relative">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">7-step process</span>
              <h3 className="mt-6 font-display text-3xl font-black leading-tight">
                Discovery to Delivery — done right.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                A predictable, transparent workflow with weekly demos and no surprises.
              </p>
              <div className="mt-8 space-y-3">
                {["Weekly demos", "Fixed-price MVP", "24/7 comms"].map((f) => (
                  <p key={f} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-copper" /> {f}
                  </p>
                ))}
              </div>
            </div>
          </BentoCard>
        </Reveal>

        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 50}>
            <BentoCard className="p-6 h-full min-h-[145px]">
              <p className="font-display text-3xl font-black text-copper">{s.n}</p>
              <p className="mt-2 font-display text-lg font-black text-espresso">{s.t}</p>
              <p className="mt-1 text-xs leading-relaxed text-foreground/65">{s.d}</p>
            </BentoCard>
          </Reveal>
        ))}
      </div>
    </BentoSection>
  );
}

/* ---------- 5. Portfolio Bento ---------- */

const projects = [
  { title: "Northwind Commerce", cat: "E-commerce", grad: "from-[#0a4b4f] to-[#083033]" },
  { title: "Fable Logistics", cat: "SaaS Platform", grad: "from-[#b9e52e] to-[#88b520]" },
  { title: "Bloom Studio", cat: "Brand Website", grad: "from-[#06363a] to-[#04191b]" },
  { title: "Orion Dashboard", cat: "Analytics AI", grad: "from-[#0d5a5e] to-[#0a4b4f]" },
  { title: "Vertex Mobile", cat: "iOS + Android", grad: "from-[#c9ee45] to-[#9ac91a]" },
];

function PortfolioBento() {
  return (
    <BentoSection
      eyebrow="Portfolio"
      title="Recent work we're proud of"
      desc="Selected projects across e-commerce, SaaS, AI and brand — each shipped, live and generating results."
    >
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-4 lg:grid-rows-2 lg:gap-6">
        <Reveal className="lg:col-span-2 lg:row-span-2">
          <BentoCard className="relative h-full min-h-[380px] p-0">
            <div className={`absolute inset-0 bg-gradient-to-br ${projects[0].grad}`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#ffffff20,transparent_50%)]" />
            <div className="relative flex h-full flex-col justify-between p-8 text-white">
              <span className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur">Featured Project</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-copper">{projects[0].cat}</p>
                <h3 className="mt-2 font-display text-3xl font-black sm:text-4xl">{projects[0].title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
                  Rebuilt a legacy retail platform into a headless commerce experience. Result: <span className="font-bold text-copper">+42% revenue</span> in Q1.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-sm font-bold text-espresso">
                  View Case Study <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </BentoCard>
        </Reveal>

        {projects.slice(1).map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <BentoCard className="relative h-full min-h-[180px] p-0">
              <div className={`absolute inset-0 bg-gradient-to-br ${p.grad}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#ffffff25,transparent_60%)]" />
              <div className="relative flex h-full flex-col justify-end p-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">{p.cat}</p>
                <h4 className="mt-1 font-display text-xl font-black">{p.title}</h4>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-copper opacity-0 transition-opacity group-hover:opacity-100">
                  View project <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </BentoCard>
          </Reveal>
        ))}
      </div>
    </BentoSection>
  );
}

/* ---------- 6. Testimonials Bento ---------- */

const reviews = [
  { name: "Hassan Ali", role: "CEO, Northwind", quote: "Adphira rebuilt our entire commerce platform. Sales grew 42% in the first quarter.", stars: 5 },
  { name: "Ayesha Khan", role: "CTO, Fable", quote: "Their AI automation freed our team from thousands of manual tasks.", stars: 5 },
  { name: "Bilal Ahmed", role: "Founder, Bloom", quote: "Elegant design, flawless code, on-time delivery.", stars: 5 },
  { name: "Sara Ibrahim", role: "PM, Orion", quote: "The dashboard they built is beautiful, fast and rock-solid.", stars: 5 },
];

function TestimonialsBento() {
  return (
    <BentoSection
      eyebrow="Client Love"
      title="Trusted by leaders worldwide"
      tone="sand"
    >
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
        <Reveal className="lg:col-span-2">
          <BentoCard gradient="dark" className="p-8 sm:p-10 h-full min-h-[240px]">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-copper/20 blur-3xl" />
            <div className="relative">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-copper text-copper" />
                ))}
              </div>
              <p className="mt-6 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                "{reviews[0].quote}"
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-copper font-display font-black text-espresso">
                  {reviews[0].name[0]}
                </div>
                <div>
                  <p className="font-bold text-white">{reviews[0].name}</p>
                  <p className="text-xs text-white/60">{reviews[0].role}</p>
                </div>
              </div>
            </div>
          </BentoCard>
        </Reveal>

        <Reveal delay={80}>
          <BentoCard gradient="lime" className="p-7 h-full min-h-[240px]">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-espresso text-espresso" />
              ))}
            </div>
            <p className="mt-4 text-sm font-medium leading-relaxed text-espresso/85">"{reviews[1].quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-espresso font-display font-black text-copper">
                {reviews[1].name[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-espresso">{reviews[1].name}</p>
                <p className="text-xs text-espresso/60">{reviews[1].role}</p>
              </div>
            </div>
          </BentoCard>
        </Reveal>

        {reviews.slice(2).map((r, i) => (
          <Reveal key={r.name} delay={(i + 2) * 80} className={i === 1 ? "lg:col-span-2" : ""}>
            <BentoCard className="p-7 h-full min-h-[200px]">
              <div className="flex gap-1">
                {Array.from({ length: r.stars }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-copper text-copper" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/75">"{r.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-espresso font-display font-black text-copper">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-espresso">{r.name}</p>
                  <p className="text-xs text-foreground/55">{r.role}</p>
                </div>
              </div>
            </BentoCard>
          </Reveal>
        ))}
      </div>
    </BentoSection>
  );
}

/* ---------- 7. FAQ Bento ---------- */

const faqs = [
  { q: "How long does a typical project take?", a: "Most websites launch in 3-6 weeks. Complex SaaS or AI systems typically run 8-16 weeks depending on scope." },
  { q: "Do you offer fixed-price packages?", a: "Yes. Our Starter, Growth and Enterprise plans have transparent pricing. Custom builds get a fixed-price MVP quote after discovery." },
  { q: "What happens after launch?", a: "Every project ships with 30 days of free support and access to our 24/7 SLA-backed retainer plans." },
  { q: "Do you own the code?", a: "No — you do. Full source code, documentation and infrastructure are handed over on delivery." },
  { q: "Can you work with our in-house team?", a: "Absolutely. We embed with your engineers, PMs and designers using your tools and rituals." },
];

function FAQBento() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <BentoSection
      eyebrow="Answers"
      title="Frequently asked questions"
    >
      <div className="mx-auto grid max-w-5xl gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        <Reveal className="lg:col-span-1">
          <BentoCard gradient="dark" className="p-8 h-full min-h-[240px]">
            <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-copper/20 blur-3xl" />
            <div className="relative">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Support</span>
              <h3 className="mt-5 font-display text-2xl font-black leading-tight">
                Still have questions?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Our team responds within 2 business hours.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-sm font-bold text-espresso"
              >
                Talk to us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </BentoCard>
        </Reveal>

        <div className="grid gap-3 sm:gap-4 lg:col-span-2">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <BentoCard className="p-0 h-full">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <span className="font-display text-base font-bold text-espresso sm:text-lg">{f.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-espresso text-copper transition-transform">
                    {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {open === i && (
                  <div className="border-t border-espresso/8 px-5 py-4 text-sm leading-relaxed text-foreground/70 sm:px-6">
                    {f.a}
                  </div>
                )}
              </BentoCard>
            </Reveal>
          ))}
        </div>
      </div>
    </BentoSection>
  );
}

/* ---------- 8. Contact Bento ---------- */

function ContactBento() {
  return (
    <BentoSection
      eyebrow="Get in Touch"
      title="Let's build something remarkable"
      desc="Tell us about your project. We'll respond within 2 business hours."
      tone="sand"
    >
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
        {/* Form */}
        <Reveal className="lg:col-span-2 lg:row-span-2">
          <BentoCard className="p-7 sm:p-9 h-full min-h-[420px]">
            <h3 className="font-display text-2xl font-black text-espresso">Send us a message</h3>
            <p className="mt-1 text-sm text-foreground/60">Fill the form and our team will be in touch.</p>
            <form className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input placeholder="Full name" className="rounded-2xl border border-espresso/12 bg-sand/40 px-4 py-3 text-sm outline-none transition focus:border-cocoa focus:bg-white" />
                <input placeholder="Email address" type="email" className="rounded-2xl border border-espresso/12 bg-sand/40 px-4 py-3 text-sm outline-none transition focus:border-cocoa focus:bg-white" />
              </div>
              <input placeholder="Company / Subject" className="rounded-2xl border border-espresso/12 bg-sand/40 px-4 py-3 text-sm outline-none transition focus:border-cocoa focus:bg-white" />
              <textarea placeholder="Tell us about your project…" rows={5} className="rounded-2xl border border-espresso/12 bg-sand/40 px-4 py-3 text-sm outline-none transition focus:border-cocoa focus:bg-white" />
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-sm font-bold text-white transition hover:bg-cocoa">
                Send Message <Send className="h-4 w-4" />
              </button>
            </form>
          </BentoCard>
        </Reveal>

        {/* Info card */}
        <Reveal delay={80}>
          <BentoCard gradient="teal" className="p-7 h-full min-h-[200px]">
            <IconTile icon={MapPin} tone="lime" />
            <p className="mt-4 font-display text-lg font-black">Head Office</p>
            <p className="mt-1 text-sm leading-relaxed text-white/70">
              2nd Floor, Malik Plaza,<br />Hassan Road, Jaranwala,<br />Faisalabad, Pakistan
            </p>
          </BentoCard>
        </Reveal>

        <Reveal delay={120}>
          <BentoCard gradient="lime" className="p-7 h-full min-h-[200px]">
            <IconTile icon={Phone} tone="dark" />
            <p className="mt-4 font-display text-lg font-black text-espresso">USA Direct</p>
            <a href="tel:+17207941888" className="mt-1 block text-lg font-bold text-espresso">+1 720 794 1888</a>
            <p className="mt-2 flex items-center gap-2 text-xs text-espresso/70">
              <Mail className="h-3 w-3" /> Info@adphira.com
            </p>
          </BentoCard>
        </Reveal>

        <Reveal delay={160} className="lg:col-span-2">
          <BentoCard className="p-6 h-full min-h-[130px]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <IconTile icon={Clock} />
                <div>
                  <p className="font-display text-base font-black text-espresso">Working Hours</p>
                  <p className="text-sm text-foreground/60">Mon – Sat · 9:00 AM – 8:00 PM (PKT) · 24/7 Support</p>
                </div>
              </div>
              <div className="flex gap-2">
                {[Instagram, Facebook, Linkedin, Twitter].map((I, i) => (
                  <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-espresso/12 text-espresso transition hover:bg-espresso hover:text-copper">
                    <I className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </BentoCard>
        </Reveal>
      </div>
    </BentoSection>
  );
}

/* ---------- Final CTA banner ---------- */

function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <BentoCard gradient="dark" className="p-8 sm:p-14 text-center">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-copper/25 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-cocoa/40 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest">
              <Play className="h-3 w-3 fill-copper text-copper" /> Ready when you are
            </span>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight sm:text-5xl">
              Let's turn your idea into<br className="hidden sm:block" /> a{" "}
              <span className="text-copper">world-class product.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Free 30-minute strategy call. No sales pressure — just concrete advice from senior engineers.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3.5 text-sm font-bold text-espresso transition hover:brightness-105">
                Book Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+17207941888" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
                <Phone className="h-4 w-4" /> +1 720 794 1888
              </a>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
}

/* ---------- Export ---------- */

export function BentoHome() {
  return (
    <>
      <ServicesBento />
      <WhyBento />
      <TechBento />
      <ProcessBento />
      <PortfolioBento />
      <TestimonialsBento />
      <FAQBento />
      <ContactBento />
      <CTABanner />
    </>
  );
}