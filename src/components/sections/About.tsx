"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { aboutImages, studioReel } from "@/config/media";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

const pillars = [
  {
    k: "01",
    title: "Same hands. Every time.",
    body: "One barber, one chair. The cut you booked is the cut you get — appointment after appointment.",
  },
  {
    k: "02",
    title: "On time, always.",
    body: "One client at a time. No double-bookings, no waiting room. You sit down, we get to work.",
  },
  {
    k: "03",
    title: "Built for the way you grow out.",
    body: "Cut to live well past day one. The shape holds whether you styled it that morning or didn't.",
  },
  {
    k: "04",
    title: "Quiet by design.",
    body: "Phones down, vinyl on. The studio stays calm — it's where the focus comes from.",
  },
];

export function About() {
  const reduce = useReducedMotion();
  const [reelPlaying, setReelPlaying] = useState(false);

  return (
    <section id="about" className="relative py-24 sm:py-32 md:py-36">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: featured studio reel + supporting still */}
          <div className="md:col-span-5">
            <div className="relative">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
                className="group relative aspect-[9/16] overflow-hidden rounded-3xl border border-white/[0.06] bg-ink-900 shadow-soft"
              >
                {!reelPlaying ? (
                  <>
                    <Image
                      src={studioReel.poster}
                      alt={studioReel.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 768px) 40vw, 90vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setReelPlaying(true)}
                      aria-label="Play studio reel"
                      className="absolute inset-0 flex items-end justify-between p-5"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-200/80">
                        Studio reel
                      </span>
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bone-50 text-ink-950 transition-transform group-hover:scale-105">
                        <svg width="16" height="16" viewBox="0 0 14 14" aria-hidden>
                          <path d="M3 1.5v11l10-5.5z" fill="currentColor" />
                        </svg>
                      </span>
                    </button>
                  </>
                ) : (
                  <video
                    src={studioReel.src}
                    poster={studioReel.poster}
                    controls
                    playsInline
                    preload="metadata"
                    autoPlay
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </motion.div>
              <motion.div
                initial={reduce ? false : { opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="absolute -bottom-8 -right-4 hidden aspect-[3/4] w-32 overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-soft sm:block md:w-40"
              >
                <Image
                  src={aboutImages[0].src}
                  alt={aboutImages[0].alt}
                  fill
                  loading="lazy"
                  sizes="200px"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* Right: copy + pillars */}
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-brass-400">
              The studio
            </p>
            <h2 className="display mt-4 text-4xl text-bone-50 sm:text-5xl md:text-6xl">
              {siteConfig.copy.aboutTitle}
            </h2>
            <p className="mt-5 max-w-lg text-base text-bone-200/70 sm:text-lg">
              {siteConfig.copy.aboutBody}
            </p>

            <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <motion.li
                  key={p.k}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.07,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300/40">
                    — {p.k}
                  </p>
                  <h3 className="mt-2 text-lg font-medium tracking-tight text-bone-50">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-bone-200/60">{p.body}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
