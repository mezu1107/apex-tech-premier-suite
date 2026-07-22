import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Phone, Loader2, ArrowLeft, Sparkles, Code2, Smartphone, Cloud, Shield, Search, Megaphone, Users, Palette, Database, ShoppingCart, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/site/Reveal";

const PHONE = "+1 720 794 1888";

const iconMap: Record<string, LucideIcon> = {
  Code2, Smartphone, Sparkles, Cloud, Shield, Search, Megaphone, Users, Palette, Database, ShoppingCart,
};

type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string | null;
  icon: string | null;
  tags: string[] | null;
  hero_image: string | null;
};

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Service — Adphira LLC` },
      { name: "description", content: `Dedicated ${params.slug.replace(/-/g, " ")} service by Adphira LLC.` },
      { property: "og:title", content: `Service — Adphira LLC` },
    ],
  }),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const [service, setService] = useState<Service | null>(null);
  const [related, setRelated] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const { data } = await supabase
        .from("services")
        .select("id,title,slug,description,long_description,icon,tags,hero_image")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (cancelled) return;
      if (!data) { setMissing(true); setLoading(false); return; }
      setService(data as Service);
      const { data: rel } = await supabase
        .from("services")
        .select("id,title,slug,description,long_description,icon,tags,hero_image")
        .eq("published", true)
        .neq("slug", slug)
        .order("sort_order", { ascending: true })
        .limit(6);
      if (!cancelled) setRelated((rel as Service[]) ?? []);
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return <div className="grid min-h-[60vh] place-items-center pt-32"><Loader2 className="h-6 w-6 animate-spin text-cocoa" /></div>;
  }

  if (missing || !service) {
    throw notFound();
  }

  const Icon = iconMap[service.icon ?? ""] ?? Sparkles;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#06363a] via-[#082a2c] to-[#04191b] pt-32 pb-20 text-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-copper/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <Link to="/services" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-copper">
              <ArrowLeft className="h-3.5 w-3.5" /> All Services
            </Link>
          </Reveal>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <Reveal>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-copper text-espresso">
                  <Icon className="h-6 w-6" />
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display text-4xl font-black leading-tight sm:text-5xl">{service.title}</h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{service.description}</p>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-bold text-espresso hover:bg-white">
                    Start a project <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
                    <Phone className="h-4 w-4" /> {PHONE}
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a4b4f] to-[#04191b]">
                {service.hero_image ? (
                  <img src={service.hero_image} alt={service.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center">
                    <Icon className="h-24 w-24 text-copper/60" />
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Long description + features */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
          <Reveal>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cocoa">Overview</span>
              <h2 className="mt-2 font-display text-3xl font-black text-espresso sm:text-4xl">What you get</h2>
              <div className="prose prose-espresso mt-5 max-w-none text-base leading-relaxed text-foreground/75">
                {(service.long_description ?? service.description).split("\n").map((p, i) => (
                  <p key={i} className="mb-4">{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-3xl border border-espresso/10 bg-sand/40 p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cocoa">Includes</p>
              <ul className="mt-4 space-y-3 text-sm">
                {(service.tags ?? []).map((t) => (
                  <li key={t} className="flex items-start gap-2 text-espresso/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cocoa" /> {t}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-5 py-3 text-sm font-bold text-white hover:bg-cocoa">
                Request a quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-sand/40 py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
              <h3 className="font-display text-2xl font-black text-espresso sm:text-3xl">Related Services</h3>
              <Link to="/services" className="text-sm font-bold text-cocoa hover:text-espresso">View all →</Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const RIcon = iconMap[r.icon ?? ""] ?? Sparkles;
                return (
                  <Link
                    key={r.id}
                    to="/services/$slug"
                    params={{ slug: r.slug }}
                    className="group h-full rounded-3xl border border-espresso/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-espresso text-copper">
                      <RIcon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 font-display text-lg font-black text-espresso">{r.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-foreground/65">{r.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-cocoa">
                      Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
