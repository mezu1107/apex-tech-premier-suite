import logo from "@/assets/aymoxi-logo.jpg.asset.json";

export function Logo({ className = "h-10 w-auto", variant = "default" }: { className?: string; variant?: "default" | "light" }) {
  return (
    <span className={`inline-flex items-center gap-2 ${variant === "light" ? "text-white" : "text-espresso"}`}>
      <img
        src={logo.url}
        alt="AYMOXI LLC"
        className={`${className} rounded-xl object-contain`}
        style={{ mixBlendMode: variant === "light" ? "screen" : "multiply" }}
      />
    </span>
  );
}
