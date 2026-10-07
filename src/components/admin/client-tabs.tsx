import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Trash2, Send, Bell } from "lucide-react";

export const input = "w-full rounded-xl border border-espresso/12 bg-sand/40 px-3 py-2.5 text-sm outline-none focus:border-cocoa focus:bg-white";
export const label = "text-[10px] font-semibold uppercase tracking-widest text-espresso/60";
export function useTable<T extends { id: string }>(table: string, clientId: string, orderBy = "created_at") {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from as any)(table).select("*").eq("client_id", clientId).order(orderBy, { ascending: false });
    setRows((data as T[]) ?? []);
    setLoading(false);
  }, [table, clientId, orderBy]);
  useEffect(() => { load(); }, [load]);
  return { rows, loading, reload: load };
}

export async function insertRow(table: string, payload: Record<string, unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from as any)(table).insert(payload);
  if (error) alert(error.message);
  return !error;
}

export async function deleteRow(table: string, id: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from as any)(table).delete().eq("id", id);
  if (error) alert(error.message);
}

export function Row({ children, onDelete }: { children: React.ReactNode; onDelete: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl border border-espresso/10 bg-sand/30 p-4">
      <div className="min-w-0 flex-1">{children}</div>
      <button onClick={onDelete} className="shrink-0 rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></button>
    </div>
  );
}

export function TasksTab({ clientId }: { clientId: string }) {
  const { rows, loading, reload } = useTable<{ id: string; title: string; status: string; priority: string; assignee: string | null; due_date: string | null }>("client_tasks", clientId);
  const [f, setF] = useState({ title: "", description: "", status: "todo", priority: "medium", assignee: "", due_date: "", progress: 0 });

  return (
    <div className="space-y-4">
      <form className="grid gap-3 rounded-2xl border border-espresso/12 p-4 sm:grid-cols-2"
        onSubmit={async (e) => { e.preventDefault(); const ok = await insertRow("client_tasks", { client_id: clientId, ...f, due_date: f.due_date || null, assignee: f.assignee || null }); if (ok) { setF({ ...f, title: "", description: "" }); reload(); } }}>
        <div className="sm:col-span-2"><label className={label}>Task title</label><input required value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} className={`mt-1 ${input}`} /></div>
        <div className="sm:col-span-2"><label className={label}>Description</label><textarea rows={2} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} className={`mt-1 ${input}`} /></div>
        <div><label className={label}>Status</label><select value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })} className={`mt-1 ${input}`}>{["todo", "in_progress", "review", "done"].map((s) => <option key={s}>{s}</option>)}</select></div>
        <div><label className={label}>Priority</label><select value={f.priority} onChange={(e) => setF({ ...f, priority: e.target.value })} className={`mt-1 ${input}`}>{["low", "medium", "high", "urgent"].map((s) => <option key={s}>{s}</option>)}</select></div>
        <div><label className={label}>Assignee</label><input value={f.assignee} onChange={(e) => setF({ ...f, assignee: e.target.value })} className={`mt-1 ${input}`} /></div>
        <div><label className={label}>Due date</label><input type="date" value={f.due_date} onChange={(e) => setF({ ...f, due_date: e.target.value })} className={`mt-1 ${input}`} /></div>
        <div className="sm:col-span-2"><button className="inline-flex items-center gap-2 rounded-full bg-espresso px-4 py-2 text-xs font-bold text-white"><Plus className="h-3.5 w-3.5" /> Add task</button></div>
      </form>

      {loading ? <Loader2 className="mx-auto h-5 w-5 animate-spin text-cocoa" /> : rows.map((t) => (
        <Row key={t.id} onDelete={async () => { await deleteRow("client_tasks", t.id); reload(); }}>
          <p className="text-sm font-bold text-espresso">{t.title}</p>
          <p className="text-xs text-foreground/60">{t.status} · {t.priority}{t.assignee ? ` · ${t.assignee}` : ""}{t.due_date ? ` · due ${t.due_date}` : ""}</p>
        </Row>
      ))}
    </div>
  );
}

