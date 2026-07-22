import { ShieldCheck, Lock, Award, Users2, Clock4, Star } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  { icon: ShieldCheck, label: "SOC 2 Practices" },
  { icon: Lock, label: "GDPR Ready" },
  { icon: Award, label: "ISO 27001 Aligned" },
  { icon: Users2, label: "120+ Happy Clients" },
  { icon: Clock4, label: "24/7 SLA Support" },
  { icon: Star, label: "5-Star Rated" },
];

export function TrustBar() {
  return (
    <section className="border-y border-espresso/8 bg-white py-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-espresso/50">
            Trusted, Secure &amp; Compliant
          </p>
        </Reveal>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {items.map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={i * 40}>
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-espresso/10 bg-sand/40 px-3 py-3 text-center transition hover:border-cocoa/30 hover:bg-white">
                <Icon className="h-4 w-4 shrink-0 text-cocoa" />
                <span className="text-xs font-bold text-espresso">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
