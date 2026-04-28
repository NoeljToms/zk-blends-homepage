import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Reels } from "@/components/sections/Reels";
import { About } from "@/components/sections/About";
import { BookingSection } from "@/components/sections/BookingSection";
import { siteConfig } from "@/config/site";
import { services, formatPrice } from "@/config/services";

export default function Page() {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    image: `${siteConfig.url}/og.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.location.address,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      postalCode: siteConfig.location.postalCode,
      addressCountry: siteConfig.location.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: `${String(siteConfig.booking.openHour).padStart(2, "0")}:00`,
        closes: `${String(siteConfig.booking.closeHour).padStart(2, "0")}:00`,
      },
    ],
    sameAs: [siteConfig.contact.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
        },
        price: s.priceUSD,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: s.priceUSD,
          priceCurrency: "USD",
        },
        availability: "https://schema.org/InStock",
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
      <Header />
      <main className="relative">
        <Hero />
        <Services />
        {/* <Gallery /> */}
        <Reels />
        <About />
        <BookingSection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
