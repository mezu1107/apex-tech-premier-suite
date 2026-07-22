import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useLiveList<T extends { id: string }>(
  table: string,
  opts: { orderBy?: { column: string; ascending?: boolean }; filterPublished?: boolean } = {},
) {
  const { orderBy, filterPublished = true } = opts;
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let q: any = (supabase.from as any)(table).select("*");
      if (filterPublished) q = q.eq("published", true);
      if (orderBy) q = q.order(orderBy.column, { ascending: orderBy.ascending ?? true });
      const { data } = await q;
      if (!cancelled) {
        setRows(((data as T[] | null) ?? []));
        setLoading(false);
      }
    }
    load();

    const channel = supabase
      .channel(`live-${table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => load(),
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  return { rows, loading };
}
