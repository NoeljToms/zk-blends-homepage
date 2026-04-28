import { siteConfig } from "@/config/site";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-10 border-t border-white/[0.06] py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo className="text-2xl" />
            <p className="mt-4 max-w-xs text-sm text-bone-200/60">
              {siteConfig.description}
            </p>
          </div>

          <div className="text-sm text-bone-200/70">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300/60">
              Studio
            </p>
            <p>{siteConfig.location.label}</p>
            <p className="text-bone-200/50">
              {siteConfig.location.address}
            </p>
            <p className="text-bone-200/50">
              {siteConfig.location.city}, {siteConfig.location.region}{" "}
              {siteConfig.location.postalCode}
            </p>
          </div>

          <div className="text-sm text-bone-200/70">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300/60">
              Contact
            </p>
            <a
              href={siteConfig.contact.phoneHref}
              className="block transition-colors hover:text-bone-50"
            >
              {siteConfig.contact.phone}
            </a>
            <a
              href={siteConfig.contact.emailHref}
              className="block transition-colors hover:text-bone-50"
            >
              {siteConfig.contact.email}
            </a>
            <a
              href={siteConfig.contact.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="block transition-colors hover:text-bone-50"
            >
              {siteConfig.contact.instagramHandle}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-bone-200/40 sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name}. By appointment only.
          </p>
          <p className="font-mono uppercase tracking-[0.22em]">
            Mon–Sat · {siteConfig.booking.openHour}:00 — {siteConfig.booking.closeHour}:00
          </p>
        </div>
      </Container>
    </footer>
  );
}
