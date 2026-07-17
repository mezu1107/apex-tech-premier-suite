import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Twitter, Github } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import a1 from "@/assets/avatar1.jpg";
import a2 from "@/assets/avatar2.jpg";
import a3 from "@/assets/avatar3.jpg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Adphira LLC" },
      { name: "description", content: "Meet the engineers, designers and strategists behind Adphira LLC." },
      { property: "og:title", content: "Our Team — Adphira LLC" },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

const team = [
  { name: "Amelia Carter", role: "Founder & CEO", img: a1, bio: "20 years shipping product at retail, fintech and SaaS.", skills: ["Strategy", "Product"] },
  { name: "Marcus Reyes", role: "CTO", img: a2, bio: "Scaled platforms to 100M+ users. Cloud & AI specialist.", skills: ["Cloud", "AI"] },
  { name: "Zara Okafor", role: "Head of Design", img: a3, bio: "Award-winning UI/UX designer, ex-IDEO.", skills: ["UX", "Systems"] },
  { name: "Daniel Kim", role: "Project Manager", img: a2, bio: "Ships complex products on time, every time.", skills: ["Delivery", "Agile"] },
  { name: "Priya Shah", role: "Frontend Lead", img: a3, bio: "React, TypeScript and design-system perfectionist.", skills: ["React", "TS"] },
  { name: "Lucas Meier", role: "Backend Lead", img: a2, bio: "Distributed systems, Postgres, Kubernetes.", skills: ["Go", "K8s"] },
  { name: "Sana Iqbal", role: "Mobile Lead", img: a1, bio: "iOS/Android and React Native expert.", skills: ["Swift", "RN"] },
  { name: "Noah Bennett", role: "AI Engineer", img: a2, bio: "LLM applications, retrieval and evaluation.", skills: ["LLM", "ML"] },
  { name: "Elena Rossi", role: "QA Lead", img: a3, bio: "Playwright, Cypress and rock-solid pipelines.", skills: ["QA", "CI"] },
  { name: "Omar Farouk", role: "DevOps", img: a2, bio: "Zero-downtime deploys and cost optimization.", skills: ["AWS", "IaC"] },
  { name: "Ines Martins", role: "Marketing Lead", img: a1, bio: "B2B growth, positioning and content strategy.", skills: ["Growth", "SEO"] },
  { name: "Kenji Watanabe", role: "Product Designer", img: a2, bio: "Motion and interaction design.", skills: ["Figma", "Motion"] },
];

function TeamPage() {
  return (
    <>
      <PageHeader eyebrow="Our Team" title="Senior. Curious. Kind." description="A tight-knit team of specialists who genuinely love what they build." />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={(i % 4) * 80}>
                <div className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-luxury">
                  <div className="relative aspect-square overflow-hidden bg-sand">
                    <img src={m.img} alt={m.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 p-4 opacity-0 transition group-hover:opacity-100">
                      {[Linkedin, Twitter, Github].map((Ic, j) => (
                        <a key={j} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-espresso hover:bg-copper hover:text-espresso">
                          <Ic className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-display text-lg font-bold text-espresso">{m.name}</p>
                    <p className="text-xs font-semibold uppercase tracking-widest text-copper">{m.role}</p>
                    <p className="mt-3 text-sm text-foreground/70">{m.bio}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {m.skills.map((s) => (
                        <span key={s} className="rounded-full bg-sand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-espresso/80">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
