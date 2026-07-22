import { useEffect, useRef, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Loader2, X, Save, Upload, ImageIcon } from "lucide-react";

export type FieldType = "text" | "textarea" | "number" | "boolean" | "tags" | "select" | "image";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface CrudTableProps {
  table: string;
  title: string;
  fields: FieldDef[];
  listColumns: { key: string; label: string; render?: (row: Record<string, unknown>) => ReactNode }[];
  orderBy?: { column: string; ascending?: boolean };
  defaults?: Record<string, unknown>;
  readOnly?: boolean;
}

function ImageUploadField({
  value,
  onChange,
  table,
}: {
  value: string;
  onChange: (v: string) => void;
  table: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setErr(null);
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${table}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mt-1.5 space-y-2">
      <div className="flex items-center gap-3">
        <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-espresso/12 bg-sand/40">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-5 w-5 text-espresso/40" />
          )}
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-full bg-espresso px-4 py-2 text-xs font-bold text-white hover:bg-cocoa disabled:opacity-60"
            >
              {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
              {uploading ? "Uploading…" : "Upload from PC"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="rounded-full border border-espresso/15 px-3 py-2 text-xs font-bold text-espresso hover:bg-sand"
              >
                Clear
              </button>
            )}
          </div>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="or paste image URL"
            className="w-full rounded-xl border border-espresso/12 bg-sand/40 px-3 py-2 text-xs outline-none focus:border-cocoa focus:bg-white"
          />
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          if (inputRef.current) inputRef.current.value = "";
        }}
      />
      {err && <p className="text-xs text-red-600">{err}</p>}
    </div>
  );
}

export function CrudTable({ table, title, fields, listColumns, orderBy, defaults = {}, readOnly = false }: CrudTableProps) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let q: any = (supabase.from as any)(table).select("*");
    if (orderBy) q = q.order(orderBy.column, { ascending: orderBy.ascending ?? true });
    const { data, error } = await q;
    if (error) setError(error.message);
    setRows((data as Record<string, unknown>[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [table]);

  function startCreate() {
    const empty: Record<string, unknown> = { ...defaults };
    fields.forEach((f) => {
      if (!(f.name in empty)) {
        empty[f.name] = f.type === "boolean" ? false : f.type === "number" ? 0 : f.type === "tags" ? [] : "";
      }
    });
    setEditing(empty);
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    const payload = { ...editing };
    const id = payload.id as string | undefined;
    delete payload.created_at;
    delete payload.updated_at;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t: any = (supabase.from as any)(table);
    const res = id
      ? await t.update(payload).eq("id", id)
      : await t.insert(payload);
    if (res.error) {
      setError(res.error.message);
      setSaving(false);
      return;
    }
    setEditing(null);
    setSaving(false);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from as any)(table).delete().eq("id", id);
    if (error) { alert(error.message); return; }
    load();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-black text-espresso">{title}</h1>
          <p className="text-sm text-foreground/60">{rows.length} item{rows.length === 1 ? "" : "s"}</p>
        </div>
        {!readOnly && (
          <button onClick={startCreate} className="inline-flex items-center gap-2 rounded-full bg-espresso px-4 py-2.5 text-sm font-bold text-white hover:bg-cocoa">
            <Plus className="h-4 w-4" /> New
          </button>
        )}
      </div>

      {error ? <div className="mb-4 rounded-xl border border-red-300 bg-red-50 p-3 text-xs text-red-700">{error}</div> : null}

      <div className="overflow-hidden rounded-2xl border border-espresso/10 bg-white">
        {loading ? (
          <div className="grid place-items-center p-12"><Loader2 className="h-5 w-5 animate-spin text-cocoa" /></div>
        ) : rows.length === 0 ? (
          <div className="p-12 text-center text-sm text-foreground/50">No items yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-sand/60 text-left text-xs font-bold uppercase tracking-wider text-espresso/70">
                <tr>
                  {listColumns.map((c) => (<th key={c.key} className="px-4 py-3">{c.label}</th>))}
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-espresso/6">
                {rows.map((r) => (
                  <tr key={String(r.id)} className="hover:bg-sand/30">
                    {listColumns.map((c) => (
                      <td key={c.key} className="px-4 py-3 align-top text-espresso">
                        {c.render ? c.render(r) : String(r[c.key] ?? "")}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <button onClick={() => setEditing(r)} className="rounded-lg p-2 text-espresso hover:bg-sand"><Pencil className="h-3.5 w-3.5" /></button>
                        <button onClick={() => remove(String(r.id))} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-espresso/50 p-4" onClick={() => !saving && setEditing(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-black text-espresso">{editing.id ? "Edit" : "Create"} {title.replace(/s$/, "")}</h2>
              <button onClick={() => setEditing(null)} className="rounded-full p-1.5 hover:bg-sand"><X className="h-4 w-4" /></button>
            </div>
            <div className="grid gap-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="text-xs font-semibold uppercase tracking-widest text-espresso/70">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea rows={4} value={String(editing[f.name] ?? "")} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      className="mt-1.5 w-full rounded-2xl border border-espresso/12 bg-sand/40 px-4 py-3 text-sm outline-none focus:border-cocoa focus:bg-white" />
                  ) : f.type === "boolean" ? (
                    <label className="mt-1.5 flex cursor-pointer items-center gap-2 text-sm">
                      <input type="checkbox" checked={Boolean(editing[f.name])} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.checked })} />
                      <span className="text-espresso/80">{f.placeholder ?? "Enabled"}</span>
                    </label>
                  ) : f.type === "number" ? (
                    <input type="number" value={Number(editing[f.name] ?? 0)} onChange={(e) => setEditing({ ...editing, [f.name]: Number(e.target.value) })}
                      className="mt-1.5 w-full rounded-2xl border border-espresso/12 bg-sand/40 px-4 py-3 text-sm outline-none focus:border-cocoa focus:bg-white" />
                  ) : f.type === "tags" ? (
                    <input value={(editing[f.name] as string[] | undefined)?.join(", ") ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                      placeholder="Comma separated"
                      className="mt-1.5 w-full rounded-2xl border border-espresso/12 bg-sand/40 px-4 py-3 text-sm outline-none focus:border-cocoa focus:bg-white" />
                  ) : f.type === "select" ? (
                    <select value={String(editing[f.name] ?? "")} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      className="mt-1.5 w-full rounded-2xl border border-espresso/12 bg-sand/40 px-4 py-3 text-sm outline-none focus:border-cocoa focus:bg-white">
                      {f.options?.map((o) => (<option key={o} value={o}>{o}</option>))}
                    </select>
                  ) : f.type === "image" ? (
                    <ImageUploadField
                      value={String(editing[f.name] ?? "")}
                      onChange={(v) => setEditing({ ...editing, [f.name]: v })}
                      table={table}
                    />
                  ) : (
                    <input value={String(editing[f.name] ?? "")} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      placeholder={f.placeholder}
                      className="mt-1.5 w-full rounded-2xl border border-espresso/12 bg-sand/40 px-4 py-3 text-sm outline-none focus:border-cocoa focus:bg-white" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} disabled={saving} className="rounded-full border border-espresso/15 px-5 py-2.5 text-sm font-bold text-espresso">Cancel</button>
              <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-2.5 text-sm font-bold text-white hover:bg-cocoa disabled:opacity-60">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
