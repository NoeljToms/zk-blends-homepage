import { siteConfig } from "@/config/site";
import { pad2, toDateKey } from "./utils";

/**
 * Booking helpers — pure functions, no I/O. Used to build the date picker,
 * generate fallback time slots in mock mode, and validate input.
 */

export type Slot = {
  /** ISO 8601 string (UTC). */
  start: string;
  /** ISO 8601 string (UTC). */
  end: string;
};

/** Returns true if the studio is open on this weekday (0 = Sun, 6 = Sat). */
export function isOpenDay(date: Date): boolean {
  return (siteConfig.booking.daysOpen as readonly number[]).includes(date.getDay());
}

/**
 * Builds a list of upcoming dates within the booking window.
 * Skips closed days. Includes today only if it's still open and within hours.
 */
export function getBookableDates(now: Date = new Date()): Date[] {
  const out: Date[] = [];
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  for (let i = 0; i < siteConfig.booking.bookingWindowDays; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    if (!isOpenDay(d)) continue;
    // Skip today if it's already past close.
    if (i === 0 && now.getHours() >= siteConfig.booking.closeHour) continue;
    out.push(d);
  }
  return out;
}

/**
 * Generates fallback time slots locally when Cal isn't available (mock mode).
 * In production these come from /api/availability.
 */
export function generateMockSlots(date: Date, durationMinutes: number): Slot[] {
  const { openHour, closeHour, slotIntervalMinutes, bufferMinutes } =
    siteConfig.booking;
  const slots: Slot[] = [];
  const totalBlock = durationMinutes + bufferMinutes;
  const dayStart = new Date(date);
  dayStart.setHours(openHour, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(closeHour, 0, 0, 0);

  // Pseudo-random "booked" mask seeded by date so it stays stable on re-render.
  const seed = date.getDate() * 7 + date.getMonth() * 13;
  const cursor = new Date(dayStart);
  let i = 0;

  while (cursor.getTime() + durationMinutes * 60_000 <= dayEnd.getTime()) {
    const startISO = cursor.toISOString();
    const end = new Date(cursor.getTime() + durationMinutes * 60_000);
    // Mark some slots as already-booked (~30%) to feel real.
    const isBooked = (seed + i * 11) % 7 < 2;
    if (!isBooked) {
      slots.push({ start: startISO, end: end.toISOString() });
    }
    cursor.setMinutes(cursor.getMinutes() + slotIntervalMinutes);
    i++;
  }

  // If date is today, drop slots already in the past (with buffer).
  const now = new Date();
  if (toDateKey(date) === toDateKey(now)) {
    const cutoff = now.getTime() + 30 * 60_000;
    return slots.filter((s) => new Date(s.start).getTime() >= cutoff);
  }
  // Suppress unused warning — totalBlock kept for clarity of intent.
  void totalBlock;
  return slots;
}

/** Format a slot for display in local time, e.g. "10:30 AM". */
export function formatSlotLabel(slot: Slot): string {
  const d = new Date(slot.start);
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${pad2(m)} ${ampm}`;
}

export type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

export type BookingDraft = {
  serviceId: string | null;
  dateKey: string | null;
  slot: Slot | null;
  customer: CustomerDetails;
};

export const emptyDraft: BookingDraft = {
  serviceId: null,
  dateKey: null,
  slot: null,
  customer: { name: "", email: "", phone: "", notes: "" },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s().-]{6,}$/;

export function validateCustomer(c: CustomerDetails): Record<string, string> {
  const errs: Record<string, string> = {};
  if (!c.name.trim() || c.name.trim().length < 2) errs.name = "Please enter your name.";
  if (!EMAIL_RE.test(c.email.trim())) errs.email = "Enter a valid email address.";
  if (!PHONE_RE.test(c.phone.trim())) errs.phone = "Enter a valid phone number.";
  return errs;
}
