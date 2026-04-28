import { cn } from "@/lib/utils";

export const STEP_LABELS = [
  "Service",
  "Date",
  "Time",
  "Details",
  "Review",
  "Confirm",
] as const;

export function Stepper({ current }: { current: number }) {
  return (
    <ol
      role="list"
      aria-label="Booking progress"
      className="flex items-center gap-1.5 overflow-x-auto px-1 no-scrollbar"
    >
      {STEP_LABELS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex shrink-0 items-center gap-1.5">
            <span
              className={cn(
                "inline-flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] tracking-wider transition-colors",
                done && "bg-bone-50 text-ink-950",
                active && "bg-brass-400 text-ink-950",
                !done && !active && "bg-white/[0.06] text-bone-200/40",
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.22em] transition-colors",
                active ? "text-bone-50" : "text-bone-200/40",
              )}
            >
              {label}
            </span>
            {i < STEP_LABELS.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "mx-1 h-px w-6 transition-colors",
                  i < current ? "bg-bone-200/40" : "bg-white/10",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
