import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone, Calendar, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-espresso text-cream shadow-luxury transition-all lg:bottom-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/442079460000"
      target="_blank"
      rel="noreferrer"
      className="pulse-ring fixed bottom-24 left-5 z-40 hidden h-14 w-14 place-items-center rounded-full bg-copper text-espresso shadow-luxury lg:grid"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

export function MobileStickyCTA() {
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-espresso/10 bg-cream/95 backdrop-blur-xl shadow-luxury lg:hidden">
      <div className="grid grid-cols-4 gap-1 px-2 py-2">
        <a href="tel:+442079460000" className="flex flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 text-espresso active:bg-sand/70">
          <Phone className="h-5 w-5 text-copper" />
          <span className="text-[10px] font-semibold">Call</span>
        </a>
        <a href="https://wa.me/442079460000" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 text-espresso active:bg-sand/70">
          <MessageCircle className="h-5 w-5 text-copper" />
          <span className="text-[10px] font-semibold">WhatsApp</span>
        </a>
        <Link to="/contact" className="flex flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 text-espresso active:bg-sand/70">
          <Calendar className="h-5 w-5 text-copper" />
          <span className="text-[10px] font-semibold">Book</span>
        </Link>
        <Link to="/contact" className="flex flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 text-espresso active:bg-sand/70">
          <FileText className="h-5 w-5 text-copper" />
          <span className="text-[10px] font-semibold">Quote</span>
        </Link>
      </div>
    </div>
  );
}
