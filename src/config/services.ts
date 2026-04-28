/**
 * Service catalog. Add new services here — UI and booking flow read from this list.
 */

export type Service = {
  id: string;
  name: string;
  priceUSD: number;
  durationMinutes: number;
  description: string;
  /** Cal.com event type slug or numeric ID. Read from env at runtime. */
  calEventTypeEnv: string;
  /** Marketing tagline */
  tag?: string;
};

export const services: Service[] = [
  {
    id: "haircut",
    name: "Haircut",
    priceUSD: 30,
    durationMinutes: 45,
    description:
      "A clean, considered cut. Skin to scissor, blended for the way your hair actually grows.",
    calEventTypeEnv: "CAL_EVENT_TYPE_HAIRCUT",
    tag: "Most booked",
  },
  {
    id: "beard-haircut",
    name: "Beard + Haircut",
    priceUSD: 60,
    durationMinutes: 75,
    description:
      "Full reset. Cut, lined, and a beard sculpt that frames the face — hot towel finish.",
    calEventTypeEnv: "CAL_EVENT_TYPE_BEARD_HAIRCUT",
    tag: "Full reset",
  },
];

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function formatPrice(usd: number): string {
  return `$${usd}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}
