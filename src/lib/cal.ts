import "server-only";
import { siteConfig } from "@/config/site";
import { getService } from "@/config/services";
import {
  generateMockSlots,
  type Slot,
  type CustomerDetails,
} from "./booking";
import { fromDateKey } from "./utils";

/**
 * Cal.com integration layer. Isolated so the rest of the app talks to a stable
 * surface (`getAvailability`, `createBooking`) regardless of whether real Cal
 * credentials exist. If they don't, we fall back to deterministic mock data so
 * the booking flow remains demoable in development.
 *
 * Cal.com v2 API docs: https://cal.com/docs/api-reference
 */

const CAL_API_BASE = "https://api.cal.com/v2";
const apiKey = process.env.CAL_API_KEY;
const calUsername = process.env.CAL_USERNAME;

/** True when no Cal API key is set — switches to local mock mode. */
export function isMockMode(): boolean {
  return !apiKey;
}

function eventTypeIdFor(serviceId: string): string | null {
  const svc = getService(serviceId);
  if (!svc) return null;
  const id = process.env[svc.calEventTypeEnv];
  return id && id.length > 0 ? id : null;
}

type CalSlotsResponse = {
  data?: {
    slots?: Record<string, Array<{ time: string }>>;
  };
};

type CalBookingResponse = {
  data?: {
    id?: number | string;
    uid?: string;
    status?: string;
  };
  error?: { message?: string };
};

export async function getAvailability(params: {
  serviceId: string;
  dateKey: string;
}): Promise<{ slots: Slot[]; mock: boolean }> {
  const svc = getService(params.serviceId);
  if (!svc) throw new Error("Unknown service");

  if (isMockMode()) {
    return {
      slots: generateMockSlots(fromDateKey(params.dateKey), svc.durationMinutes),
      mock: true,
    };
  }

  const eventTypeId = eventTypeIdFor(params.serviceId);
  if (!eventTypeId) {
    // Cal is configured globally but this service has no event type yet —
    // still serve mock so the UI stays functional.
    return {
      slots: generateMockSlots(fromDateKey(params.dateKey), svc.durationMinutes),
      mock: true,
    };
  }

  const date = fromDateKey(params.dateKey);
  const startTime = new Date(date);
  startTime.setHours(0, 0, 0, 0);
  const endTime = new Date(date);
  endTime.setHours(23, 59, 59, 999);

  const url = new URL(`${CAL_API_BASE}/slots/available`);
  url.searchParams.set("eventTypeId", eventTypeId);
  url.searchParams.set("startTime", startTime.toISOString());
  url.searchParams.set("endTime", endTime.toISOString());
  if (calUsername) url.searchParams.set("usernameList[]", calUsername);
  url.searchParams.set("timeZone", siteConfig.timezone);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
    // Re-fetch availability often — but cache for short windows to spare the API.
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    // Soft-degrade: log on server, mock on client.
    console.warn("[cal] availability fetch failed", res.status);
    return {
      slots: generateMockSlots(date, svc.durationMinutes),
      mock: true,
    };
  }

  const json = (await res.json()) as CalSlotsResponse;
  const dayBucket = json.data?.slots?.[params.dateKey] ?? [];
  const slots: Slot[] = dayBucket.map((s) => {
    const start = new Date(s.time);
    const end = new Date(start.getTime() + svc.durationMinutes * 60_000);
    return { start: start.toISOString(), end: end.toISOString() };
  });

  return { slots, mock: false };
}

export async function createBooking(params: {
  serviceId: string;
  slot: Slot;
  customer: CustomerDetails;
}): Promise<{ id: string; mock: boolean }> {
  const svc = getService(params.serviceId);
  if (!svc) throw new Error("Unknown service");

  if (isMockMode()) {
    // Pseudo-confirmation id, looks real enough for demo flow.
    const id = `zk_mock_${Date.now().toString(36)}`;
    return { id, mock: true };
  }

  const eventTypeId = eventTypeIdFor(params.serviceId);
  if (!eventTypeId) {
    const id = `zk_mock_${Date.now().toString(36)}`;
    return { id, mock: true };
  }

  const res = await fetch(`${CAL_API_BASE}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      eventTypeId: Number(eventTypeId),
      start: params.slot.start,
      attendee: {
        name: params.customer.name,
        email: params.customer.email,
        timeZone: siteConfig.timezone,
      },
      bookingFieldsResponses: {
        phone: params.customer.phone,
        notes: params.customer.notes ?? "",
      },
      metadata: {
        source: "zkblends.com",
        service: svc.id,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Cal booking failed (${res.status}): ${text.slice(0, 200)}`);
  }

  const json = (await res.json()) as CalBookingResponse;
  const id = String(json.data?.uid ?? json.data?.id ?? "unknown");
  return { id, mock: false };
}
