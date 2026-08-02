import mark from "@/assets/aymoxi-mark.png.asset.json";

export function Logo({ className = "h-10 w-auto", variant = "default" }: { className?: string; variant?: "default" | "light" }) {
  return (
    <span className={`inline-flex items-center gap-2 ${variant === "light" ? "text-white" : "text-espresso"}`}>
      <img
        src={mark.url}
        alt="AYMOXI LLC logo"
        width={40}
        height={40}
        loading="eager"
        decoding="async"
        className={`${className} object-contain`}
      />
      <span className="font-display text-lg font-extrabold tracking-tight sm:text-xl">
        AYMOXI<span className="ml-1 text-[0.6em] font-semibold opacity-60">LLC</span>
      </span>
    </span>
  );
}
