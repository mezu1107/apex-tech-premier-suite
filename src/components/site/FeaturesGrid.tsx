import {
  Bot, Cpu, Cloud, Shield, Zap, Code2, Smartphone, Palette, Globe,
  Database, ShoppingCart, BarChart3, Search, Lock, Rocket, Wifi,
  Brain, Fingerprint, LineChart, MessagesSquare, Layers, Wand2,
  Boxes, Gauge, RefreshCw, Bell, CreditCard, Mail, MapPin, Users,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const features = [
  { icon: Bot, title: "AI Chatbots", desc: "Custom GPT-powered assistants trained on your data." },
  { icon: Brain, title: "AI Copilots", desc: "In-app copilots that automate repetitive workflows." },
  { icon: Cpu, title: "Machine Learning", desc: "Predictive models tailored to your business KPIs." },
  { icon: Wand2, title: "Generative Design", desc: "AI-assisted content, imagery and mock-ups." },
  { icon: MessagesSquare, title: "Voice AI", desc: "Speech-to-text and TTS with human-grade quality." },
  { icon: Cloud, title: "Cloud Hosting", desc: "Auto-scaling on AWS, GCP and Azure." },
  { icon: Shield, title: "Cyber Security", desc: "Zero-trust, pen-testing and 24/7 monitoring." },
  { icon: Lock, title: "SOC2 Ready", desc: "Compliance-friendly architecture out of the box." },
  { icon: Fingerprint, title: "Biometric Auth", desc: "Face ID, fingerprint and passkey login." },
  { icon: Zap, title: "Realtime APIs", desc: "WebSocket & edge functions for instant updates." },
  { icon: Wifi, title: "PWA Support", desc: "Offline-first progressive web apps." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native iOS/Android with React Native or Flutter." },
  { icon: Code2, title: "Web Development", desc: "Next.js, TanStack and modern stacks." },
  { icon: Globe, title: "Multi-language", desc: "i18n support for 40+ languages including Urdu." },
  { icon: Palette, title: "UI/UX Design", desc: "Design systems that scale across products." },
  { icon: Layers, title: "SaaS Platforms", desc: "Multi-tenant SaaS with billing & role management." },
  { icon: Database, title: "ERP Systems", desc: "End-to-end enterprise resource planning." },
  { icon: ShoppingCart, title: "POS & Retail", desc: "Cloud POS, inventory and loyalty programs." },
  { icon: CreditCard, title: "Payments", desc: "Stripe, PayPal & local gateway integration." },
  { icon: BarChart3, title: "Analytics", desc: "Real-time dashboards and BI reports." },
  { icon: LineChart, title: "Growth Insights", desc: "Cohort analysis & funnel optimization." },
  { icon: Gauge, title: "Performance", desc: "Sub-second load times, 100 Lighthouse scores." },
  { icon: RefreshCw, title: "CI/CD Pipelines", desc: "Automated testing and one-click deploys." },
  { icon: Boxes, title: "Micro-services", desc: "Modular, independently-scalable backends." },
  { icon: Rocket, title: "MVP in 30 Days", desc: "From idea to launch in a single sprint." },
  { icon: Bell, title: "Push Notifications", desc: "Web push, in-app and SMS delivery." },
  { icon: Mail, title: "Email Automation", desc: "Drip campaigns & transactional flows." },
  { icon: Search, title: "SEO Optimization", desc: "Technical SEO, schema & Core Web Vitals." },
  { icon: MapPin, title: "Geo & Maps", desc: "Interactive maps, geofencing & routing." },
  { icon: Users, title: "24/7 Support", desc: "Dedicated engineers, SLA-backed response." },
];

export function FeaturesGrid() {
  return (
    <section className="relative overflow-hidden bg-sand/40 py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-copper/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-cocoa/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cocoa sm:text-xs">30+ Latest Features</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-espresso sm:text-4xl md:text-5xl">
              Everything modern, nothing legacy
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-sm text-foreground/70 sm:text-base">
              Cutting-edge capabilities baked in — from AI copilots and biometric auth to edge-scale infrastructure.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={Math.min(i * 30, 400)}>
              <div className="group h-full rounded-2xl border border-espresso/10 bg-white p-4 shadow-soft transition duration-500 hover:-translate-y-1 hover:border-copper/50 hover:shadow-luxury sm:p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cocoa to-espresso text-copper transition group-hover:from-copper group-hover:to-copper group-hover:text-espresso sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-display text-sm font-bold text-espresso sm:text-base">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground/65 sm:text-sm">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