export function MessagesTab({ clientId }: { clientId: string }) {
  const { rows, loading, reload } = useTable<{ id: string; subject: string; body: string; is_read: boolean; created_at: string }>("client_messages", clientId);
  const [f, setF] = useState({ subject: "", body: "", important: false });

  return (
    <div className="space-y-4">
      <form className="grid gap-3 rounded-2xl border border-espresso/12 p-4"
        onSubmit={async (e) => { e.preventDefault(); const ok = await insertRow("client_messages", { client_id: clientId, ...f }); if (ok) { setF({ subject: "", body: "", important: false }); reload(); await insertRow("client_notifications", { client_id: clientId, title: "New message", body: f.subject, kind: "info", link: "/clients/messages" }); } }}>
        <div><label className={label}>Subject</label><input required value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} className={`mt-1 ${input}`} /></div>
        <div><label className={label}>Message</label><textarea required rows={4} value={f.body} onChange={(e) => setF({ ...f, body: e.target.value })} className={`mt-1 ${input}`} /></div>
        <label className="flex items-center gap-2 text-xs font-semibold text-espresso/80"><input type="checkbox" checked={f.important} onChange={(e) => setF({ ...f, important: e.target.checked })} /> Mark important</label>
        <div><button className="inline-flex items-center gap-2 rounded-full bg-espresso px-4 py-2 text-xs font-bold text-white"><Send className="h-3.5 w-3.5" /> Send message</button></div>
      </form>

      {loading ? <Loader2 className="mx-auto h-5 w-5 animate-spin text-cocoa" /> : rows.map((m) => (
        <Row key={m.id} onDelete={async () => { await deleteRow("client_messages", m.id); reload(); }}>
          <p className="text-sm font-bold text-espresso">{m.subject} {!m.is_read && <span className="ml-1 rounded-full bg-espresso px-2 py-0.5 text-[9px] uppercase text-white">unread</span>}</p>
          <p className="whitespace-pre-wrap text-xs text-foreground/60">{m.body}</p>
        </Row>
      ))}
    </div>
  );
}

export function NotificationsTab({ clientId }: { clientId: string }) {
  const { rows, loading, reload } = useTable<{ id: string; title: string; body: string | null; kind: string; is_read: boolean }>("client_notifications", clientId);
  const [f, setF] = useState({ title: "", body: "", kind: "info" });

  return (
    <div className="space-y-4">
      <form className="grid gap-3 rounded-2xl border border-espresso/12 p-4"
        onSubmit={async (e) => { e.preventDefault(); const ok = await insertRow("client_notifications", { client_id: clientId, ...f }); if (ok) { setF({ title: "", body: "", kind: "info" }); reload(); } }}>
        <div><label className={label}>Title</label><input required value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} className={`mt-1 ${input}`} /></div>
        <div><label className={label}>Body</label><input value={f.body} onChange={(e) => setF({ ...f, body: e.target.value })} className={`mt-1 ${input}`} /></div>
        <div><label className={label}>Type</label><select value={f.kind} onChange={(e) => setF({ ...f, kind: e.target.value })} className={`mt-1 ${input}`}>{["info", "success", "warning"].map((k) => <option key={k}>{k}</option>)}</select></div>
        <div><button className="inline-flex items-center gap-2 rounded-full bg-espresso px-4 py-2 text-xs font-bold text-white"><Bell className="h-3.5 w-3.5" /> Send notification</button></div>
      </form>

      {loading ? <Loader2 className="mx-auto h-5 w-5 animate-spin text-cocoa" /> : rows.map((n) => (
        <Row key={n.id} onDelete={async () => { await deleteRow("client_notifications", n.id); reload(); }}>
          <p className="text-sm font-bold text-espresso">{n.title}</p>
          <p className="text-xs text-foreground/60">{n.body} · {n.kind} · {n.is_read ? "read" : "unread"}</p>
        </Row>
      ))}
    </div>
  );
}

