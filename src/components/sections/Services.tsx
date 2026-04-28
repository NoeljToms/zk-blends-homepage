"use client";

import { motion, useReducedMotion } from "framer-motion";
import { services, formatPrice, formatDuration } from "@/config/services";
import { Section } from "@/components/ui/Section";

export function Services() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="services"
      eyebrow="Services"
      title={<>Two services. <span className="text-bone-300/60">Done right.</span></>}
      intro="A short list, on purpose. Each appointment includes consult, cut, hot towel, and finish."
    >
      <ul className="grid gap-5 sm:grid-cols-2">
        {services.map((s, i) => (
          <motion.li
            key={s.id}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.22, 0.61, 0.36, 1],
            }}
            className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-ink-850 to-ink-900 p-7 transition-colors hover:border-white/[0.14] sm:p-9"
          >
            {/* subtle metallic edge on hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(80% 60% at 50% 0%, rgba(201,163,92,0.08), transparent 70%)",
              }}
            />

            {s.tag && (
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brass-400/30 bg-brass-400/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-brass-400">
                <span className="h-1 w-1 rounded-full bg-brass-400" />
                {s.tag}
              </span>
            )}

            <div className="flex items-start justify-between gap-6">
              <h3 className="display text-3xl text-bone-50 sm:text-4xl">{s.name}</h3>
              <div className="text-right">
                <p className="display text-3xl text-bone-50 sm:text-4xl">
                  {formatPrice(s.priceUSD)}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300/60">
                  {formatDuration(s.durationMinutes)}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-[15px] text-bone-200/70">{s.description}</p>

            <a
              href={`#book?service=${s.id}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-tight text-bone-100 transition-colors hover:text-bone-50"
            >
              Reserve this service
              <span aria-hidden className="font-mono transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </motion.li>
        ))}
      </ul>

      <p className="mt-8 max-w-md text-sm text-bone-200/50">
        Off-menu requests (color, line work, weddings) — drop a note in the booking form.
      </p>
    </Section>
  );
}
