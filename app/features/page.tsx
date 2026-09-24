import type { Metadata } from "next";
import Image from "next/image";
import { pageMeta } from "@/lib/seo";
import Reveal from "@/components/animations/Reveal";
import HeroAtmosphere from "@/components/ui/HeroAtmosphere";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaButton from "@/components/ui/CtaButton";
import SmartLink from "@/components/ui/SmartLink";
import FeatureGroup from "@/components/ui/FeatureGroup";
import { Icon } from "@/components/ui/Icon";
import CtaBand from "@/components/sections/CtaBand";
import { WaveDivider } from "@/components/sections/HeroArt";
import Window, { Detail } from "@/components/features/Window";
import FeaturesMotion from "@/components/features/FeaturesMotion";
import HeroVisual from "@/components/features/HeroVisual";
import { VARIANT } from "@/lib/variants";
import ExportMark from "@/components/features/ExportMark";
import { FEATURE_GROUPS } from "@/lib/features";
import {
  FX_DATABASE,
  FX_HERO,
  FX_LEAD,
  FX_OWNERSHIP,
  FX_PRODUCTIVITY,
  FX_SECTIONS,
  FX_TEAM,
  FX_VIDEO,
  type FeaturePoint,
} from "@/lib/features-page";

export const metadata: Metadata = {
  title: "Features",
  description:
    "A customizable sales database, click-to-dial lead screen, productivity tracking, team management and Zoom invites — sales software designed by salespeople.",
  alternates: { canonical: "/features" },
  ...pageMeta({
    title: "Features — DatabaseBuilder CRM",
    description:
      "See the DatabaseBuilder CRM: customizable database, lead screen, productivity tracking, team management and video meetings.",
    path: "/features",
  }),
};

const APP = "app.databasebuilder.com";
const FEATURE_COUNT = FEATURE_GROUPS.reduce((n, g) => n + g.items.length, 0);

