import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import bannerImg from "@/assets/banner-tech.jpg";
import heroImg from "@/assets/hero-tech.png";
import whyImg from "@/assets/why-choose.png";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Adphira LLC" },
      { name: "description", content: "Selected work: websites, mobile apps, AI and enterprise platforms." },
      { property: "og:title", content: "Portfolio — Adphira LLC" },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

const categories = ["All", "Web", "Apps", "AI", "Branding", "ERP", "POS"] as const;

const projects = [
  { title: "Northwind Commerce", cat: "Web", img: heroImg, client: "Northwind Retail" },
  { title: "Fable Logistics AI", cat: "AI", img: bannerImg, client: "Fable Logistics" },
  { title: "Bloom Studio Brand", cat: "Branding", img: whyImg, client: "Bloom Studio" },
  { title: "Orion Mobile Banking", cat: "Apps", img: heroImg, client: "Orion Financial" },
  { title: "Lumen ERP Platform", cat: "ERP", img: whyImg, client: "Lumen Group" },
  { title: "Atlas Retail POS", cat: "POS", img: bannerImg, client: "Atlas Retail" },
  { title: "Vertex Analytics", cat: "Web", img: heroImg, client: "Vertex Data" },
  { title: "Helix Health App", cat: "Apps", img: whyImg, client: "Helix Health" },
  { title: "Copper AI Assistant", cat: "AI", img: bannerImg, client: "Copper Labs" },
];

function PortfolioPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <>
      <PageHeader eyebrow="Portfolio" title="Selected work, obsessed over." description="A glimpse of the products, platforms and brands we've had the privilege to craft." />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  filter === c ? "bg-cocoa text-cream shadow-soft" : "border border-border bg-card text-espresso hover:border-copper"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 80}>
                <a href="#" className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-luxury">
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                    <img src={p.img} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-cream/90 text-espresso opacity-0 transition group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-cocoa">{p.cat}</p>
                    <h3 className="mt-2 font-display text-xl font-bold text-espresso">{p.title}</h3>
                    <p className="mt-1 text-sm text-foreground/60">{p.client}</p>
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
