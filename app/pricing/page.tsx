import type { Metadata } from "next";
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
  openGraph: {
    title: "Pricing — DatabaseBuilder",
    description: "Simple, all-in-one CRM pricing. See what is included and how usage charges work.",
    url: "/pricing",
    type: "website",
  },
};

/* Four promises, said as sentences. The product's argument is that there is
   nothing to decode, so the page must not ask anyone to decode a grid. */
const PROMISES = [
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

  const TERMS: [string, string][] = [
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
  ];

  return (
    <main id="main">
      <PageHero
        label="Pricing"
        title={
          <>
            One package. <span className="text-db-red-hot">All the essentials.</span>
          </>
        }
        lede="A simple CRM at a reasonable all-in-one price — designed to be understood in a minute, not decoded from a comparison table."
      />

      {/* ---- the offer: the reasoning on the left, the terms on the right ---- */}
      <section data-surface="page" className="db-section bg-page">
        <div className="db-shell">
          <div className="grid items-start gap-[var(--db-gap-lg)] lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                label="How we price"
                title={
                  <>
                    Pricing you can explain to your team in{" "}
                    <span className="text-db-red">one sentence</span>
                  </>
                }
                lede="Most CRM companies added complexity and raised the price. We went the other way — one subscription, everything in it."
              />

              <div className="db-rows mt-[clamp(24px,2.6vw,40px)] grid max-w-[56ch]">
                {PROMISES.map((p, i) => (
                  <Reveal key={p.title} delay={i * 70} className="py-4 first:pt-0 last:pb-0">
                    <h3 className="db-h4 text-ink flex items-center gap-2.5">
                      <Icon name="check" className="text-green h-[18px] w-[18px] shrink-0" />
                      {p.title}
                    </h3>
                    <p className="db-sm text-ink-2 mt-1.5 pl-[28px]">{p.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={90} className="lg:sticky lg:top-[calc(var(--db-header-h)+28px)]">
              <div className="db-card relative overflow-hidden p-[clamp(22px,2.4vw,38px)]">
                <span aria-hidden="true" className="bg-db-red absolute inset-x-0 top-0 h-1.5" />
                <p className="db-kicker text-brand mt-2 mb-4">The all-in-one package</p>

                {hasPrice ? (
                  <>
                    <p className="db-sm text-ink-2">Pricing starts at</p>
                    <p className="font-body text-ink m-0 text-[clamp(38px,3.4vw,54px)] leading-none font-bold tracking-[-.02em]">
                      {PRICING.currencySymbol}
                      {PRICING.baseMonthly}
                      <span className="text-ink-2 text-[17px] font-normal"> / month</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="db-h2 text-ink">One price, every feature.</p>
                    <p className="db-sm text-ink-2 mt-3 max-w-[36ch]">
                      Up to {PRICING.includedUsers} users included. Talk to us for the current
                      monthly figure — there is only ever one.
                    </p>
                  </>
                )}

                <dl className="db-rows border-line mt-7 grid border-t pt-1">
                  {TERMS.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="db-sm text-ink-2">{k}</dt>
                      <dd className="db-sm text-ink m-0 text-right font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7">
                  <CtaButton block>Start 7-Day Free Trial</CtaButton>
                  <p className="db-xs text-ink-3 mt-3.5 text-center">
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

      {/* ---- everything included, as a table of capabilities ---- */}
      <section id="included" data-surface="page" className="db-section bg-page">
        <div className="db-shell">
          <SectionHeading
            label="What's included"
            title={
              <>
                Every capability, in the <span className="text-db-red">one</span> package
              </>
            }
            lede="Twenty-one features, grouped the way a sales floor actually uses them. Nothing on this list is an upgrade."
            className="mb-[clamp(20px,2.2vw,34px)]"
          />

          <div className="db-rows border-line grid border-t">
            {FEATURE_GROUPS.map((group, i) => (
              <Reveal key={group.title} delay={i * 60}>
                <FeatureGroup group={group} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- usage charges, said plainly ---- */}
      <section id="usage" data-surface="page" className="db-section bg-page">
        <div className="db-shell">
          <div className="grid gap-[var(--db-gap-lg)] lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              label="Billed separately"
              title={
                <>
                  What sits <span className="text-db-red">outside</span> the subscription
                </>
              }
              lede="A few third-party services are consumables rather than features, so they are invoiced monthly alongside the subscription."
            />

            <Reveal delay={80}>
              <dl className="db-rows border-line m-0 grid border-t">
                {USAGE_CHARGES.map((c) => (
                  <div
                    key={c.title}
                    className="grid gap-x-8 gap-y-1.5 py-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
                  >
                    <dt className="db-h4 text-ink">{c.title}</dt>
                    <dd className="db-sm text-ink-2 m-0">{c.body}</dd>
                  </div>
                ))}
              </dl>

              <p className="db-sm text-ink-2 mt-7">
                Still deciding?{" "}
                <SmartLink href="/faq" className="text-brand font-semibold underline underline-offset-4">
                  Read the FAQ
                </SmartLink>{" "}
                or{" "}
                <SmartLink
                  href="/contact"
                  className="text-brand font-semibold underline underline-offset-4"
                >
                  ask us directly
                </SmartLink>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand id="trial" showTrialLength />
    </main>
  );
}
