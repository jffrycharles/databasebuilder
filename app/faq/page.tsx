import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import Accordion from "@/components/ui/Accordion";
import CtaBand from "@/components/sections/CtaBand";
import CtaButton from "@/components/ui/CtaButton";
import SmartLink from "@/components/ui/SmartLink";
import Label from "@/components/ui/Label";
import { Icon } from "@/components/ui/Icon";
import { FAQ_ITEMS, FAQ_CATEGORIES } from "@/lib/faq";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers on importing your own data, customization, cancellation, security, pricing, sales training, the 7-day free trial and support.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — DatabaseBuilder",
    description: "The questions we are asked most, answered plainly.",
    url: "/faq",
    type: "website",
  },
};

export default function FaqPage() {
  const byId = (id: string) => FAQ_ITEMS.find((f) => f.id === id);

  return (
    <main id="main">
      <PageHero
        label="FAQ"
        title={
          <>
            Your questions, <span className="text-db-red-hot">answered.</span>
          </>
        }
        lede="Everything customers ask before they start, in plain language. If yours is not here, a person will answer it."
        aside={
          <div className="db-surface p-[clamp(20px,2vw,30px)]">
            <p className="db-kicker text-white/40">Rather just ask</p>
            <a
              href={CONTACT.phone.href}
              className="font-body mt-2.5 block text-[clamp(20px,1.7vw,27px)] leading-none font-bold text-white transition-opacity hover:opacity-80"
            >
              {CONTACT.phone.label}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="db-link db-link--on-dark db-sm mt-3.5"
            >
              <Icon name="mail" />
              {CONTACT.email}
            </a>
          </div>
        }
      />

      <section data-surface="page" className="db-section bg-page">
        <div className="db-shell">
          <div className="grid gap-[var(--db-gap-lg)] lg:grid-cols-[0.62fr_1.38fr]">
            {/* orientation, and a way out — travels with the reader */}
            <div className="lg:sticky lg:top-[calc(var(--db-header-h)+32px)] lg:self-start">
              <SectionHeading
                label={`${FAQ_ITEMS.length} questions`}
                title={
                  <>
                    Grouped so you can find <span className="text-db-red">yours</span>
                  </>
                }
              />

              <Reveal delay={90}>
                <nav className="db-rows border-line mt-7 grid border-y" aria-label="FAQ sections">
                  {FAQ_CATEGORIES.map((c) => (
                    <a
                      key={c.title}
                      href={`#${c.ids[0]}`}
                      className="db-h4 text-ink hover:text-brand group flex items-center gap-3 py-3.5 transition-colors"
                    >
                      {c.title}
                      <span className="db-sm text-ink-3 ml-auto font-normal tabular-nums">
                        {c.ids.length}
                      </span>
                      <svg
                        viewBox="0 0 24 24"
                        className="text-brand h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12h13M13 6l6 6-6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  ))}
                </nav>
              </Reveal>

              <Reveal delay={150} className="mt-8">
                <h2 className="db-h3 text-ink">Still not sure it fits?</h2>
                <p className="db-sm text-ink-2 mt-2 max-w-[36ch]">
                  Take the 7-day trial, or talk it through with someone who uses the product daily.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <CtaButton>Start Free Trial</CtaButton>
                  <SmartLink href="/contact" className="db-link db-sm">
                    Contact us
                  </SmartLink>
                </div>
              </Reveal>
            </div>

            {/* every question, grouped */}
            <div className="grid gap-[clamp(32px,3.4vw,56px)]">
              {FAQ_CATEGORIES.map((cat, i) => {
                const items = cat.ids
                  .map(byId)
                  .filter((f): f is (typeof FAQ_ITEMS)[number] => Boolean(f));
                return (
                  <Reveal key={cat.title} delay={i * 60}>
                    <div className="mb-4">
                      <Label className="mb-3">{cat.title}</Label>
                      <p className="db-sm text-ink-2 max-w-[46ch]">{cat.blurb}</p>
                    </div>
                    <Accordion items={items} openFirst={i === 0} bare />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CtaBand id="trial" showTrialLength />
    </main>
  );
}
