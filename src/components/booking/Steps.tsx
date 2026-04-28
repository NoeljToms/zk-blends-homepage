"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { services, formatPrice, formatDuration, getService } from "@/config/services";
import {
  formatSlotLabel,
  getBookableDates,
  type BookingDraft,
  type CustomerDetails,
  type Slot,
} from "@/lib/booking";
import { formatLongDate, formatTime, isSameDay, toDateKey } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Step 1 — Service                                                          */
/* -------------------------------------------------------------------------- */

export function StepService({
  draft,
  onSelect,
}: {
  draft: BookingDraft;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-3">
      {services.map((s, i) => {
        const selected = draft.serviceId === s.id;
        return (
          <motion.button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={cn(
              "group relative flex items-start justify-between gap-6 rounded-2xl border bg-ink-900/60 p-5 text-left transition-colors",
              selected
                ? "border-brass-400/60 bg-brass-400/[0.04]"
                : "border-white/[0.07] hover:border-white/[0.18]",
            )}
            aria-pressed={selected}
          >
            <div>
              <p className="display text-2xl text-bone-50">{s.name}</p>
              <p className="mt-1.5 max-w-sm text-sm text-bone-200/60">
                {s.description}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300/50">
                {formatDuration(s.durationMinutes)}
              </p>
            </div>
            <div className="text-right">
              <p className="display text-2xl text-bone-50">{formatPrice(s.priceUSD)}</p>
              <span
                className={cn(
                  "mt-3 inline-flex h-6 w-6 items-center justify-center rounded-full text-[12px] transition-colors",
                  selected
                    ? "bg-brass-400 text-ink-950"
                    : "border border-white/15 text-transparent",
                )}
                aria-hidden
              >
                ✓
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step 2 — Date                                                             */
/* -------------------------------------------------------------------------- */

export function StepDate({
  draft,
  onSelect,
}: {
  draft: BookingDraft;
  onSelect: (key: string) => void;
}) {
  const dates = useMemo(() => getBookableDates(), []);
  const selectedKey = draft.dateKey;

  // Group by week label (week-of)
  const grouped = useMemo(() => {
    const groups: { weekStart: Date; dates: Date[] }[] = [];
    for (const d of dates) {
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      const last = groups[groups.length - 1];
      if (!last || !isSameDay(last.weekStart, weekStart)) {
        groups.push({ weekStart, dates: [d] });
      } else {
        last.dates.push(d);
      }
    }
    return groups;
  }, [dates]);

  return (
    <div className="space-y-7">
      {grouped.map((g, gi) => (
        <div key={g.weekStart.toISOString()}>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300/50">
            Week of {g.weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {g.dates.map((d) => {
              const key = toDateKey(d);
              const selected = selectedKey === key;
              const today = isSameDay(d, new Date());
              return (
                <motion.button
                  key={key}
                  type="button"
                  onClick={() => onSelect(key)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: gi * 0.04 }}
                  className={cn(
                    "group flex flex-col items-start rounded-2xl border p-3 text-left transition-colors",
                    selected
                      ? "border-brass-400/60 bg-brass-400/[0.06]"
                      : "border-white/[0.07] bg-ink-900/40 hover:border-white/[0.18]",
                  )}
                  aria-pressed={selected}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300/50">
                    {d.toLocaleDateString("en-US", { weekday: "short" })}
                    {today && (
                      <span className="ml-1 text-brass-400">· today</span>
                    )}
                  </span>
                  <span className="display mt-1.5 text-2xl text-bone-50">
                    {d.getDate()}
                  </span>
                  <span className="text-[11px] text-bone-200/40">
                    {d.toLocaleDateString("en-US", { month: "short" })}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step 3 — Time                                                             */
/* -------------------------------------------------------------------------- */

export function StepTime({
  draft,
  onSelect,
}: {
  draft: BookingDraft;
  onSelect: (slot: Slot) => void;
}) {
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mock, setMock] = useState(false);

  useEffect(() => {
    if (!draft.serviceId || !draft.dateKey) return;
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    fetch(
      `/api/availability?serviceId=${encodeURIComponent(draft.serviceId)}&dateKey=${encodeURIComponent(draft.dateKey)}`,
      { signal: ctrl.signal },
    )
      .then(async (res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const j = (await res.json()) as { slots: Slot[]; mock: boolean };
        setSlots(j.slots);
        setMock(j.mock);
      })
      .catch((e: unknown) => {
        if ((e as { name?: string }).name === "AbortError") return;
        setError("Couldn't load times. Try another day.");
        setSlots([]);
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [draft.serviceId, draft.dateKey]);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-12 animate-pulse rounded-xl bg-white/[0.04]"
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-300/80">{error}</p>;
  }

  if (!slots || slots.length === 0) {
    return (
      <p className="rounded-xl border border-white/[0.07] bg-ink-900/40 p-5 text-sm text-bone-200/60">
        No openings left on this day. Try another date.
      </p>
    );
  }

  // Bucket into AM / PM for editorial feel.
  const am = slots.filter((s) => new Date(s.start).getHours() < 12);
  const pm = slots.filter((s) => new Date(s.start).getHours() >= 12);

  return (
    <div className="space-y-7">
      {mock && (
        <p className="rounded-lg border border-brass-400/20 bg-brass-400/[0.04] px-3 py-2 text-[11px] text-brass-400">
          Demo availability — connect Cal.com to pull real openings.
        </p>
      )}
      {[
        { label: "Morning", group: am },
        { label: "Afternoon", group: pm },
      ].map(
        ({ label, group }) =>
          group.length > 0 && (
            <div key={label}>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300/50">
                {label}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {group.map((slot) => {
                  const selected = draft.slot?.start === slot.start;
                  return (
                    <button
                      key={slot.start}
                      type="button"
                      onClick={() => onSelect(slot)}
                      className={cn(
                        "h-11 rounded-xl border text-sm tracking-tight transition-colors",
                        selected
                          ? "border-brass-400/60 bg-brass-400 text-ink-950"
                          : "border-white/[0.08] bg-ink-900/40 text-bone-100 hover:border-white/[0.2]",
                      )}
                      aria-pressed={selected}
                    >
                      {formatSlotLabel(slot)}
                    </button>
                  );
                })}
              </div>
            </div>
          ),
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step 4 — Details                                                          */
/* -------------------------------------------------------------------------- */

export function StepDetails({
  draft,
  onChange,
  errors,
}: {
  draft: BookingDraft;
  onChange: (partial: Partial<CustomerDetails>) => void;
  errors: Record<string, string>;
}) {
  const c = draft.customer;
  return (
    <div className="grid gap-4">
      <Field
        label="Full name"
        error={errors.name}
        input={
          <input
            value={c.name}
            onChange={(e) => onChange({ name: e.target.value })}
            autoComplete="name"
            inputMode="text"
            placeholder="First Last"
            className={inputCls}
          />
        }
      />
      <Field
        label="Email"
        error={errors.email}
        input={
          <input
            value={c.email}
            onChange={(e) => onChange({ email: e.target.value })}
            autoComplete="email"
            inputMode="email"
            type="email"
            placeholder="you@email.com"
            className={inputCls}
          />
        }
      />
      <Field
        label="Phone"
        error={errors.phone}
        input={
          <input
            value={c.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            autoComplete="tel"
            inputMode="tel"
            placeholder="+1 (555) 010-0420"
            className={inputCls}
          />
        }
      />
      <Field
        label="Notes (optional)"
        hint="Specific style, off-menu requests, anything I should know."
        input={
          <textarea
            value={c.notes ?? ""}
            onChange={(e) => onChange({ notes: e.target.value })}
            rows={3}
            placeholder="Tighter on the sides, longer on top, hold the texture."
            className={cn(inputCls, "h-auto resize-none py-3")}
          />
        }
      />
      <p className="text-[11px] text-bone-200/40">
        Your details are used only to confirm and remind you about this booking.
      </p>
    </div>
  );
}

const inputCls =
  "h-12 w-full rounded-xl border border-white/[0.08] bg-ink-900/40 px-4 text-[15px] text-bone-50 placeholder:text-bone-200/30 transition-colors focus:border-brass-400/50 focus:outline-none";

function Field({
  label,
  input,
  error,
  hint,
}: {
  label: string;
  input: React.ReactNode;
  error?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300/60">
        {label}
      </span>
      {input}
      {error ? (
        <span className="mt-1.5 block text-[12px] text-red-300/80">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-[12px] text-bone-200/40">{hint}</span>
      ) : null}
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step 5 — Review                                                           */
/* -------------------------------------------------------------------------- */

export function StepReview({ draft }: { draft: BookingDraft }) {
  const svc = draft.serviceId ? getService(draft.serviceId) : undefined;
  const date = draft.slot ? new Date(draft.slot.start) : null;

  const rows: Array<{ k: string; v: string }> = [];
  if (svc) {
    rows.push({ k: "Service", v: svc.name });
    rows.push({ k: "Duration", v: formatDuration(svc.durationMinutes) });
    rows.push({ k: "Price", v: formatPrice(svc.priceUSD) });
  }
  if (date) {
    rows.push({ k: "Date", v: formatLongDate(date) });
    rows.push({ k: "Time", v: formatTime(date) });
  }
  rows.push({ k: "Name", v: draft.customer.name });
  rows.push({ k: "Email", v: draft.customer.email });
  rows.push({ k: "Phone", v: draft.customer.phone });
  if (draft.customer.notes) rows.push({ k: "Notes", v: draft.customer.notes });

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-900/40">
      <dl className="divide-y divide-white/[0.05]">
        {rows.map((r) => (
          <div
            key={r.k}
            className="flex items-start justify-between gap-6 px-5 py-3.5 text-sm"
          >
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300/50">
              {r.k}
            </dt>
            <dd className="max-w-[60%] text-right text-bone-50">{r.v}</dd>
          </div>
        ))}
      </dl>
      <div className="border-t border-white/[0.05] bg-white/[0.015] px-5 py-3 text-[11px] text-bone-200/50">
        Studio · {siteConfig.location.city}, {siteConfig.location.region}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step 6 — Confirm                                                          */
/* -------------------------------------------------------------------------- */

export function StepConfirm({
  draft,
  bookingId,
  mock,
}: {
  draft: BookingDraft;
  bookingId: string | null;
  mock: boolean;
}) {
  const date = draft.slot ? new Date(draft.slot.start) : null;
  return (
    <div className="overflow-hidden rounded-2xl border border-brass-400/30 bg-brass-400/[0.04] p-7 text-center">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-brass-400/40 bg-brass-400/10"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
          <path
            d="M4 10.5l4 4 8-9"
            stroke="#c9a35c"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-brass-400">
        Booked
      </p>
      <h3 className="display mt-2 text-3xl text-bone-50 sm:text-4xl">
        See you on {date ? formatLongDate(date) : "your date"}.
      </h3>
      <p className="mt-3 text-sm text-bone-200/60">
        {date ? `${formatTime(date)} · ` : ""}
        Confirmation sent to{" "}
        <span className="text-bone-50">{draft.customer.email}</span>.
      </p>
      {bookingId && (
        <p className="mt-4 font-mono text-[11px] tracking-wider text-bone-200/40">
          Ref · {bookingId}
        </p>
      )}
      {mock && (
        <p className="mt-4 text-[11px] text-bone-200/40">
          (Demo confirmation — Cal.com not yet connected.)
        </p>
      )}
    </div>
  );
}
