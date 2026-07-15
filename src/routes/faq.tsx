import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Apex Technologies" },
      { name: "description", content: "Answers to common questions about working with Apex." },
      { property: "og:title", content: "FAQ — Apex Technologies" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQPage,
});

const faqs = [
  { cat: "General", q: "What kind of clients do you work with?", a: "From venture-backed startups to Fortune 500 enterprises. We choose engagements where craft and impact matter." },
  { cat: "General", q: "Where are you based?", a: "London (HQ), Dubai and Singapore, with a fully remote-friendly team across 12 countries." },
  { cat: "Process", q: "How long does a typical project take?", a: "MVPs land in 6–10 weeks. Full platforms typically 3–6 months. We share detailed timelines during discovery." },
  { cat: "Process", q: "Do you sign NDAs?", a: "Absolutely. We routinely operate under NDAs, DPAs and custom MSAs." },
  { cat: "Pricing", q: "How do you price projects?", a: "Fixed-scope, retainer, or dedicated squad — whichever aligns best with your goals and risk profile." },
  { cat: "Pricing", q: "Do you offer maintenance?", a: "Yes. Every launch includes a 30-day warranty; ongoing SLAs are available." },
  { cat: "Support", q: "What kind of support do you provide?", a: "Business-hours support on all plans; 24/7 on Enterprise with a named account manager." },
  { cat: "Support", q: "Who owns the code?", a: "You do. 100%. We ship you clean repositories, docs and infrastructure diagrams." },
];

const cats = ["All", "General", "Process", "Pricing", "Support"] as const;

function FAQPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = faqs.filter(
    (f) => (cat === "All" || f.cat === cat) && (q === "" || (f.q + f.a).toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <>
      <PageHeader eyebrow="FAQ" title="Everything you might want to know." description="Can't find your answer? We reply to every message within one business day." />

      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-5 py-3 shadow-soft">
              <Search className="h-4 w-4 text-espresso/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search questions..."
                className="w-full bg-transparent text-sm focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  cat === c ? "bg-cocoa text-cream" : "border border-border bg-card text-espresso hover:border-copper"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            {filtered.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft transition hover:border-copper"
                >
                  <div className="flex items-center justify-between gap-4 p-5">
                    <span className="font-display font-bold text-espresso">{f.q}</span>
                    <Plus className={`h-5 w-5 shrink-0 text-copper transition ${open === i ? "rotate-45" : ""}`} />
                  </div>
                  <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-foreground/70">{f.a}</p>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-sm text-foreground/60">No results — try a different search.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
