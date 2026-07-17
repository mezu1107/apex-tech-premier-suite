import { createFileRoute } from "@tanstack/react-router";

type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are "Adphira Assistant", the friendly AI concierge for Adphira LLC — a premium software company offering web development, mobile apps, AI solutions, cloud hosting, SaaS platforms, ERP, POS, UI/UX design, digital marketing, and cybersecurity. 
- Answer in the same language the user writes in (English, Urdu, Roman Urdu, Hindi, Arabic — all fine).
- Be concise, warm, and helpful. Use short paragraphs and bullets when useful.
- For pricing: starter from $499, growth from $1,499/mo, enterprise custom. Offer a free consultation.
- Contact: hello@adphira.com · +44 20 7946 0000. Office: 42 Innovation Blvd, London, UK.
- If the user asks about topics unrelated to Adphira, still help them briefly.
- Never claim to be human. You are an AI assistant.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { messages?: ChatMsg[] };
          const messages = Array.isArray(body.messages) ? body.messages : [];
          const key = process.env.LOVABLE_API_KEY;
          if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

          const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": key,
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
            }),
          });

          if (!resp.ok) {
            const text = await resp.text();
            return new Response(text || "Upstream error", { status: resp.status });
          }
          const data = (await resp.json()) as { choices?: { message?: { content?: string } }[] };
          const reply = data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
          return Response.json({ reply });
        } catch (e) {
          return new Response((e as Error).message, { status: 500 });
        }
      },
    },
  },
});
