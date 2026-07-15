import { createFileRoute, Link } from "@tanstack/react-router";
import { Code2, Smartphone, Palette, Sparkles, Cloud, Shield, Search, Megaphone, Database, ShoppingCart, Users, Wrench, ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Apex Technologies" },
      { name: "description", content: "Web, mobile, AI, cloud, security and design services from Apex Technologies." },
      { property: "og:title", content: "Services — Apex Technologies" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const list = [
  { icon: Code2, title: "Web Development", desc: "Modern, blazing-fast websites and web apps.", features: ["React & Next.js", "Headless CMS", "Edge deployment"] },
  { icon: Smartphone, title: "Mobile Apps", desc: "iOS, Android and cross-platform.", features: ["Swift / Kotlin", "React Native", "Offline-first"] },
  { icon: Palette, title: "UI / UX Design", desc: "Design systems that scale beautifully.", features: ["Figma libraries", "Prototyping", "Accessibility"] },
  { icon: Sparkles, title: "AI Solutions", desc: "LLMs, ML and automation with real ROI.", features: ["Chatbots", "Predictive ML", "Vision AI"] },
  { icon: Cloud, title: "Cloud Computing", desc: "AWS, GCP and Azure done right.", features: ["Kubernetes", "Serverless", "Cost tuning"] },
  { icon: Shield, title: "Cyber Security", desc: "Audits, hardening and compliance.", features: ["Pen testing", "SOC 2", "GDPR"] },
  { icon: Search, title: "SEO", desc: "Rank for the queries that grow revenue.", features: ["Tech SEO", "Content", "Analytics"] },
  { icon: Megaphone, title: "Digital Marketing", desc: "Paid and organic growth engines.", features: ["Google Ads", "LinkedIn", "Attribution"] },
  { icon: Database, title: "ERP Systems", desc: "Unified operations for growing teams.", features: ["Custom modules", "Integrations", "Reporting"] },
  { icon: Users, title: "CRM Development", desc: "Sales pipelines built around your workflow.", features: ["Automation", "AI insights", "Mobile CRM"] },
  { icon: ShoppingCart, title: "POS Software", desc: "Retail and hospitality POS platforms.", features: ["Offline mode", "Multi-store", "Inventory"] },
  { icon: Wrench, title: "Custom Software", desc: "Bespoke platforms for unique problems.", features: ["Discovery", "MVP → scale", "24/7 support"] },
];

function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Services" title="Everything you need. Nothing you don't." description="A single premium partner for design, engineering, AI, cloud and growth." />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map(({ icon: Icon, title, desc, features }, i) => (
              <Reveal key={title} delay={(i % 3) * 100}>
                <div className="group flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:-translate-y-1 hover:border-copper/40 hover:shadow-luxury">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-espresso text-cream transition group-hover:bg-copper">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-espresso">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{desc}</p>
                  <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-copper" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-copper">
                    Discuss project <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
