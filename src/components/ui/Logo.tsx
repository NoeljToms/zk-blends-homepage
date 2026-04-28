import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "display inline-flex items-baseline text-[22px] font-semibold leading-none tracking-tight text-bone-50",
        className,
      )}
    >
      <span>ZK</span>
      <span className="ml-1 text-brass-400">·</span>
      <span className="ml-1 text-bone-50/70">Blends</span>
    </span>
  );
}
