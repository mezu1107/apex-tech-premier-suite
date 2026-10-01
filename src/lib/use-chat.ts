import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DirectoryPerson {
  user_id: string;
  name: string;
  email: string;
  am_id: string | null;
  kind: string;
  department: string | null;
}

export interface Participant { user_id: string; display_name: string | null; kind: string }

export interface Conversation {
  id: string;
  kind: string;
  title: string | null;
  project_id: string | null;
  last_message_at: string;
  conversation_participants: Participant[];
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string | null;
  body: string;
  created_at: string;
}

export interface Me { userId: string; name: string; kind: "staff" | "client" | "admin" }

/** Resolves the signed-in identity from the real database records. */
export function useMe() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth?.user;
      if (!user) { setMe(null); setLoading(false); return; }
      const { data: staff } = await supabase.from("staff_members").select("name").eq("user_id", user.id).maybeSingle();
      if (staff) { setMe({ userId: user.id, name: staff.name, kind: "staff" }); setLoading(false); return; }
      const { data: client } = await supabase.from("portal_clients").select("name").eq("user_id", user.id).maybeSingle();
      if (client) { setMe({ userId: user.id, name: client.name, kind: "client" }); setLoading(false); return; }
      setMe({ userId: user.id, name: user.email ?? "Admin", kind: "admin" });
      setLoading(false);
    })();
  }, []);

  return { me, loading };
}

/** Searches real staff + client accounts by name, email or AM ID. */
export function useDirectory(query: string) {
  const [people, setPeople] = useState<DirectoryPerson[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(async () => {
      setLoading(true);
      const { data } = await supabase.rpc("search_directory", { _q: query.trim() });
      if (!cancelled) { setPeople((data as DirectoryPerson[]) ?? []); setLoading(false); }
    }, 220);
    return () => { cancelled = true; clearTimeout(t); };
  }, [query]);

  return { people, loading };
}

export function useConversations(enabled: boolean) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!enabled) return;
    const { data } = await supabase
      .from("conversations")
      .select("id, kind, title, project_id, last_message_at, conversation_participants(user_id, display_name, kind)")
      .order("last_message_at", { ascending: false });
    setConversations((data as unknown as Conversation[]) ?? []);
    setLoading(false);
  }, [enabled]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!enabled) return;
    const ch = supabase
      .channel("conversations-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "chat_messages" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [enabled, load]);

  return { conversations, loading, reload: load };
}

export function useMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!conversationId) { setMessages([]); return; }
    setLoading(true);
    const { data } = await supabase
      .from("chat_messages")
      .select("id, conversation_id, sender_id, sender_name, body, created_at")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });
    setMessages((data as ChatMessage[]) ?? []);
    setLoading(false);
  }, [conversationId]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!conversationId) return;
    const ch = supabase
      .channel(`chat-${conversationId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => setMessages((prev) => (prev.some((m) => m.id === (payload.new as ChatMessage).id) ? prev : [...prev, payload.new as ChatMessage])),
      )
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [conversationId]);

  return { messages, loading, reload: load };
}

export async function sendMessage(conversationId: string, me: Me, body: string) {
  const text = body.trim();
  if (!text) return;
  const { error } = await supabase.from("chat_messages").insert({
    conversation_id: conversationId,
    sender_id: me.userId,
    sender_name: me.name,
    body: text,
  });
  if (error) throw new Error(error.message);
}

/** Opens (or creates) the 1-to-1 conversation between the signed-in user and another real account. */
export async function openDirectConversation(me: Me, other: DirectoryPerson): Promise<string> {
  const { data: shared } = await supabase
    .from("conversation_participants")
    .select("conversation_id, conversations(kind)")
    .eq("user_id", other.user_id);

  const existing = (shared ?? []).find(
    (r) => (r as unknown as { conversations: { kind: string } | null }).conversations?.kind === "direct",
  );
  if (existing) return (existing as { conversation_id: string }).conversation_id;

  const { data: conv, error } = await supabase
    .from("conversations")
    .insert({ kind: "direct", created_by: me.userId })
    .select("id")
    .single();
  if (error || !conv) throw new Error(error?.message ?? "Could not start conversation");

  const { error: pErr } = await supabase.from("conversation_participants").insert([
    { conversation_id: conv.id, user_id: me.userId, display_name: me.name, kind: me.kind },
    { conversation_id: conv.id, user_id: other.user_id, display_name: other.name, kind: other.kind },
  ]);
  if (pErr) throw new Error(pErr.message);
  return conv.id;
}

export function conversationTitle(c: Conversation, meId: string) {
  if (c.title) return c.title;
  const other = c.conversation_participants?.find((p) => p.user_id !== meId);
  return other?.display_name ?? "Conversation";
}
