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

/* ---- Adam's "DatabaseBuilder vs Other CRMs" comparison chart -------------
   Transcribed from the client's own artwork. The five blocks are his, and so
   is their order: what everybody has, what the others bill as an add-on, the
   training and team block, what the others simply do not do, and the handful
   of things that are metered on both sides.

   One word is changed: his chart reads "Wisper Coaching". It is "Whisper"
   here — a typo is not data, and this table is going on the homepage. */
export type CompareMark = "yes" | "no" | "addon" | "extra";
export type CompareRow = { label: string; db: CompareMark; other: CompareMark; featured?: boolean };

export const COMPARISON_LEDE =
  "More advanced features included at no additional charge compared to most other CRM companies.";

export const COMPARISON_GROUPS: CompareRow[][] = [
  [
    { label: "Click to Dial Calling", db: "yes", other: "yes" },
    { label: "Customizable Data Fields & Dashboard", db: "yes", other: "yes" },
    { label: "Sales Pipeline Management", db: "yes", other: "yes" },
    { label: "Call History & Activity Tracking", db: "yes", other: "yes" },
    { label: "Workflow Management", db: "yes", other: "yes" },
    { label: "Built-in Email, Templates, & Account Sync", db: "yes", other: "yes" },
    { label: "Data Import Module", db: "yes", other: "yes" },
    { label: "Scalable as Needed", db: "yes", other: "yes" },
    { label: "Safe & Secure Platform", db: "yes", other: "yes" },
    { label: "User Permissions Levels", db: "yes", other: "yes" },
    { label: "Calendar & Lead Management", db: "yes", other: "yes" },
  ],
  [
    { label: "Automatic Call Recording", db: "yes", other: "addon" },
    { label: "Auto Voicemail Library", db: "yes", other: "addon" },
    { label: "Built-in SMS Text Campaigns", db: "yes", other: "addon" },
    { label: "Local Presence", db: "yes", other: "addon" },
    { label: "Integrated Video Conferencing", db: "yes", other: "addon" },
    { label: "Data Export Module", db: "yes", other: "addon" },
  ],
  [
    { label: "Sales & Admin Training", db: "yes", other: "addon", featured: true },
    { label: "Team Account & Lead Management", db: "yes", other: "addon" },
    { label: "Company Data Share", db: "yes", other: "addon" },
    { label: "Team Performance Tracking & Monitoring", db: "yes", other: "addon" },
    { label: "Call Monitoring", db: "yes", other: "addon" },
    { label: "Whisper Coaching", db: "yes", other: "addon" },
    { label: "Live Call Transfer w/ Popup Notification", db: "yes", other: "addon" },
    { label: "Customer Profile Popup on Transfer", db: "yes", other: "addon" },
  ],
  [
    { label: "All-in-One Pricing", db: "yes", other: "no" },
    { label: "Talking Points", db: "yes", other: "no" },
    { label: "Integrated Google and Social Media Search", db: "yes", other: "no" },
    { label: "Live Customer Support", db: "yes", other: "no" },
    { label: "No Long-Term Contract", db: "yes", other: "no" },
    { label: "30-Day Cancellation", db: "yes", other: "no" },
    { label: "Not Overly Complicated", db: "yes", other: "no" },
    { label: "Affordable Pricing", db: "yes", other: "no" },
  ],
  [
    { label: "Custom API Integration", db: "extra", other: "extra" },
    { label: "Dialer Minutes & SMS Messages", db: "extra", other: "extra" },
    { label: "Additional Phone Numbers", db: "extra", other: "extra" },
    { label: "Data Cloud Storage", db: "extra", other: "extra" },
    { label: "Additional User Licenses", db: "extra", other: "extra" },
  ],
];

export type ValueCard = {
  icon: IconName;
  title: string;
  body: string;
  tint: string;
  formats?: { label: string; tint: string }[];
};

export const VALUE_CARDS: ValueCard[] = [
  {
    icon: "upload",
    title: "Import & export",
    body: "Move your data in and out whenever you need it.",
    tint: "#14b8a6",
    formats: [
      { label: "CSV", tint: "#16a34a" },
    ],
  },
  {
    icon: "headset",
    title: "Coach every call in real time.",
    body: "Whisper coaching, live monitoring, and agent alerts help your team perform at their best.",
    tint: "#12233f",
  },
  {
    icon: "chart",
    title: "See what matters. Close more.",
    body: "Custom KPI dashboards and real-time insights keep your team focused and productive.",
    tint: "#1d6fe8",
  },
  {
    icon: "user",
    title: "Real human support when you need it.",
    body: "Talk to a real person who understands your business and is here to help.",
    tint: "#e23324",
  },
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
