import Reveal from "@/components/animations/Reveal";
import SmartLink from "@/components/ui/SmartLink";
import { Icon } from "@/components/ui/Icon";
import { CONTACT } from "@/lib/contact";

/* The end of an FAQ is where the people it did not help leave.
 *
 * Borrowed from the resource-card row a good SaaS page closes a documentation
 * section with, cut to two: the trial CTA already follows this band, so a
 * third card pointing at the trial would just be the same button twice.
 *
 * Both routes are ones the FAQ itself cannot serve — a person, and the price. */
const ROUTES = [
  {
    icon: "mail" as const,
    title: "Ask a person",
    body: "A person reads it — not a chatbot. Usually answered within one business day.",
    action: "Write to us",
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: "tag" as const,
    title: "See what it costs",
    body: "One all-in-one package, billed monthly. No tiers to decode and no setup fees.",
    action: "View pricing",
    href: "/pricing",
  },
];

export default function FaqFallback() {
  return (
    <section className="bg-page pb-[clamp(50px,5.5vw,96px)]">
      <div className="db-shell">
        <Reveal>
          <div className="border-line mx-auto max-w-[900px] rounded-[18px] border bg-white p-[clamp(22px,2.4vw,40px)] shadow-[0_2px_4px_#0d15260f,0_16px_40px_#0d152614]">
            <h2 className="font-display text-ink m-0 text-center text-[clamp(21px,1.9vw,30px)] leading-[1.12] tracking-[.015em]">
              Not in the list<span className="text-db-red">?</span>
            </h2>
            <p className="text-ink-2 mx-auto mt-2.5 max-w-[46ch] text-center text-[clamp(14px,0.9vw,16px)] leading-[1.6]">
              Two ways on — one to a person, one to the price.
            </p>

            <div className="mt-[clamp(20px,2vw,32px)] grid gap-[clamp(14px,1.4vw,22px)] sm:grid-cols-2">
              {ROUTES.map((r) => (
                <SmartLink key={r.title} href={r.href} className="db-route">
                  <span className="db-route__icon">
                    <Icon name={r.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="font-body text-ink mt-3 block text-[clamp(15.5px,1.05vw,18px)] leading-tight font-bold">
                    {r.title}
                  </span>
                  <span className="text-ink-2 mt-1.5 block text-[clamp(13px,0.85vw,14.5px)] leading-[1.58]">
                    {r.body}
                  </span>
                  <span className="text-brand font-ui mt-3.5 inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-[.04em] uppercase">
                    {r.action}
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </SmartLink>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
