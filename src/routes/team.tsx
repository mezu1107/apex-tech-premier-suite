import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import a1 from "@/assets/avatar1.jpg";
import a2 from "@/assets/avatar2.jpg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Leadership — Adphira LLC" },
      { name: "description", content: "Meet the founders leading Adphira LLC — Shafqat Rasool and Noman." },
      { property: "og:title", content: "Leadership — Adphira LLC" },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

const team = [
  {
    name: "Shafqat Rasool",
    role: "Founder & CEO",
    img: a1,
    bio: "Visionary leader driving Adphira's mission to empower businesses with smart technology, scalable software and world-class digital experiences.",
    skills: ["Leadership", "Strategy", "Product"],
  },
  {
    name: "Noman",
    role: "Co-Founder & Managing Director",
    img: a2,
    bio: "Operations and delivery lead ensuring every Adphira engagement ships on time, on budget and to the highest engineering standard.",
    skills: ["Operations", "Delivery", "Growth"],
  },
];

function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="Meet the founders behind Adphira."
        description="A focused leadership team combining vision, engineering excellence and disciplined delivery."
      />
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="grid gap-8 sm:grid-cols-2">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 120}>
                <div className="group relative h-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition duration-500 hover:-translate-y-2 hover:shadow-luxury">
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-transparent opacity-70 transition group-hover:opacity-90" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-copper">{m.role}</p>
                      <p className="mt-1 font-display text-2xl font-bold">{m.name}</p>
                    </div>
                    <div className="absolute right-4 top-4 flex translate-y-2 gap-2 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {[Linkedin, Twitter, Mail].map((Ic, j) => (
                        <a
                          key={j}
                          href={Ic === Mail ? "mailto:Info@adphira.com" : "#"}
                          className="grid h-9 w-9 place-items-center rounded-full bg-cream/95 text-espresso hover:bg-copper"
                          aria-label="social"
                        >
                          <Ic className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="p-7">
                    <p className="text-sm leading-relaxed text-foreground/75">{m.bio}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {m.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-sand px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-espresso/80"
                        >
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
