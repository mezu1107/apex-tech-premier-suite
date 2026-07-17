import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Adphira LLC" },
      { name: "description", content: "Transparent pricing for Starter, Professional and Enterprise engagements." },
      { property: "og:title", content: "Pricing — Adphira LLC" },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

const plans = [
  { name: "Starter", monthly: 2500, yearly: 25000, tag: "For early-stage teams", features: ["Landing site or MVP", "1 senior engineer", "Weekly reviews", "Basic analytics"], missing: ["Dedicated PM", "24/7 support"] },
  { name: "Professional", monthly: 6500, yearly: 65000, tag: "For scaling companies", featured: true, features: ["Full product build", "3 senior engineers", "Product designer", "Dedicated PM", "Priority support"], missing: ["24/7 support"] },
  { name: "Enterprise", monthly: 12000, yearly: 120000, tag: "For enterprise teams", features: ["Custom scope", "Dedicated squad", "Security & compliance", "24/7 support", "SLA & DPA"], missing: [] },
];

function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <PageHeader eyebrow="Pricing" title="Simple, transparent pricing." description="Choose a plan that fits your stage. Every plan gets senior-only talent." />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex justify-center">
            <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-soft">
              <button
                onClick={() => setYearly(false)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${!yearly ? "bg-cocoa text-cream" : "text-espresso"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${yearly ? "bg-cocoa text-cream" : "text-espresso"}`}
              >
                Yearly · Save 17%
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl border p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-luxury ${
                    p.featured ? "border-copper bg-espresso text-cream" : "border-border bg-card"
                  }`}
                >
                  {p.featured && (
                    <span className="absolute -top-3 right-6 rounded-full bg-copper px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-espresso">
                      Most popular
                    </span>
                  )}
                  <p className={`text-xs font-semibold uppercase tracking-widest ${p.featured ? "text-copper" : "text-copper"}`}>{p.name}</p>
                  <p className={`mt-2 text-sm ${p.featured ? "text-cream/70" : "text-foreground/60"}`}>{p.tag}</p>
                  <p className="mt-6 font-display text-5xl font-extrabold">
                    ${(yearly ? p.yearly : p.monthly).toLocaleString()}
                    <span className={`text-sm font-normal ${p.featured ? "text-cream/60" : "text-foreground/50"}`}>/{yearly ? "yr" : "mo"}</span>
                  </p>
                  <ul className="mt-8 flex-1 space-y-3 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className={`h-4 w-4 ${p.featured ? "text-copper" : "text-copper"}`} /> {f}
                      </li>
                    ))}
                    {p.missing.map((f) => (
                      <li key={f} className={`flex items-center gap-2 ${p.featured ? "text-cream/40" : "text-foreground/40"}`}>
                        <X className="h-4 w-4" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                      p.featured ? "bg-copper text-espresso hover:bg-cream" : "bg-cocoa text-cream hover:bg-espresso"
                    }`}
                  >
                    Get started
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