/** Icon, title and a line of detail — the page's one list pattern. */
function Points({
  points,
  tone = "light",
  className = "",
}: {
  points: FeaturePoint[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={`db-fx-points db-fx-points--${tone} ${className}`}>
      {points.map((p) => (
        <li key={p.title} className="db-fx-point">
          <span className="db-fx-point__icon">
            <Icon name={p.icon} />
          </span>
          <span>
            <strong className="db-fx-point__title">{p.title}</strong>
            <span className="db-fx-point__body">{p.body}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function FeaturesPage() {
  /* staging shows the Best Choice three-monitor picture; the default is the
     interactive product screens (lib/variants.ts) */
  const render = VARIANT.featuresHero === "render";
  const jump = (
    <nav className="db-fx-jump" aria-label="On this page">
      {FX_SECTIONS.map((s) => (
        <a key={s.id} href={`#${s.id}`}>
          {s.label}
        </a>
      ))}
    </nav>
  );

  return (
    <main>
      <FeaturesMotion />

      {/* ---- hero: the Best Choice award up top, per Adam's outline ------ */}
      <section
        id="top"
        tabIndex={-1}
        className={`db-page-band db-under-header db-fx-hero ${render ? "db-fx-hero--render" : ""}`}
      >
        <HeroAtmosphere />
        <div className="db-shell relative z-[2] flex flex-col items-center pt-[clamp(40px,5vw,76px)] text-center">
          <Reveal>
            <p className="db-eyebrow-rule mb-5">
              <span aria-hidden="true" />
              {FX_HERO.label}
              <span aria-hidden="true" />
            </p>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="font-display m-0 max-w-[24ch] text-[clamp(36px,4.6vw,74px)] leading-[1.02] tracking-[.02em] text-balance text-white">
              Sales Software <span className="text-db-red">designed</span> by salespeople
            </h1>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-5 max-w-[72ch] text-[clamp(15px,1vw,18px)] leading-[1.62] text-white/75">
              {FX_HERO.lede}
            </p>
          </Reveal>
          <Reveal delay={190}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
              <CtaButton className="text-[clamp(16px,1.25vw,20px)]">Start 7-Day Free Trial</CtaButton>
              <SmartLink
                href="/pricing"
                className="font-semibold text-white underline decoration-white/35 underline-offset-[6px] transition-colors hover:decoration-white"
              >
                See pricing
              </SmartLink>
            </div>
          </Reveal>
        </div>

        {!render && (
          <>
            {/* one main screen with two behind it, straight on the dark band */}
            <div className="db-shell relative z-[2]">
              <div className="db-fx-stage">
                <HeroVisual />
              </div>
            </div>
            <WaveDivider />
          </>
        )}
      </section>

      {render ? (
        /* the picture on a light stage that overlaps the foot of the band */
        <div className="db-fx-stage-band">
          <div className="db-shell">
            <div className="db-fx-render" data-fx="render">
              <Image
                src="/features/best-choice.jpg"
                alt="DatabaseBuilder on three screens: a lead map, the Top Pick Best Choice Sales Software award, and the Company-DB lead grid."
                width={1132}
                height={392}
                priority
                sizes="(min-width: 1240px) 1132px, 92vw"
              />
            </div>
            {jump}
          </div>
        </div>
      ) : (
        /* flow-root: the links' top margin would otherwise escape this block
           and show the page's black body between the wave and the links */
        <div className="bg-page flow-root">
          <div className="db-shell">{jump}</div>
        </div>
      )}

      {/* ---- customizable database ------------------------------------- */}
      <section id="database" className="db-section db-fx-compact bg-page">
        <div className="db-shell">
          <SectionHeading
            label={FX_DATABASE.label}
            align="center"
            display
            title={
              <>
                Your database, <span className="text-db-red">the way you want to see it</span>
              </>
            }
            lede={FX_DATABASE.lede}
          />
          <div className="db-fx-db" data-fx="shot">
            <Window
              src="/features/company-db.png"
              alt="The Company-DB grid: 17,405 records with tabs such as 1-Training Leads, 2-Orphan Acc, Cannabis and Chicago, filter boxes on every column, and columns for last called, last purchased, last called by, total spent, total orders and rating."
              width={1920}
              height={958}
              url={APP}
              sizes="(min-width: 1180px) 1120px, 94vw"
            />
            <div className="db-fx-db__details">
              <Detail
                className="db-fx-db__tabs"
                src="/features/cdb-tabs.png"
                alt="Tabs: 1-Training Leads, 1-Verified Calls, 2-Orphan Acc"
                width={434}
                height={36}
                label="Your tabs"
              />
              <Detail
                className="db-fx-db__filters"
                src="/features/cdb-filters.png"
                alt="View selector, category filter and contact search"
                width={568}
                height={44}
                label="Views, filters, search"
              />
              <Detail
                className="db-fx-db__cols"
                src="/features/cdb-columns.png"
                alt="Columns for last called by, total spent, total orders and rating"
                width={488}
                height={232}
                label="Your columns"
              />
            </div>
          </div>
          <Points points={FX_DATABASE.points} className="db-fx-points--3 mt-[clamp(24px,2.4vw,36px)]" />
        </div>
      </section>

      {/* ---- lead screen ------------------------------------------------ */}
      <section id="lead-screen" className="db-section db-fx-follow bg-white">
        <div className="db-shell db-fx-split">
          <div>
            <SectionHeading
              label={FX_LEAD.label}
              display
              title={
                <>
                  Dial, record and research <span className="text-db-red">from one screen</span>
                </>
              }
              lede={FX_LEAD.lede}
            />
            <Points points={FX_LEAD.points} className="mt-8" />
          </div>
          <div data-fx="shot">
            <Window
              src="/dashboard.webp"
              alt="The lead screen: a dialer with click-to-dial and call recording on the left, the business lead record in the middle, and talking points with local time, weather and one-click research on the right."
              width={1550}
              height={823}
              url={APP}
              sizes="(min-width: 1024px) 58vw, 94vw"
            />
          </div>
        </div>
      </section>

      {/* ---- productivity tracking (dark) ------------------------------- */}
      <section id="productivity" className="db-section db-page-band">
        <div className="db-shell db-fx-split db-fx-split--flip">
          <div>
            <SectionHeading
              tone="dark"
              label={FX_PRODUCTIVITY.label}
              display
              title={
                <>
                  See every rep&apos;s <span className="text-db-red">calls, emails and sales</span>
                </>
              }
              lede={FX_PRODUCTIVITY.lede}
            />
            <Points points={FX_PRODUCTIVITY.points} tone="dark" className="mt-8" />
          </div>
          <div className="db-fx-prod" data-fx="shot">
            <Window
              tone="dark"
              src="/features/productivity.png"
              alt="Team production grid for week 32 of 2025: calls, email count, amount and orders for each rep, with year, week and date range filters."
              width={700}
              height={741}
              sizes="(min-width: 1024px) 560px, 92vw"
            />
            <div className="db-fx-float db-fx-prod__stat" data-fx="float">
              <div className="db-fx-stat" data-fx="detail">
                <span className="db-fx-stat__icon">
                  <Icon name="phone" />
                </span>
                <span>
                  <span className="db-fx-stat__num">1,044</span>
                  <span className="db-fx-stat__label">calls from the week&apos;s top rep</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- team user & account management ----------------------------- */}
      <section id="team" className="db-section bg-page">
        <div className="db-shell">
          <SectionHeading
            label={FX_TEAM.label}
            align="center"
            display
            title={
              <>
                Run the whole team <span className="text-db-red">from one place</span>
              </>
            }
            lede={FX_TEAM.lede}
          />
          <div className="db-fx-team" data-fx="shot">
            <Window
              src="/features/manage-users.png"
              alt="Manage Users: Invite People, Email Users and Refresh buttons, company credits and dialer minutes, tabs for Manage Users, Call Monitoring and Leads Pool, a user list with photos, tabs, leads and status, and a leads pool grid."
              width={1407}
              height={971}
              url={APP}
              className="db-fx-team__main"
              sizes="(min-width: 1180px) 900px, 94vw"
            />
            <div className="db-fx-float db-fx-team__credits" data-fx="float">
              <Detail
                src="/features/mu-credits.png"
                alt="Company Credits: 15,416. Company Dialer Minutes: 53,799."
                width={718}
                height={44}
                label="Always on show"
              />
            </div>
            <div className="db-fx-float db-fx-team__tabs" data-fx="float">
              <Detail
                src="/features/ut-tabs.png"
                alt="A rep's row expanded to show their tabs and total records, with move and delete controls."
                width={518}
                height={214}
                label="Each rep's tabs"
              />
            </div>
          </div>
          <Points points={FX_TEAM.points} className="db-fx-points--4 mt-[clamp(48px,5vw,84px)]" />
        </div>
      </section>

      {/* ---- integrated video conferencing (dark) ----------------------- */}
      <section id="video" className="db-section db-page-band">
        <div className="db-shell db-fx-split">
          <div>
            <SectionHeading
              tone="dark"
              label={FX_VIDEO.label}
              display
              title={
                <>
                  Zoom invites, <span className="text-db-red">straight from the lead</span>
                </>
              }
              lede={FX_VIDEO.lede}
            />
            <Points points={FX_VIDEO.points} tone="dark" className="mt-8" />
          </div>
          <div className="db-fx-video" data-fx="shot">
            <Window
              tone="dark"
              src="/features/zoom-invite.jpg"
              alt="Scheduling a meeting from the lead screen: the Meeting form with Include Zoom ticked, and the join link, meeting ID and dial-in numbers filled in."
              width={509}
              height={318}
              className="db-fx-video__invite"
            />
            <figure className="db-win db-fx-photo db-fx-video__call">
              <Image
                src="/features/zoom-call.jpg"
                alt="The Zoom call the invite opens: a client waving hello, with the team in the gallery strip above."
                width={509}
                height={318}
                unoptimized
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ---- your data (moved here from /about) ------------------------- */}
      <section id="your-data" className="db-section bg-white">
        <div className="db-shell db-fx-split">
          <div>
            <SectionHeading
              label="Data ownership"
              display
              title={
                <>
                  Your data is never <span className="text-db-red">held hostage</span>
                </>
              }
              lede={FX_OWNERSHIP.body}
            />
            <ul className="db-fx-keys">
              {FX_OWNERSHIP.points.map((p) => (
                <li key={p.text}>
                  <span className="db-fx-keys__icon">
                    <Icon name={p.icon} />
                  </span>
                  {p.text}
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="db-fx-own-art">
            <ExportMark className="db-fx-own-art__mark" />
          </Reveal>
        </div>
      </section>

      {/* ---- everything included ---------------------------------------- */}
      <section id="included" className="db-section bg-page">
        <div className="db-shell">
          <SectionHeading
            label="All-in-one"
            align="center"
            display
            title={
              <>
                Everything your team needs, <span className="text-db-red">in one CRM</span>
              </>
            }
            /* not "all included": custom API work, dialer minutes and SMS are
               billed separately, as the homepage comparison says */
            lede={`${FEATURE_COUNT} features, grouped by what they're for. Usage such as dialer minutes, SMS and custom API work is billed separately.`}
          />
          <div className="db-fx-groups mt-[clamp(32px,3.4vw,52px)] grid gap-[clamp(14px,1.4vw,22px)] md:grid-cols-2">
            {FEATURE_GROUPS.map((g, i) => (
              <Reveal key={g.title} delay={i * 60} className="h-full">
                <FeatureGroup group={g} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px]">
            <SmartLink href="/pricing" className="text-brand font-semibold underline underline-offset-4">
              See pricing
            </SmartLink>
            <SmartLink href="/#features" className="text-ink-2 hover:text-brand font-semibold underline underline-offset-4 transition-colors">
              Compare with other CRMs
            </SmartLink>
          </div>
        </div>
      </section>

      <CtaBand id="trial" showTrialLength />
    </main>
  );
}
