import { createFileRoute } from "@tanstack/react-router";
import { useApplyPageSeo } from "@/lib/page-seo";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { useLiveList } from "@/lib/use-live-list";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Leadership — AYMOXI LLC" },
      { name: "description", content: "Meet the founders leading AYMOXI LLC — Shafqat Rasool and Noman." },
      { property: "og:title", content: "Leadership — AYMOXI LLC" },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

type Member = {
  id: string; name: string; role_title: string | null; bio: string | null;
  photo_url: string | null; email: string | null; linkedin_url: string | null; twitter_url: string | null;
};

function TeamPage() {
  useApplyPageSeo("/team");
  const { rows, loading } = useLiveList<Member>("team_members", { orderBy: { column: "sort_order" } });

  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="Meet the founders behind AYMOXI."
        description="A focused leadership team combining vision, engineering excellence and disciplined delivery."
      />
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          {loading ? (
            <div className="grid place-items-center py-24 text-sm text-foreground/50">Loading team…</div>
          ) : rows.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-espresso/20 p-12 text-center text-sm text-foreground/50">No team members published yet.</div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2">
              {rows.map((m, i) => (
                <Reveal key={m.id} delay={i * 120}>
                  <div className="group relative h-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition duration-500 hover:-translate-y-2 hover:shadow-luxury">
                    <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                      {m.photo_url ? (
                        <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                      ) : (
                        <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#2e6b16] to-[#0a2205]">
                          <span className="font-display text-6xl font-black text-copper">{m.name.slice(0, 1)}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-transparent opacity-70 transition group-hover:opacity-90" />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-copper">{m.role_title}</p>
                        <p className="mt-1 font-display text-2xl font-bold">{m.name}</p>
                      </div>
                      <div className="absolute right-4 top-4 flex translate-y-2 gap-2 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        {m.linkedin_url && (
                          <a href={m.linkedin_url} target="_blank" rel="noreferrer" aria-label={`${m.name} on LinkedIn`} className="grid h-9 w-9 place-items-center rounded-full bg-cream/95 text-espresso hover:bg-copper">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {m.twitter_url && (
                          <a href={m.twitter_url} target="_blank" rel="noreferrer" aria-label={`${m.name} on Twitter`} className="grid h-9 w-9 place-items-center rounded-full bg-cream/95 text-espresso hover:bg-copper">
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        {m.email && (
                          <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}`} className="grid h-9 w-9 place-items-center rounded-full bg-cream/95 text-espresso hover:bg-copper">
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="p-7">
                      {m.bio && <p className="text-sm leading-relaxed text-foreground/75">{m.bio}</p>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
