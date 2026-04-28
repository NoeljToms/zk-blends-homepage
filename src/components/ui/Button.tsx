"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

const base =
  "relative inline-flex select-none items-center justify-center gap-2 font-medium tracking-tight transition-[transform,background,border,color] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm rounded-full",
  lg: "h-13 px-7 text-[15px] rounded-full",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-bone-50 text-ink-950 hover:bg-bone-100 shadow-[0_8px_30px_-12px_rgba(236,228,214,0.25)]",
  ghost:
    "bg-white/[0.04] text-bone-100 hover:bg-white/[0.07] border border-white/10",
  outline:
    "bg-transparent text-bone-100 border border-bone-300/30 hover:border-bone-200/60 hover:bg-white/[0.03]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> &
  CommonProps & { as?: "button" };

type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> &
  CommonProps & { as: "a"; href: string };

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonAsButton | ButtonAsAnchor
>(function Button(props, ref) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  const cls = cn(base, sizes[size], variants[variant], className);

  if (rest.as === "a") {
    const { as: _as, ...anchor } = rest;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={cls}
        {...anchor}
      />
    );
  }
  const { as: _as, ...btn } = rest as ButtonAsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cls}
      {...btn}
    />
  );
});