export function DocumentsTab({ clientId }: { clientId: string }) {
  const { rows, loading, reload } = useTable<{ id: string; name: string; url: string; file_type: string | null }>("client_documents", clientId);
  const [f, setF] = useState({ name: "", description: "", url: "", file_type: "" });
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "bin";
      const path = `client-docs/${clientId}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file);
      if (error) throw error;
      const { data, error: signErr } = await supabase.storage.from("media").createSignedUrl(path, 60 * 60 * 24 * 365 * 50);
      if (signErr || !data?.signedUrl) throw signErr ?? new Error("Could not sign URL");
      setF((p) => ({ ...p, name: p.name || file.name, url: data.signedUrl, file_type: ext.toUpperCase() }));
    } catch (e) { alert((e as Error).message); }
    finally { setUploading(false); }
  }

  return (
    <div className="space-y-4">
      <form className="grid gap-3 rounded-2xl border border-espresso/12 p-4"
        onSubmit={async (e) => { e.preventDefault(); if (!f.url) { alert("Upload a file or paste a URL first."); return; } const ok = await insertRow("client_documents", { client_id: clientId, ...f, description: f.description || null }); if (ok) { setF({ name: "", description: "", url: "", file_type: "" }); reload(); } }}>
        <div><label className={label}>File</label>
          <input type="file" onChange={(e) => { const file = e.target.files?.[0]; if (file) upload(file); }} className={`mt-1 ${input}`} />
          {uploading && <p className="mt-1 text-xs text-foreground/60">Uploading…</p>}
        </div>
        <div><label className={label}>Display name</label><input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={`mt-1 ${input}`} /></div>
        <div><label className={label}>Description</label><input value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} className={`mt-1 ${input}`} /></div>
        <div><label className={label}>URL</label><input value={f.url} onChange={(e) => setF({ ...f, url: e.target.value })} placeholder="uploaded or external link" className={`mt-1 ${input}`} /></div>
        <div><button className="inline-flex items-center gap-2 rounded-full bg-espresso px-4 py-2 text-xs font-bold text-white"><Plus className="h-3.5 w-3.5" /> Share document</button></div>
      </form>

      {loading ? <Loader2 className="mx-auto h-5 w-5 animate-spin text-cocoa" /> : rows.map((d) => (
        <Row key={d.id} onDelete={async () => { await deleteRow("client_documents", d.id); reload(); }}>
          <a href={d.url} target="_blank" rel="noreferrer" className="text-sm font-bold text-espresso underline">{d.name}</a>
          <p className="text-xs text-foreground/60">{d.file_type}</p>
        </Row>
      ))}
    </div>
  );
}

export function SupportTab({ clientId }: { clientId: string }) {
  const { rows, loading, reload } = useTable<{ id: string; subject: string; message: string; status: string; priority: string; reply: string | null }>("support_requests", clientId);

  return (
    <div className="space-y-4">
      {loading ? <Loader2 className="mx-auto h-5 w-5 animate-spin text-cocoa" /> : rows.length === 0 ? (
        <p className="rounded-2xl border border-espresso/10 p-8 text-center text-sm text-foreground/50">No support requests.</p>
      ) : rows.map((t) => (
        <Row key={t.id} onDelete={async () => { await deleteRow("support_requests", t.id); reload(); }}>
          <p className="text-sm font-bold text-espresso">{t.subject} <span className="ml-1 text-[10px] uppercase text-foreground/50">{t.status} · {t.priority}</span></p>
          <p className="whitespace-pre-wrap text-xs text-foreground/60">{t.message}</p>
          <div className="mt-2 flex gap-2">
            <input defaultValue={t.reply ?? ""} placeholder="Write a reply…" className={input}
              onBlur={async (e) => { if (e.target.value !== (t.reply ?? "")) { await supabase.from("support_requests").update({ reply: e.target.value }).eq("id", t.id); reload(); } }} />
            <button onClick={async () => { await supabase.from("support_requests").update({ status: t.status === "resolved" ? "open" : "resolved" }).eq("id", t.id); reload(); }}
              className="shrink-0 rounded-full border border-espresso/15 px-3 py-2 text-xs font-bold text-espresso hover:bg-white">
              {t.status === "resolved" ? "Reopen" : "Resolve"}
            </button>
          </div>
        </Row>
      ))}
    </div>
  );
}

export function ProjectsTab({ clientId }: { clientId: string }) {
  const { rows, loading, reload } = useTable<{ id: string; title: string; status: string; progress: number; due_date: string | null }>("projects", clientId);
  const [f, setF] = useState({ title: "", service: "", status: "active", progress: 0, due_date: "", budget_usd: 0, summary: "" });

  return (
    <div className="space-y-4">
      <form className="grid gap-3 rounded-2xl border border-espresso/12 p-4 sm:grid-cols-2"
        onSubmit={async (e) => { e.preventDefault(); const ok = await insertRow("projects", { client_id: clientId, ...f, due_date: f.due_date || null }); if (ok) { setF({ ...f, title: "", summary: "" }); reload(); } }}>
        <div className="sm:col-span-2"><label className={label}>Project title</label><input required value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} className={`mt-1 ${input}`} /></div>
        <div><label className={label}>Service</label><input value={f.service} onChange={(e) => setF({ ...f, service: e.target.value })} className={`mt-1 ${input}`} /></div>
        <div><label className={label}>Status</label><select value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })} className={`mt-1 ${input}`}>{["planning", "active", "on_hold", "completed"].map((s) => <option key={s}>{s}</option>)}</select></div>
        <div><label className={label}>Progress %</label><input type="number" min={0} max={100} value={f.progress} onChange={(e) => setF({ ...f, progress: Number(e.target.value) })} className={`mt-1 ${input}`} /></div>
        <div><label className={label}>Due date</label><input type="date" value={f.due_date} onChange={(e) => setF({ ...f, due_date: e.target.value })} className={`mt-1 ${input}`} /></div>
        <div className="sm:col-span-2"><label className={label}>Summary</label><textarea rows={2} value={f.summary} onChange={(e) => setF({ ...f, summary: e.target.value })} className={`mt-1 ${input}`} /></div>
        <div className="sm:col-span-2"><button className="inline-flex items-center gap-2 rounded-full bg-espresso px-4 py-2 text-xs font-bold text-white"><Plus className="h-3.5 w-3.5" /> Add project</button></div>
      </form>

      {loading ? <Loader2 className="mx-auto h-5 w-5 animate-spin text-cocoa" /> : rows.map((p) => (
        <Row key={p.id} onDelete={async () => { await deleteRow("projects", p.id); reload(); }}>
          <p className="text-sm font-bold text-espresso">{p.title}</p>
          <div className="mt-1 flex items-center gap-2">
            <input type="range" min={0} max={100} defaultValue={p.progress}
              onMouseUp={async (e) => { await supabase.from("projects").update({ progress: Number((e.target as HTMLInputElement).value) }).eq("id", p.id); reload(); }}
              className="w-40" />
            <span className="text-xs text-foreground/60">{p.progress}% · {p.status}</span>
          </div>
        </Row>
      ))}
    </div>
  );
}
