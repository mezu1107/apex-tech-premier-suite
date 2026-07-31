import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, GripVertical, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What services do you offer?",
  "Tell me about pricing",
  "How can AI help my business?",
  "Book a free consultation",
];

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm AYMOXI Assistant 👋 Ask me anything about our services, pricing, or how we can help your business grow." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Draggable floating button
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef<{ dx: number; dy: number; moved: boolean } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pos === null && typeof window !== "undefined") {
      const isMobile = window.innerWidth < 1024;
      // Keep the button clear of the mobile sticky CTA bar (~72px) and the WhatsApp/back-to-top stack.
      const bottomOffset = isMobile ? 108 : 96;
      setPos({ x: window.innerWidth - 76, y: window.innerHeight - bottomOffset });
    }
  }, [pos]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!btnRef.current || !pos) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const nx = e.clientX - dragRef.current.dx;
    const ny = e.clientY - dragRef.current.dy;
    if (Math.abs(e.movementX) + Math.abs(e.movementY) > 2) dragRef.current.moved = true;
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    setPos({ x: Math.max(8, Math.min(maxX, nx)), y: Math.max(8, Math.min(maxY, ny)) });
  };
  const onPointerUp = () => {
    const moved = dragRef.current?.moved;
    dragRef.current = null;
    if (!moved) setOpen((v) => !v);
  };

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as { reply: string };
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry — I'm having trouble right now. Please try again in a moment or email info@aymoxi.com." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!pos) return null;

  return (
    <>
      {/* Floating draggable button */}
      <button
        ref={btnRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        aria-label="Open AI Assistant"
        style={{ left: pos.x, top: pos.y, touchAction: "none" }}
        className="pulse-ring fixed z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cocoa to-espresso text-copper shadow-luxury transition hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed z-50 flex w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-espresso/10 bg-white shadow-luxury animate-fade-in"
          style={{
            left: Math.min(pos.x, (typeof window !== "undefined" ? window.innerWidth : 400) - 384 - 12),
            top: Math.max(12, pos.y - 520),
            height: "min(70vh, 560px)",
          }}
        >
          {/* Header — drag handle */}
          <div
            className="flex cursor-grab items-center justify-between gap-2 bg-gradient-to-br from-espresso to-cocoa px-4 py-3 text-white active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            style={{ touchAction: "none" }}
          >
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-copper text-espresso">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="font-display text-sm font-bold leading-tight">AYMOXI Assistant</p>
                <p className="flex items-center gap-1.5 text-[10px] text-copper">
                  <span className="h-1.5 w-1.5 rounded-full bg-copper animate-pulse" /> Online · AI powered
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <GripVertical className="h-4 w-4 text-white/50" />
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1 hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-sand/40 px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "rounded-br-md bg-cocoa text-white"
                      : "rounded-bl-md bg-white text-espresso"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cocoa [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cocoa [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cocoa" />
                </div>
              </div>
            )}
            {messages.length <= 1 && !loading && (
              <div className="mt-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-cocoa/20 bg-white px-3 py-1.5 text-xs text-espresso transition hover:border-copper hover:bg-copper/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-espresso/10 bg-white px-3 py-3"
          >
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              className="flex-1 rounded-full border border-espresso/15 bg-sand/40 px-4 py-2.5 text-sm text-espresso placeholder:text-espresso/40 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/30"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="grid h-10 w-10 place-items-center rounded-full bg-cocoa text-copper transition hover:bg-espresso disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
