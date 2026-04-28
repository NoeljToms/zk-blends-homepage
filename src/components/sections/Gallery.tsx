"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { galleryImages } from "@/config/media";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const aspectClass: Record<string, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  tall: "aspect-[3/5]",
};

/**
 * Editorial 12-col mosaic. Each tile gets an explicit col/row span so the
 * layout reads as curated rather than auto-grid.
 */
const layout = [
  "col-span-7 row-span-2",
  "col-span-5",
  "col-span-5",
  "col-span-6",
  "col-span-6 row-span-2",
  "col-span-6",
  "col-span-7",
  "col-span-5",
];

export function Gallery() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="gallery"
      eyebrow="Selected work"
      title={<>The cut <span className="text-bone-300/60">speaks first.</span></>}
      intro="A small archive of recent finishes. Texture, line, and shape — held together by consistency."
    >
      <div className="hidden auto-rows-[120px] grid-cols-12 gap-3 md:grid">
        {galleryImages.slice(0, layout.length).map((img, i) => (
          <motion.div
            key={img.src}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.6,
              delay: (i % 4) * 0.07,
              ease: [0.22, 0.61, 0.36, 1],
            }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-ink-900",
              layout[i],
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              loading={i < 2 ? "eager" : "lazy"}
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </motion.div>
        ))}
      </div>

      {/* Mobile: horizontal-scroll, 1.2-card peek */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 no-scrollbar md:hidden">
        {galleryImages.map((img, i) => (
          <div
            key={img.src}
            className={cn(
              "relative shrink-0 snap-start overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-900",
              i % 2 === 0 ? "aspect-[4/5] w-[78%]" : "aspect-[3/4] w-[68%]",
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              loading={i < 2 ? "eager" : "lazy"}
              sizes="80vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
