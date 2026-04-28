"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 480;
      const bookSection = document.getElementById("book");
      if (!bookSection) {
        setShow(past);
        return;
      }
      const rect = bookSection.getBoundingClientRect();
      // Hide when the booking section is on screen.
      const inBook = rect.top < window.innerHeight * 0.6 && rect.bottom > 0;
      setShow(past && !inBook);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pt-3 transition-all duration-300 md:hidden",
        "bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
      aria-hidden={!show}
    >
      <a
        href="#book"
        className="flex h-14 items-center justify-between rounded-full bg-bone-50 px-6 text-ink-950 shadow-[0_20px_40px_-15px_rgba(236,228,214,0.35)]"
      >
        <span className="font-medium tracking-tight">Book your chair</span>
        <span aria-hidden className="font-mono text-sm">→</span>
      </a>
    </div>
  );
}
