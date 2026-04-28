"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "./ui/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label={siteConfig.name} className="flex items-center">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium tracking-wide text-bone-200/80 transition-colors hover:text-bone-50"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#book"
          className="hidden h-9 items-center rounded-full border border-bone-300/30 px-4 text-[13px] font-medium tracking-wide text-bone-100 transition-colors hover:border-bone-200/60 hover:bg-white/[0.03] md:inline-flex"
        >
          Book
        </a>
      </div>
    </header>
  );
}
