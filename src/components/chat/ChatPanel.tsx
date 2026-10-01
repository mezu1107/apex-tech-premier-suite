import { useEffect, useRef, useState } from "react";
import {
  useMe, useConversations, useMessages, useDirectory, sendMessage,
  openDirectConversation, conversationTitle, type Conversation,
} from "@/lib/use-chat";
import { Loader2, Search, Send, ArrowLeft, Users, MessageSquare } from "lucide-react";

export function ChatPanel({ compact = false }: { compact?: boolean }) {
  const { me, loading: meLoading } = useMe();
  const { conversations, loading, reload } = useConversations(!!me);
  const [activeId, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const { people } = useDirectory(query);
  const { messages } = useMessages(activeId);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length]);

  const active = conversations.find((c) => c.id === activeId) ?? null;

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!me || !activeId || !draft.trim()) return;
    setBusy(true);
    try { await sendMessage(activeId, me, draft); setDraft(""); } finally { setBusy(false); }
  }

  if (meLoading) return <div className="grid h-full place-items-center"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>;
  if (!me) return <div className="grid h-full place-items-center p-6 text-center text-sm text-muted-foreground">Sign in to use messaging.</div>;

  const listPane = (
    <div className={`flex h-full min-h-0 flex-col ${compact && activeId ? "hidden" : ""} ${compact ? "" : "w-full max-w-xs border-r border-border"}`}>
      <div className="border-b border-border p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearching(e.target.value.length > 0); }}
            placeholder="Search name, email or AM ID"
            className="w-full rounded-full border border-border bg-background py-2 pl-9 pr-3 text-xs outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {searching ? (
          people.length === 0 ? <p className="p-4 text-xs text-muted-foreground">No matching team member or client.</p> : (
            people.filter((p) => p.user_id !== me.userId).map((p) => (
              <button key={p.user_id}
                onClick={async () => { const id = await openDirectConversation(me, p); setQuery(""); setSearching(false); await reload(); setActive(id); }}
                className="flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left hover:bg-muted">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-black text-primary">{p.name.slice(0, 2).toUpperCase()}</span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">{p.name}</span>
                  <span className="block truncate text-[11px] text-muted-foreground">{p.am_id ?? p.email} · {p.kind}</span>
                </span>
              </button>
            ))
          )
        ) : loading ? (
          <div className="grid h-24 place-items-center"><Loader2 className="h-4 w-4 animate-spin text-primary" /></div>
        ) : conversations.length === 0 ? (
          <p className="p-4 text-xs text-muted-foreground">No conversations yet. Search a team member or client above to start one.</p>
        ) : (
          conversations.map((c: Conversation) => (
            <button key={c.id} onClick={() => setActive(c.id)}
              className={`flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left hover:bg-muted ${activeId === c.id ? "bg-muted" : ""}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                {c.kind === "group" ? <Users className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-foreground">{conversationTitle(c, me.userId)}</span>
                <span className="block truncate text-[11px] text-muted-foreground">{new Date(c.last_message_at).toLocaleString()}</span>
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );

  const threadPane = (
    <div className={`flex h-full min-h-0 flex-1 flex-col ${compact && !activeId ? "hidden" : ""}`}>
      {!active ? (
        <div className="grid h-full place-items-center p-6 text-center text-sm text-muted-foreground">Select a conversation.</div>
      ) : (
        <>
          <div className="flex items-center gap-2 border-b border-border p-3">
            {compact && <button onClick={() => setActive(null)} className="grid h-8 w-8 place-items-center rounded-lg border border-border"><ArrowLeft className="h-4 w-4" /></button>}
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-foreground">{conversationTitle(active, me.userId)}</p>
              <p className="truncate text-[11px] text-muted-foreground">{active.conversation_participants?.length ?? 0} members</p>
            </div>
          </div>
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto bg-muted/30 p-4">
            {messages.map((m) => {
              const mine = m.sender_id === me.userId;
              return (
                <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${mine ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border"}`}>
                    {!mine && <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider opacity-70">{m.sender_name}</p>}
                    <p className="whitespace-pre-wrap break-words">{m.body}</p>
                    <p className="mt-1 text-[10px] opacity-60">{new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>
          <form onSubmit={send} className="flex items-center gap-2 border-t border-border p-3">
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message…"
              className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
            <button type="submit" disabled={busy || !draft.trim()} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
        </>
      )}
    </div>
  );

  return <div className="flex h-full min-h-0 overflow-hidden">{listPane}{threadPane}</div>;
}
