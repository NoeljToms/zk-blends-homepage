import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  bare?: boolean;
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  bare,
}: Props) {
  return (
    <section
      id={id}
      className={cn("relative py-20 sm:py-28 md:py-32", className)}
    >
      <Container>
        {!bare && (eyebrow || title || intro) && (
          <header className="mb-12 max-w-2xl sm:mb-16">
            {eyebrow && (
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300/70">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="display text-4xl text-bone-50 sm:text-5xl md:text-6xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-5 max-w-xl text-base text-bone-200/70 sm:text-lg">
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
