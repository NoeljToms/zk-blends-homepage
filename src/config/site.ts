/**
 * Centralized site config. Replace placeholder values before going live.
 */

export const siteConfig = {
  name: "ZK Blends",
  shortName: "ZK",
  tagline: "Sharp cuts. Considered detail.",
  description:
    "ZK Blends is a solo barber crafting precision haircuts and beard work in a quiet, focused studio. Book a chair.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zkblends.com",
  locale: "en-US",
  timezone: process.env.CAL_TIMEZONE ?? "America/New_York",

  // Placeholders — swap when real details land.
  contact: {
    phone: "+1 (555) 010-0420",
    phoneHref: "tel:+15550100420",
    email: "book@zkblends.com",
    emailHref: "mailto:book@zkblends.com",
    instagram: "https://www.instagram.com/zk_blends/",
    instagramHandle: "@zk_blends",
  },

  location: {
    label: "Studio Suite — Downtown",
    address: "1200 Atlantic Ave, Suite 4",
    city: "Brooklyn",
    region: "NY",
    postalCode: "11216",
    country: "US",
    mapUrl: "https://maps.google.com",
  },

  // Booking & availability defaults — used by both UI and Cal layer.
  booking: {
    openHour: 9, // 9:00 AM
    closeHour: 18, // 6:00 PM
    daysOpen: [1, 2, 3, 4, 5, 6] as const, // Mon–Sat (0 = Sun)
    bookingWindowDays: 14,
    slotIntervalMinutes: 30,
    bufferMinutes: 15,
  },

  // Editorial copy fragments reused across hero / sections.
  copy: {
    heroEyebrow: "Solo Barber · By Appointment",
    heroTitle: ["Precision cuts.", "Quiet confidence."],
    heroSubtitle:
      "A focused chair for clean fades, sharp lines, and beard work that holds its shape past the studio door.",
    aboutTitle: "Built around the chair, not the clock.",
    aboutBody:
      "Every appointment is one client at a time. Same hands, same attention, every visit. The room stays calm — phones down, music on, blade up.",
  },

  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#gallery" },
    { label: "Studio", href: "#about" },
    { label: "Book", href: "#book" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
