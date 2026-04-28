import { NextResponse, type NextRequest } from "next/server";
import { availabilityQuerySchema } from "@/lib/schemas";
import { getAvailability } from "@/lib/cal";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const params = {
    serviceId: req.nextUrl.searchParams.get("serviceId") ?? "",
    dateKey: req.nextUrl.searchParams.get("dateKey") ?? "",
  };

  const parsed = availabilityQuerySchema.safeParse(params);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const result = await getAvailability(parsed.data);
    return NextResponse.json(result, {
      headers: {
        // Cache lightly so repeat day-views are instant.
        "Cache-Control": "public, max-age=30, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (e) {
    console.error("[/api/availability]", e);
    return NextResponse.json(
      { error: "Failed to load availability" },
      { status: 500 },
    );
  }
}
