import { z } from "zod";

export const availabilityQuerySchema = z.object({
  serviceId: z.string().min(1),
  dateKey: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "dateKey must be YYYY-MM-DD"),
});

export const createBookingSchema = z.object({
  serviceId: z.string().min(1),
  slot: z.object({
    start: z.string(),
    end: z.string(),
  }),
  customer: z.object({
    name: z.string().min(2).max(120),
    email: z.string().email().max(200),
    phone: z.string().min(7).max(40),
    notes: z.string().max(500).optional().nullable(),
  }),
});

export type CreateBookingPayload = z.infer<typeof createBookingSchema>;
