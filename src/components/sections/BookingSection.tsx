import { Container } from "@/components/ui/Container";
import { BookingFlow } from "@/components/booking/BookingFlow";

export function BookingSection() {
  return (
    <section id="book" className="relative py-20 sm:py-28 md:py-32">
      <Container>
        <div className="grid items-start gap-10 md:grid-cols-12 md:gap-16">
          <header className="md:col-span-5 md:sticky md:top-28">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-brass-400">
              Book
            </p>
            <h2 className="display mt-4 text-4xl text-bone-50 sm:text-5xl md:text-6xl">
              Reserve your chair.
            </h2>
            <p className="mt-5 max-w-md text-base text-bone-200/70 sm:text-lg">
              Pick a service, a time that fits, drop in your details. You'll get
              a confirmation in seconds — no account needed.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-bone-200/60">
              <li className="flex items-start gap-2">
                <span aria-hidden className="mt-[7px] h-1 w-1 rounded-full bg-brass-400" />
                Guest checkout — no signup, no app.
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden className="mt-[7px] h-1 w-1 rounded-full bg-brass-400" />
                Reschedule or cancel anytime via your confirmation email.
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden className="mt-[7px] h-1 w-1 rounded-full bg-brass-400" />
                A 15 min buffer between every cut — never rushed.
              </li>
            </ul>
          </header>

          <div className="md:col-span-7">
            <BookingFlow />
          </div>
        </div>
      </Container>
    </section>
  );
}
