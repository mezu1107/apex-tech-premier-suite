import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Calendar, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/hero-tech.png";
import whyImg from "@/assets/why-choose.png";
import bannerImg from "@/assets/banner-tech.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Adphira LLC" },
      { name: "description", content: "Insights on software, AI, product and design." },
      { property: "og:title", content: "Blog — Adphira LLC" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const posts = [
  { title: "Designing AI products people actually love", cat: "AI", date: "Jun 12, 2026", img: bannerImg, excerpt: "The design patterns and evaluation loops behind AI features that stick." },
  { title: "How we ship at 10x speed without cutting corners", cat: "Process", date: "May 28, 2026", img: heroImg, excerpt: "A look inside our review process, tooling and team rituals." },
  { title: "The state of headless commerce in 2026", cat: "Ecommerce", date: "May 10, 2026", img: whyImg, excerpt: "What's working, what's noise, and where we'd place our bets." },
  { title: "Postgres at scale: 12 lessons from 10 years", cat: "Engineering", date: "Apr 22, 2026", img: heroImg, excerpt: "Indexes, partitions, and the boring stuff that saves millions." },
  { title: "Design systems that actually get adopted", cat: "Design", date: "Apr 04, 2026", img: whyImg, excerpt: "Documentation, DX, and the politics of tokens." },
  { title: "Why we still love React in 2026", cat: "Engineering", date: "Mar 18, 2026", img: bannerImg, excerpt: "A pragmatic take on the modern React ecosystem." },
];

const cats = ["All", "AI", "Engineering", "Design", "Process", "Ecommerce"];

function BlogPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const visible = posts.filter(
    (p) => (cat === "All" || p.cat === cat) && (q === "" || p.title.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <>
      <PageHeader eyebrow="Blog" title="Notes from the workshop." description="Field-tested ideas on building premium software." />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
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
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 shadow-soft sm:w-72">
              <Search className="h-4 w-4 text-espresso/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-transparent text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 80}>
                <a href="#" className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-luxury">
                  <div className="aspect-[16/10] overflow-hidden bg-sand">
                    <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs text-foreground/60">
                      <span className="rounded-full bg-sand px-2.5 py-1 font-semibold uppercase tracking-widest text-espresso/80">{p.cat}</span>
                      <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-espresso">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-foreground/70">{p.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-copper">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
