"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { heroMedia } from "@/config/media";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.22, 0.61, 0.36, 1] as const;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 sm:pt-32 md:pt-40"
    >
      {/* layered backdrop glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(176,136,66,0.18),transparent_70%)]"
      />

      <Container>
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-brass-400"
            >
              {siteConfig.copy.heroEyebrow}
            </motion.p>

            <h1 className="display mt-6 text-[44px] text-bone-50 sm:text-6xl md:text-7xl lg:text-[88px]">
              {siteConfig.copy.heroTitle.map((line, i) => (
                <motion.span
                  key={line}
                  initial={reduce ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease }}
                  className="block"
                >
                  {i === 1 ? (
                    <span className="text-bone-300/70">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="mt-6 max-w-md text-base text-bone-200/70 sm:text-lg"
            >
              {siteConfig.copy.heroSubtitle}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#book"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-bone-50 px-7 text-[15px] font-medium tracking-tight text-ink-950 transition-colors hover:bg-bone-100"
              >
                Book your chair
                <span aria-hidden className="font-mono">→</span>
              </a>
              <a
                href="#services"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-bone-300/30 px-6 text-[14px] tracking-tight text-bone-100 transition-colors hover:border-bone-200/60 hover:bg-white/[0.03]"
              >
                See services
              </a>
            </motion.div>

            <motion.dl
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/[0.06] pt-8 text-sm"
            >
              {[
                { k: "Hours", v: "Mon–Sat · 9–6" },
                { k: "Style", v: "By appointment" },
                { k: "Studio", v: siteConfig.location.city },
              ].map((it) => (
                <div key={it.k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300/50">
                    {it.k}
                  </dt>
                  <dd className="mt-1 text-bone-100">{it.v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* layered media composition */}
          <div className="md:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease }}
                className="absolute inset-0 overflow-hidden rounded-[28px] border border-white/10 bg-ink-900 shadow-soft"
              >
                <Image
                  src={heroMedia[0].src}
                  alt={heroMedia[0].alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent"
                />
              </motion.div>

              <motion.div
                initial={reduce ? false : { opacity: 0, x: 30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease }}
                className="absolute -right-3 -top-6 hidden aspect-square w-32 overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-soft sm:block md:w-40"
              >
                <Image
                  src={heroMedia[1].src}
                  alt={heroMedia[1].alt}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial={reduce ? false : { opacity: 0, x: -30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease }}
                className="absolute -bottom-8 -left-6 hidden h-28 w-44 overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-soft sm:block md:h-32 md:w-52"
              >
                <Image
                  src={heroMedia[2].src}
                  alt={heroMedia[2].alt}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </motion.div>

              {/* hairline corner brackets */}
              <div
                aria-hidden
                className="absolute -left-1 -top-1 h-5 w-5 border-l border-t border-brass-400/60"
              />
              <div
                aria-hidden
                className="absolute -bottom-1 -right-1 h-5 w-5 border-b border-r border-brass-400/60"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* slim divider */}
      <div className="mt-24 px-5 sm:px-8 md:mt-32">
        <div className="mx-auto max-w-6xl">
          <div className="divider" />
        </div>
      </div>
    </section>
  );
}
