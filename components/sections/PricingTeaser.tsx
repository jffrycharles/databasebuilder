import Reveal from "@/components/animations/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import SmartLink from "@/components/ui/SmartLink";
import { Icon } from "@/components/ui/Icon";
import { PRICING, PLAN_INCLUDES } from "@/lib/pricing";

/* Prices are still TBA in the outline, so this section sells the shape of the
   pricing — one plan, everything in it — and sends people to /pricing for the
   detail rather than inventing a number. */
export default function PricingTeaser() {
  const hasPrice = PRICING.baseMonthly !== null;

  return (
    <section id="pricing" data-surface="page" className="bg-page db-section">
      <div className="db-shell">
        <Reveal className="mx-auto mb-[clamp(28px,3vw,48px)] max-w-[660px] text-center">
          <h2 className="db-h2 text-ink">
            One plan. <span className="text-db-red">Everything in it.</span>
          </h2>
          <p className="db-lede text-ink-2 mt-4">
            No tiers, no à la carte, no paying extra for the features that make the difference. Our
            all-in-one price keeps the product easy to understand.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-[var(--db-gap)] lg:grid-cols-[1.05fr_0.95fr]">
          {/* the offer */}
          <Reveal>
            <div className="db-card relative flex h-full flex-col overflow-hidden p-[clamp(22px,2.4vw,38px)]">
              <span aria-hidden="true" className="bg-db-red absolute inset-x-0 top-0 h-1.5" />
              <p className="db-kicker text-brand mt-2">All-in-one pricing</p>

              {hasPrice ? (
                <p className="mt-4 flex flex-wrap items-baseline gap-x-3">
                  <span className="font-body text-ink text-[clamp(42px,4.4vw,64px)] leading-none font-bold tracking-[-.02em]">
                    {PRICING.currencySymbol}
                    {PRICING.baseMonthly}
                  </span>
                  <span className="db-body text-ink-2">per month</span>
                </p>
              ) : (
                <p className="db-h2 text-ink mt-4 max-w-[16ch]">
                  Straightforward monthly pricing.
                </p>
              )}

              <p className="db-body text-ink-2 mt-4 max-w-[46ch]">
                Includes up to {PRICING.includedUsers} users, with additional user licences
                available. Change the number of licences month to month, and cancel with 30 days&apos;
                notice.
              </p>

              <ul className="db-rows mt-7 grid list-none p-0">
                {PLAN_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-2.5 first:pt-0">
                    <Icon name="check" className="text-green mt-0.5 h-[18px] w-[18px] shrink-0" />
                    <span className="db-sm text-ink">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
                <CtaButton>Start 7-Day Free Trial</CtaButton>
                <SmartLink href="/pricing" className="db-link db-sm">
                  See full pricing
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M5 12h13M13 6l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </SmartLink>
              </div>
            </div>
          </Reveal>

          {/* what sits outside the subscription, said plainly */}
          <Reveal delay={110}>
            <div className="db-panel flex h-full flex-col p-[clamp(22px,2.4vw,38px)]">
              <h3 className="db-h3 max-w-[20ch]">What you will never be charged for</h3>
              <ul className="db-rows--on-dark mt-6 grid list-none p-0">
                {[
                  "Setup fees — there are none",
                  "Advanced features held behind a higher tier",
                  "Support, when you need a person",
                  "Getting your own data back out",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3 first:pt-0">
                    <Icon name="check" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#8fb6ff]" />
                    <span className="db-sm text-white/85">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="db-sm mt-7 max-w-[44ch] text-white/60">
                A few third-party services are billed separately — dialer minutes, SMS usage and any
                extra phone numbers. Buy them in bulk or pay as you go.
              </p>

              <SmartLink href="/pricing#usage" className="db-link db-link--on-dark db-sm mt-auto pt-7">
                How usage billing works
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M5 12h13M13 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SmartLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
