"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** "up" reveals from below, "fade" is just opacity. */
  variant?: "up" | "fade";
  once?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "up",
  once = true,
}: Props) {
  const reduce = useReducedMotion();

  const variants: Variants = reduce
    ? {
        hidden: { opacity: 1 },
        show: { opacity: 1 },
      }
    : variant === "fade"
      ? {
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.6, delay } },
        }
      : {
          hidden: { opacity: 0, y: 18 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay },
          },
        };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
