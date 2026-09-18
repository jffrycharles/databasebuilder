import type { IconName } from "@/components/ui/Icon";

export const SITE = {
  name: "DatabaseBuilder",
  tagline: "Sales Solution",
  title: "DatabaseBuilder — A Simple Alternative to Your Overpriced CRM",
  description:
    "Sales software designed by salespeople. Advanced features, call recording, email and two-way SMS, and live human support. Start a 7-day free trial.",
  /* Staging and the live site are the same code on two hostnames. Everything
     canonical hangs off this — metadataBase, the sitemap, robots — so it has
     to follow the host it is actually served from, or staging publishes
     canonicals pointing at production and sitemaps nobody can verify. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.databasebuilder.com",
  register:
    "https://app.databasebuilder.com:446/Account/Register?id=9edcb5d7-b24a-44cc-80be-58cb47a7a2fc",
  login: "https://app.databasebuilder.com:446/Account/Login",
} as const;

export type NavLink = {
  label: string;
  href: string;
  /** a submenu opens from this item instead of it being a plain link */
  children?: { label: string; href: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Our Team", href: "/about#leadership" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

/* ---- hero -------------------------------------------------------------- */
export type HeroCard = {
  title: string;
  description: string;
  art: "checklist" | "dialer" | "messaging" | "support";
  /** the one card that carries the brand red instead of the default blue */
  tone?: "red";
};

export const HERO_CARDS: HeroCard[] = [
  { title: "All-In-One Pricing", description: "INCLUDED", art: "checklist" },
  { title: "Advanced Features", description: "INCLUDED", art: "messaging" },
  { title: "Click to Dial w/Call Recording", description: "INCLUDED", art: "dialer" },
  { title: "Live Support", description: "INCLUDED", art: "support", tone: "red" },
];

/* ---- why --------------------------------------------------------------- */
export const WHY_PARAGRAPHS = [
  "A productive CRM does not need to cost a fortune to be effective. DatabaseBuilder.com is an easy-to-use CRM system, offered at a reasonable price, and designed for salespeople by salespeople.",
  'Our "all-in-one" pricing makes our product easy to understand without all the complicated features that the average person is unlikely to use.',
  "We provide all the features you want to see, not features a software developer wants you to use.",
  "Give DatabaseBuilder.com a try and start a free trial today.",
];

/* ---- built for salespeople --------------------------------------------- */
export const PILLARS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "api",
    title: "Simple to use",
    body: "Intuitive design means your team can get up and running fast.",
  },
  {
    icon: "tag",
    title: "Affordable pricing",
    body: "Powerful CRM features at a price that makes sense.",
  },
  {
    icon: "gear",
    title: "Designed by salespeople",
    body: "Everything we build is based on real-world sales experience.",
  },
];

/* ---- product mock: shared sidebar --------------------------------------- */
export type NavItem = { icon: IconName; label: string };

export const APP_SIDEBAR: NavItem[] = [
  { icon: "grid", label: "Dashboard" },
  { icon: "bolt", label: "Leads" },
  { icon: "user", label: "Contacts" },
  { icon: "api", label: "Companies" },
  { icon: "chart", label: "Pipeline" },
  { icon: "check", label: "Tasks" },
  { icon: "cal", label: "Calendar" },
  { icon: "phone", label: "Calls" },
  { icon: "chat", label: "Messages" },
  { icon: "monitor", label: "Reports" },
  { icon: "gear", label: "Settings" },
];

/* ---- product mock: dashboard -------------------------------------------- */
export type Kpi = { label: string; value: number; delta: string };

export const KPIS: Kpi[] = [
  { label: "New Leads", value: 128, delta: "↑ 18%" },
  { label: "Calls Made", value: 342, delta: "↑ 22%" },
  { label: "Conversations", value: 176, delta: "↑ 15%" },
  { label: "Won Deals", value: 27, delta: "↑ 12%" },
];

export type PipelineStage = { label: string; value: number; tint: string; width: string };

export const PIPELINE: PipelineStage[] = [
  { label: "New", value: 128, tint: "#1d6fe8", width: "8.727em" },
  { label: "Contacted", value: 86, tint: "#22a7e0", width: "7.091em" },
  { label: "Qualified", value: 53, tint: "#2bc7c7", width: "5.273em" },
  { label: "Proposal", value: 34, tint: "#f59e0b", width: "3.455em" },
  { label: "Won", value: 27, tint: "#e23324", width: "1.818em" },
];

export type Activity = { icon: IconName; title: string; time: string };

export const ACTIVITY: Activity[] = [
  { icon: "phone", title: "Call with Alex Johnson", time: "Today, 10:30 AM" },
  { icon: "mail", title: "Email to Sarah Miller", time: "Today, 9:15 AM" },
  { icon: "chat", title: "SMS to Mark Davis", time: "Today, 8:45 AM" },
  { icon: "rec", title: "Call recording saved", time: "Yesterday, 4:30 PM" },
  { icon: "user", title: "Lead created: Acme Co.", time: "Yesterday, 2:11 PM" },
];

/* ---- footer ------------------------------------------------------------- */
export const FOOTER_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/#features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "History", href: "/about#history" },
      { label: "Support", href: "/contact" },
    ],
  },
];

/* X and YouTube used to sit here pointing at "#top", so clicking either just
   scrolled you back up the page instead of opening a profile. Both are gone.
   The footer skips any entry with an empty href, so adding a network later is
   a one-line change — the `ig` glyph is already in the icon sprite. */
export const SOCIALS: { icon: IconName; label: string; href: string }[] = [
  { icon: "li", label: "LinkedIn", href: "https://www.linkedin.com/company/databasebuilder-com" },
  { icon: "fb", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61554575739247" },
];
