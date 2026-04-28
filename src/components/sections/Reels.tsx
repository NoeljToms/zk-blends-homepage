"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { reels } from "@/config/media";
import { Section } from "@/components/ui/Section";

export function Reels() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section
      id="reels"
      eyebrow="In motion"
      title={<>Inside <span className="text-bone-300/60">the chair.</span></>}
      intro="Short clips from recent appointments. Tap to play — no autoplay, no noise."
    >
      <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 lg:grid-cols-3">
        {reels.map((reel, i) => {
          const isActive = active === i;
          return (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.6,
                delay: (i % 3) * 0.08,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="group relative aspect-[3/4] w-[68%] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-900 sm:w-auto"
            >
              {!isActive && (
                <>
                  <Image
                    src={reel.poster}
                    alt={reel.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 640px) 33vw, 70vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => reel.src && setActive(i)}
                    aria-label={`Play ${reel.alt}`}
                    className="absolute inset-0 flex items-end justify-between p-4 text-left"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-200/80">
                      Reel · 0{i + 1}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bone-50 text-ink-950 transition-transform group-hover:scale-105">
                      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                        <path d="M3 1.5v11l10-5.5z" fill="currentColor" />
                      </svg>
                    </span>
                  </button>
                </>
              )}
              {isActive && reel.src && (
                <video
                  src={reel.src}
                  poster={reel.poster}
                  controls
                  playsInline
                  preload="metadata"
                  autoPlay
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
