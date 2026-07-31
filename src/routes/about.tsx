import { createFileRoute, Link } from "@tanstack/react-router";
import { useApplyPageSeo } from "@/lib/page-seo";
import { Target, Eye, Heart, Award, Sparkles, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import whyImg from "@/assets/why-choose.png";
import avatar1 from "@/assets/avatar1.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AYMOXI LLC" },
      { name: "description", content: "The story, mission and values behind AYMOXI LLC." },
      { property: "og:title", content: "About — AYMOXI LLC" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Mission", desc: "Ship elegant, reliable software that compounds business value year over year." },
  { icon: Eye, title: "Vision", desc: "A world where every ambitious team ships like a top 1% product company." },
  { icon: Heart, title: "Values", desc: "Craft, honesty, curiosity, and radical ownership from kickoff to launch." },
];

const timeline = [
  { year: "2013", title: "Founded in London", desc: "Three engineers, one workshop, a promise: no shortcuts." },
  { year: "2016", title: "First 50 clients", desc: "Ecommerce, fintech and logistics teams choose AYMOXI." },
  { year: "2019", title: "AI practice launched", desc: "Dedicated AI/ML studio delivering measurable outcomes." },
  { year: "2022", title: "Global expansion", desc: "Offices in Dubai and Singapore, 42 countries served." },
  { year: "2026", title: "250+ products shipped", desc: "Trusted by scale-ups and enterprise leaders alike." },
];

function AboutPage() {
  useApplyPageSeo("/about");
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A boutique studio, engineered for scale."
        description="AYMOXI LLC is a team of senior engineers, designers and strategists building premium software for the world's most ambitious brands."
      />

      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <Reveal variant="left">
            <div className="rounded-[2.5rem] bg-gradient-to-br from-sand via-cream to-sand/50 p-8">
              <img src={whyImg} alt="AYMOXI workspace" className="mx-auto w-full max-w-md drop-shadow-2xl" />
            </div>
          </Reveal>
          <Reveal variant="right">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cocoa">Our story</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-espresso sm:text-4xl">Craftsmanship meets code.</h2>
            <p className="mt-5 leading-relaxed text-foreground/70">
              We started AYMOXI in 2013 with a simple idea: software should feel as considered as the products people love. Thirteen years later, we've shipped 250+ products for founders, fortune-500s and everything in between.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/70">
              Every engagement pairs a senior product designer with senior engineers, a dedicated project lead, and a rigorous review process — so quality is never a compromise.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-luxury">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-copper/15 text-cocoa">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-espresso">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="text-center">
            <Reveal><p className="text-xs font-semibold uppercase tracking-[0.3em] text-cocoa">Our Journey</p></Reveal>
            <Reveal delay={100}><h2 className="mt-3 font-display text-3xl font-bold text-espresso sm:text-5xl">A decade of premium software</h2></Reveal>
          </div>
          <div className="relative mt-14 space-y-8 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-copper/30 sm:before:left-1/2">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 80}>
                <div className={`relative flex flex-col gap-4 sm:flex-row ${i % 2 ? "sm:flex-row-reverse" : ""}`}>
                  <div className="sm:w-1/2 sm:px-6">
                    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                      <p className="text-xs font-semibold uppercase tracking-widest text-cocoa">{t.year}</p>
                      <h3 className="mt-2 font-display text-xl font-bold text-espresso">{t.title}</h3>
                      <p className="mt-2 text-sm text-foreground/70">{t.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 top-6 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-copper ring-4 ring-cream sm:left-1/2" />
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <div className="overflow-hidden rounded-[2.5rem] bg-espresso p-10 text-cream shadow-luxury sm:p-14 lg:p-20">
              <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
                <img src={avatar1} alt="Shafqat Rasool, Founder & CEO of AYMOXI LLC" className="h-32 w-32 rounded-full object-cover ring-4 ring-copper/40" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cocoa">CEO Message</p>
                  <blockquote className="mt-4 font-display text-2xl leading-snug text-cream sm:text-3xl">
                    "Great software is a form of respect — for users, for teams, for the future. That's the standard we bring to every engagement."
                  </blockquote>
                  <p className="mt-6 font-display text-lg font-bold">Shafqat Rasool</p>
                  <p className="text-sm text-cream/70">Founder & CEO, AYMOXI LLC</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, label: "Clutch Top 100" },
              { icon: Sparkles, label: "AWS Partner" },
              { icon: Award, label: "ISO 27001" },
              { icon: Sparkles, label: "Google Cloud" },
            ].map((a, i) => (
              <Reveal key={a.label} delay={i * 80}>
                <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sand text-cocoa">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <p className="font-display font-bold text-espresso">{a.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-14 text-center">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-cocoa px-10 py-4 text-sm font-semibold text-cream shadow-luxury hover:bg-espresso">
                Work with us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
