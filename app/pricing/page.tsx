import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import CtaBand from "@/components/sections/CtaBand";
import FeatureGroup from "@/components/ui/FeatureGroup";
import SmartLink from "@/components/ui/SmartLink";
import { Icon } from "@/components/ui/Icon";
import { PRICING, USAGE_CHARGES } from "@/lib/pricing";
import { FEATURE_GROUPS } from "@/lib/features";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One all-in-one CRM package for up to three users, with additional users available. No setup fees, no tiers, live human support and a 7-day free trial.",
  alternates: { canonical: "/pricing" }, 
  ...pageMeta({
    title: "Pricing — DatabaseBuilder CRM",
    description:
      "Simple, all-in-one CRM pricing. See what is included and how usage charges work.",
    path: "/pricing"
  }),
};

const PHILOSOPHY = [
  {
    title: "No tiers to decode",
    body: "There is one package. You are not comparing three columns to work out which features you lose.",
  },
  {
    title: "No feature gates",
    body: "Call recording, coaching, SMS and the dashboard are in the subscription, not sold back to you later.",
  },
  {
    title: "No long-term contract",
    body: "Cancel with 30 days' notice, and change the number of user licences month to month.",
  },
  {
    title: "No setup fees",
    body: "Nothing to pay to get started, and our team will import your existing data at no extra cost.",
  },
];

