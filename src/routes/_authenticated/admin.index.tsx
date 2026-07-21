import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Wrench, Briefcase, Star, Users, MessageSquare, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

const cards = [
  { table: "services", label: "Services", icon: Wrench, to: "/admin/services" },
  { table: "portfolio", label: "Portfolio", icon: Briefcase, to: "/admin/portfolio" },
  { table: "testimonials", label: "Testimonials", icon: Star, to: "/admin/testimonials" },
  { table: "team_members", label: "Team", icon: Users, to: "/admin/team" },
  { table: "contact_messages", label: "Messages", icon: MessageSquare, to: "/admin/messages" },
] as const;

function Dashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      const entries = await Promise.all(cards.map(async (c) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { count } = await (supabase.from as any)(c.table).select("*", { count: "exact", head: true });
        return [c.table, count ?? 0] as const;
      }));
      setCounts(Object.fromEntries(entries));
    })();
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-espresso">Dashboard</h1>
      <p className="mt-1 text-sm text-foreground/60">Everything you publish here goes live on the site instantly.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <Link key={c.table} to={c.to as any} className="group rounded-3xl border border-espresso/10 bg-white p-6 transition hover:-translate-y-1 hover:border-cocoa/40 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-espresso text-copper">
                <c.icon className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-foreground/40 transition group-hover:translate-x-1 group-hover:text-espresso" />
            </div>
            <p className="mt-5 font-display text-3xl font-black text-espresso">{counts[c.table] ?? "—"}</p>
            <p className="mt-1 text-sm font-semibold text-foreground/70">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}