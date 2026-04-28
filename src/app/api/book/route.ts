import { NextResponse, type NextRequest } from "next/server";
import { createBookingSchema } from "@/lib/schemas";
import { createBooking } from "@/lib/cal";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid booking payload",
        details: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  try {
    const result = await createBooking({
      serviceId: parsed.data.serviceId,
      slot: parsed.data.slot,
      customer: {
        ...parsed.data.customer,
        notes: parsed.data.customer.notes ?? "",
      },
    });
    return NextResponse.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("[/api/book]", msg);
    return NextResponse.json(
      { error: "Booking could not be created. Please try again." },
      { status: 502 },
    );
  }
}
