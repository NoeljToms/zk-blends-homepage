"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  emptyDraft,
  validateCustomer,
  type BookingDraft,
  type CustomerDetails,
  type Slot,
} from "@/lib/booking";
import {
  StepService,
  StepDate,
  StepTime,
  StepDetails,
  StepReview,
  StepConfirm,
} from "./Steps";
import { Stepper, STEP_LABELS } from "./Stepper";
import { cn } from "@/lib/utils";

const STEP_COUNT = STEP_LABELS.length;

export function BookingFlow() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [resultMock, setResultMock] = useState(false);

  /* Pre-fill service if hash includes ?service= or #book?service= */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    const match = hash.match(/service=([\w-]+)/);
    if (match) {
      setDraft((d) => ({ ...d, serviceId: match[1] }));
    }
  }, []);

  const go = useCallback((next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  }, [step]);

  const next = () => go(Math.min(step + 1, STEP_COUNT - 1));
  const back = () => go(Math.max(step - 1, 0));

  const canProceed = (() => {
    switch (step) {
      case 0:
        return Boolean(draft.serviceId);
      case 1:
        return Boolean(draft.dateKey);
      case 2:
        return Boolean(draft.slot);
      case 3:
        return Object.keys(validateCustomer(draft.customer)).length === 0;
      case 4:
        return !submitting;
      default:
        return false;
    }
  })();

  async function submit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: draft.serviceId,
          slot: draft.slot,
          customer: draft.customer,
        }),
      });
      const j = (await res.json()) as
        | { id: string; mock: boolean }
        | { error: string };
      if (!res.ok || "error" in j) {
        throw new Error(("error" in j && j.error) || `Server returned ${res.status}`);
      }
      setBookingId(j.id);
      setResultMock(j.mock);
      go(5);
    } catch (e) {
      setSubmitError(
        e instanceof Error
          ? e.message
          : "Something went wrong. Try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleNext() {
    if (step === 3) {
      const errs = validateCustomer(draft.customer);
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
    }
    if (step === 4) {
      submit();
      return;
    }
    next();
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-ink-850 to-ink-900 shadow-soft">
      <div className="border-b border-white/[0.05] px-5 py-4 sm:px-7">
        <Stepper current={step} />
      </div>

      <div className="px-5 py-7 sm:px-7 sm:py-9">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={
              reduce ? false : { opacity: 0, x: direction === 1 ? 24 : -24 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction === 1 ? -24 : 24 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {step === 0 && (
              <StepService
                draft={draft}
                onSelect={(id) => {
                  setDraft((d) => ({ ...d, serviceId: id }));
                  // Auto-advance after a tiny beat for a smoother feel.
                  setTimeout(() => go(1), 220);
                }}
              />
            )}
            {step === 1 && (
              <StepDate
                draft={draft}
                onSelect={(key) => {
                  setDraft((d) => ({ ...d, dateKey: key, slot: null }));
                  setTimeout(() => go(2), 200);
                }}
              />
            )}
            {step === 2 && (
              <StepTime
                draft={draft}
                onSelect={(slot: Slot) => {
                  setDraft((d) => ({ ...d, slot }));
                  setTimeout(() => go(3), 180);
                }}
              />
            )}
            {step === 3 && (
              <StepDetails
                draft={draft}
                onChange={(p: Partial<CustomerDetails>) => {
                  setDraft((d) => ({ ...d, customer: { ...d.customer, ...p } }));
                  if (Object.keys(errors).length) {
                    // re-validate live once the user starts editing
                    setErrors(validateCustomer({ ...draft.customer, ...p }));
                  }
                }}
                errors={errors}
              />
            )}
            {step === 4 && <StepReview draft={draft} />}
            {step === 5 && (
              <StepConfirm
                draft={draft}
                bookingId={bookingId}
                mock={resultMock}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {submitError && step === 4 && (
          <p className="mt-4 rounded-lg border border-red-400/20 bg-red-400/[0.05] px-3 py-2 text-[12px] text-red-300/90">
            {submitError}
          </p>
        )}
      </div>

      {/* Footer controls */}
      {step < 5 && (
        <div className="flex items-center justify-between gap-3 border-t border-white/[0.05] bg-white/[0.015] px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className={cn(
              "h-10 rounded-full px-4 text-sm tracking-tight transition-colors",
              step === 0
                ? "cursor-not-allowed text-bone-200/30"
                : "text-bone-200 hover:text-bone-50",
            )}
          >
            ← Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed || submitting}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium tracking-tight transition-colors",
              canProceed && !submitting
                ? "bg-bone-50 text-ink-950 hover:bg-bone-100"
                : "cursor-not-allowed bg-white/10 text-bone-200/40",
            )}
          >
            {submitting && (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink-950/40 border-t-ink-950" />
            )}
            {step === 4
              ? submitting
                ? "Confirming…"
                : "Confirm booking"
              : "Continue"}
            {!submitting && (
              <span aria-hidden className="font-mono">→</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