export default function PricingPage() {
  const hasPrice = PRICING.baseMonthly !== null;

  return (
    <main>
      <PageHero
        label="Pricing"
        title={
          <>
            One package. <span className="text-db-red">All the essentials.</span>
          </>
        }
        lede="A simple CRM at a reasonable all-in-one price — designed to be understood in a minute, not decoded from a comparison table."
      />

      {/* ---- the offer, asymmetric: reasoning left, the card right ---- */}
      <section className="db-section db-section--airy bg-page">
        <div className="db-shell">
          <div className="grid items-start gap-[clamp(32px,4vw,76px)] lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeading
                display
                label="How we price"
                title={
                  <>
                    Pricing you can explain to your team in <span className="text-db-red">one sentence</span>
                  </>
                }
                lede="Most CRM companies added complexity and raised the price. We went the other way — one subscription, everything in it."
              />

              <div className="mt-[clamp(30px,3.2vw,52px)] grid gap-[clamp(22px,2.4vw,38px)] sm:grid-cols-2">
                {PHILOSOPHY.map((p, i) => (
                  <Reveal key={p.title} delay={i * 80}>
                    <h3 className="font-body text-ink m-0 flex items-center gap-2.5 text-[clamp(15.5px,1.05vw,17.5px)] font-bold">
                      <Icon name="check" className="text-green h-[18px] w-[18px] shrink-0" />
                      {p.title}
                    </h3>
                    <p className="text-ink-2 mt-2 text-[clamp(14px,0.88vw,15.8px)] leading-[1.62]">
                      {p.body}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={90}>
              <div className="db-card-flat relative overflow-hidden p-[clamp(22px,2.4vw,38px)]">
                <span aria-hidden="true" className="bg-db-red absolute inset-x-0 top-0 h-1.5" />
                <p className="font-ui text-brand mt-2 mb-3 text-[12px] font-semibold tracking-[.14em] uppercase">
                  The all-in-one package
                </p>

                {hasPrice ? (
                  <>
                    <p className="text-ink-2 m-0 text-[14px]">Pricing starts at</p>
                    <p className="font-display text-ink m-0 text-[clamp(36px,3.4vw,56px)] leading-none tracking-[.01em]">
                      {PRICING.currencySymbol}
                      {PRICING.baseMonthly}
                      <span className="text-ink-2 text-[16px] font-normal"> / month</span>
                    </p>
                  </>
                ) : (
                  <p className="font-display text-ink m-0 text-[clamp(23px,2.1vw,34px)] leading-[1.05] tracking-[.01em] text-balance">
                    Contact us for current pricing
                  </p>
                )}

                <dl className="border-line mt-6 grid gap-0 border-t">
                  {[
                    ["Included users", `Up to ${PRICING.includedUsers}`],
                    [
                      "Additional users",
                      PRICING.additionalUserMonthly === null
                        ? "Per licence, per month"
                        : `${PRICING.currencySymbol}${PRICING.additionalUserMonthly} / month`,
                    ],
                    ["Billing", "Monthly"],
                    ["Cancellation", "30 days' notice"],
                    ["Setup fee", "None"],
                    ["Free trial", "7 days"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="border-line flex items-baseline justify-between gap-4 border-b py-3 last:border-b-0"
                    >
                      <dt className="text-ink-2 text-[14.5px]">{k}</dt>
                      <dd className="text-ink m-0 text-right text-[14.5px] font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7">
                  <CtaButton className="w-full text-center text-[clamp(16px,1.15vw,19px)]">
                    Start 7-Day Free Trial
                  </CtaButton>
                  <p className="text-ink-3 mt-3 text-center text-[13px]">
                    No card required to start.{" "}
                    <SmartLink href="/contact" className="text-brand font-semibold">
                      Talk to us first
                    </SmartLink>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- everything included, grouped by capability ---- */}
      <section className="bg-page pt-[clamp(56px,6vw,108px)] pb-[clamp(56px,6vw,108px)]">
        <div className="db-shell">
          <SectionHeading
            display
            label="What's included"
            align="center"
            title={
              <>
                Every capability, in the <span className="text-db-red">one</span> package
              </>
            }
            lede="Twenty-one features, grouped the way a sales floor actually uses them."
            className="mb-[clamp(34px,3.8vw,64px)]"
          />

          <div className="grid gap-[clamp(18px,1.9vw,30px)] md:grid-cols-2 xl:grid-cols-3">
            {FEATURE_GROUPS.map((group, i) => (
              <Reveal key={group.title} delay={i * 70}>
                <FeatureGroup group={group} />
              </Reveal>
            ))}
            {/* fills the grid and gives the section somewhere to go */}
            <Reveal delay={FEATURE_GROUPS.length * 70}>
              <div className="bg-navy flex h-full flex-col justify-center rounded-[14px] p-[clamp(18px,1.8vw,28px)] text-white">
                <h3 className="font-display m-0 text-[clamp(18px,1.4vw,24px)] leading-none tracking-[.01em]">
                  Not sure which of these you need?
                </h3>
                <p className="mt-2.5 text-[clamp(14px,0.88vw,15.5px)] leading-[1.6] text-white/70">
                  Tell us how your team sells and we will show you the parts that matter. Everything
                  listed here is in the one package either way.
                </p>
                <SmartLink
                  href="/contact"
                  className="text-db-cyan mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold"
                >
                  Talk to a person
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </SmartLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- usage charges, said plainly ---- */}
      <section className="bg-page pb-[clamp(64px,7vw,124px)]">
        <div className="db-shell">
          <Reveal>
            <div className="bg-navy rounded-[18px] p-[clamp(24px,3vw,48px)] text-white">
              <div className="max-w-[52ch]">
                <h2 className="font-display m-0 text-[clamp(21px,1.95vw,32px)] leading-none tracking-[.01em]">
                  What is billed separately
                </h2>
                <p className="mt-3.5 max-w-[38ch] text-[clamp(14.5px,0.92vw,16.5px)] leading-[1.62] text-white/70">
                  A few third-party services are consumables rather than features, so they are
                  invoiced monthly alongside the subscription.
                </p>
              </div>
              <div className="mt-[clamp(28px,2.8vw,44px)] grid gap-[clamp(16px,1.6vw,24px)] sm:grid-cols-3">
                {USAGE_CHARGES.map((c) => (
                  <div key={c.title} className="rounded-[12px] border border-white/10 bg-white/[0.04] p-4">
                    <h3 className="font-body m-0 text-[15px] leading-snug font-bold text-white">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-[1.6] text-white/60">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-[clamp(30px,3vw,48px)] text-center">
            <p className="text-ink-2 m-0 text-[clamp(14.5px,0.9vw,16px)]">
              Still deciding?{" "}
              <SmartLink href="/faq" className="text-brand font-semibold underline underline-offset-4">
                Read the FAQ
              </SmartLink>{" "}
              or{" "}
              <SmartLink href="/contact" className="text-brand font-semibold underline underline-offset-4">
                ask us directly
              </SmartLink>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand id="trial" showTrialLength />
    </main>
  );
}
