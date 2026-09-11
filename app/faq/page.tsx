import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import Accordion from "@/components/ui/Accordion";
import CtaBand from "@/components/sections/CtaBand";
import CtaButton from "@/components/ui/CtaButton";
import SmartLink from "@/components/ui/SmartLink";
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
    <main>
      <PageHero
        label="FAQ"
        title={
          <>
            Your questions, <span className="text-db-red-hot">answered.</span>
          </>
        }
        lede="Everything customers ask before they start, in plain language. If yours is not here, a person will answer it."
        aside={
          <div className="rounded-[16px] border border-white/12 bg-white/[0.035] p-[clamp(18px,1.8vw,26px)]">
            <p className="font-ui text-[11.5px] tracking-[.16em] text-white/40 uppercase">
              Rather just ask
            </p>
            <a
              href={CONTACT.phone.href}
              className="font-body mt-2 block text-[clamp(19px,1.6vw,26px)] font-bold text-white transition-opacity hover:opacity-80"
            >
              {CONTACT.phone.label}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-db-cyan mt-2 inline-flex items-center gap-2 text-[14.5px] font-semibold"
            >
              <Icon name="mail" className="h-4 w-4" />
              {CONTACT.email}
            </a>
          </div>
        }
      />

      <section className="db-section bg-page">
        <div className="db-shell">
          <div className="grid gap-[clamp(28px,3.4vw,56px)] lg:grid-cols-[0.72fr_1.28fr]">
            {/* left rail: orientation and a way out */}
            <div>
              <SectionHeading
                label={`${FAQ_ITEMS.length} questions`}
                title={
                  <>
                    Grouped so you can find <span className="text-db-red">yours</span>
                  </>
                }
                lede="Four groups, from what happens to your data through to what support looks like once you are running."
              />

              <Reveal delay={90}>
                <nav className="mt-7 grid gap-2" aria-label="FAQ sections">
                  {FAQ_CATEGORIES.map((c) => (
                    <a
                      key={c.title}
                      href={`#${c.ids[0]}`}
                      className="db-card-flat text-ink hover:border-brand/40 group flex items-center gap-3 px-4 py-3 text-[15px] font-semibold transition-colors"
                    >
                      {c.title}
                      <span className="text-ink-3 ml-auto text-[13px] font-normal">
                        {c.ids.length}
                      </span>
                      <svg viewBox="0 0 24 24" className="text-brand h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true">
                        <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </nav>
              </Reveal>

              <Reveal delay={150}>
                <div className="bg-navy mt-6 rounded-[16px] p-[clamp(20px,2vw,28px)] text-white">
                  <h2 className="font-body m-0 text-[clamp(17px,1.3vw,21px)] font-bold">
                    Still not sure it fits?
                  </h2>
                  <p className="mt-2.5 text-[14.5px] leading-[1.6] text-white/70">
                    Take the 7-day trial, or talk it through with someone who uses the product daily.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <CtaButton className="text-[15px]">Start Free Trial</CtaButton>
                    <SmartLink href="/contact" className="text-db-cyan text-[14.5px] font-semibold">
                      Contact us
                    </SmartLink>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* right: every question, grouped */}
            <div className="grid gap-8">
              {FAQ_CATEGORIES.map((cat, i) => {
                const items = cat.ids.map(byId).filter((f): f is (typeof FAQ_ITEMS)[number] => Boolean(f));
                return (
                  <Reveal key={cat.title} delay={i * 60}>
                    <div className="mb-3.5">
                      <h2 className="font-body text-ink m-0 text-[clamp(17px,1.3vw,22px)] font-bold tracking-[-.01em]">
                        {cat.title}
                      </h2>
                      <p className="text-ink-2 mt-1 text-[clamp(14px,0.88vw,15.5px)]">{cat.blurb}</p>
                    </div>
                    <Accordion items={items} openFirst={i === 0} />
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
