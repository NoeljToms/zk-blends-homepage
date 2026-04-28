import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(at 0% 0%, #1d1c18 0%, #0a0908 60%), #0a0908",
          color: "#ece4d6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "ui-monospace, monospace",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#c9a35c",
          }}
        >
          <span style={{ width: 8, height: 8, background: "#c9a35c", borderRadius: 999 }} />
          Solo Barber · By Appointment
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 132,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: -4,
            }}
          >
            Precision cuts.
          </div>
          <div
            style={{
              fontSize: 132,
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: -4,
              color: "rgba(236, 228, 214, 0.6)",
            }}
          >
            Quiet confidence.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ fontSize: 36, letterSpacing: -1, fontWeight: 600 }}>
            ZK <span style={{ color: "#c9a35c" }}>·</span>{" "}
            <span style={{ color: "rgba(236,228,214,0.7)" }}>Blends</span>
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(236, 228, 214, 0.5)",
            }}
          >
            zkblends.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
