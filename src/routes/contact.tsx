import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle2, Send } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Apex Technologies" },
      { name: "description", content: "Book a free consultation or send us a message." },
      { property: "og:title", content: "Contact — Apex Technologies" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's build something remarkable." description="Book a free 30-minute consultation. We reply within one business day." />

      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.2fr] lg:px-10">
          <Reveal variant="left">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <h3 className="font-display text-xl font-bold text-espresso">Reach out directly</h3>
              <ul className="mt-6 space-y-5 text-sm">
                {[
                  { icon: MapPin, label: "Head office", value: "42 Innovation Blvd, London, UK" },
                  { icon: Phone, label: "Phone", value: "+44 20 7946 0000" },
                  { icon: Mail, label: "Email", value: "hello@apex.tech" },
                  { icon: Clock, label: "Business hours", value: "Mon–Fri · 9:00 – 18:00 GMT" },
                ].map((i) => (
                  <li key={i.label} className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-copper/15 text-copper">
                      <i.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50">{i.label}</p>
                      <p className="mt-0.5 font-medium text-espresso">{i.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="Apex Technologies office"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.146%2C51.505%2C-0.116%2C51.520&layer=mapnik"
                  className="h-56 w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          <Reveal variant="right">
            <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <h3 className="font-display text-2xl font-bold text-espresso">Book a free consultation</h3>
              <p className="mt-2 text-sm text-foreground/70">Tell us about your project and pick a time that works.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-espresso/70">Name</span>
                  <input required className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 text-sm focus:border-copper focus:outline-none" placeholder="Jane Cooper" />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-espresso/70">Email</span>
                  <input type="email" required className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 text-sm focus:border-copper focus:outline-none" placeholder="jane@company.com" />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-espresso/70">Service</span>
                  <select className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 text-sm focus:border-copper focus:outline-none">
                    <option>Web Development</option>
                    <option>Mobile Apps</option>
                    <option>AI Solutions</option>
                    <option>Cloud & DevOps</option>
                    <option>UI/UX Design</option>
                    <option>Something else</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-espresso/70">Preferred date</span>
                  <input type="date" className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 text-sm focus:border-copper focus:outline-none" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-espresso/70">Message</span>
                  <textarea rows={5} required className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 text-sm focus:border-copper focus:outline-none" placeholder="Tell us about your goals..." />
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cocoa px-8 py-4 text-sm font-semibold text-cream shadow-luxury transition hover:bg-espresso sm:w-auto"
              >
                Send message <Send className="h-4 w-4" />
              </button>

              {sent && (
                <div className="slide-in mt-6 flex items-center gap-3 rounded-2xl border border-copper/40 bg-copper/10 p-4 text-sm text-espresso">
                  <CheckCircle2 className="h-5 w-5 text-copper" />
                  Thanks! We've received your message and will reply within one business day.
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
