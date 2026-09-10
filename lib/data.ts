import type { IconName } from "@/components/ui/Icon";

export const SITE = {
  name: "DatabaseBuilder",
  tagline: "Sales Solution",
  title: "DatabaseBuilder — A Simple Alternative to Your Overpriced CRM",
  description:
    "Sales software designed by salespeople. Advanced features, call recording, email and two-way SMS, and live human support. Start a 7-day free trial.",
  url: "https://www.databasebuilder.com",
  register:
    "https://app.databasebuilder.com:446/Account/Register?id=9edcb5d7-b24a-44cc-80be-58cb47a7a2fc",
  login: "https://app.databasebuilder.com:446/Account/Login",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
] as const;

/* ---- hero -------------------------------------------------------------- */
export type HeroCard = {
  title: string;
  description: string;
  art: "checklist" | "dialer" | "messaging" | "support";
  alert?: boolean;
};

export const HERO_CARDS: HeroCard[] = [
  {
    title: "Advanced features, included",
    description: "All the essentials. No extra feature fees.",
    art: "checklist",
    alert: true,
  },
  {
    title: "Click to dial",
    description: "Automatic call recording included.",
    art: "dialer",
  },
  {
    title: "Email & two-way SMS",
    description: "Build your own email and text campaigns.",
    art: "messaging",
  },
  {
    title: "Live support",
    description: "Real human support, not AI.",
    art: "support",
  },
];

/* ---- why --------------------------------------------------------------- */
export const WHY_PARAGRAPHS = [
  "A productive CRM does not need to cost a fortune to be effective. DatabaseBuilder.com is an easy-to-use CRM system, offered at a reasonable price, and designed for salespeople by salespeople.",
  'Our "all-in-one" pricing makes our product easy to understand without all the complicated features that the average person is unlikely to use.',
  "We provide all the features you want to see, not features a software developer wants you to use.",
  "Give DatabaseBuilder.com a try and start a free trial today.",
];

/* ---- feature checklist -------------------------------------------------- */
export type ChecklistItem = { icon: IconName; label: string; featured?: boolean };

export const CHECKLIST: ChecklistItem[] = [
  { icon: "phone", label: "Click to dial calling - included", featured: true },
  { icon: "rec", label: "Automatic call recording - included", featured: true },
  { icon: "user", label: "Simple lead management with customizable data fields", featured: true },
  { icon: "swap", label: "Import/Export functionality for all your data", featured: true },
  { icon: "video", label: "Integrated video conferencing email invitations", featured: true },
  { icon: "voicemail", label: "Auto voicemail library", featured: true },
  { icon: "shield", label: "Safe and secure platform" },
  { icon: "share", label: "Shareable data for your team" },
  { icon: "mail", label: "Email and two-way SMS included" },
  { icon: "chat", label: "Talking Points functionality" },
  { icon: "chart", label: "Customizable KPI dashboard" },
  { icon: "api", label: "Custom integration with API access" },
  { icon: "pin", label: "Local Presence calling" },
  { icon: "headset", label: "Whisper coaching", featured: true },
  { icon: "monitor", label: "Real-time call monitoring", featured: true },
  { icon: "bell", label: "Real-time agent call transfer with popup notification", featured: true },
  { icon: "user", label: "Customer profile popup when transferred", featured: true },
  { icon: "headset", label: "Live customer support when you need it" },
  { icon: "tag", label: "No long-term contract or commitment" },
  { icon: "clock", label: "Pay as you go with 30-day cancellation" },
  { icon: "share", label: "Scalable for most size businesses" },
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

/* ---- product mock: inbox ------------------------------------------------ */
export type Conversation = {
  initials: string;
  name: string;
  meta: string;
  tint: string;
  active?: boolean;
};

export const CONVERSATIONS: Conversation[] = [
  { initials: "BC", name: "BrightWave Co.", meta: "SMS · 10:30 AM", tint: "#1d6fe8", active: true },
  { initials: "SR", name: "Summit Realty", meta: "Email · 9:20 AM", tint: "#7c3aed" },
  { initials: "HG", name: "Harbor Group", meta: "Call · Yesterday", tint: "#0ea5e9" },
  { initials: "AP", name: "Apex Partners", meta: "SMS · Yesterday", tint: "#f59e0b" },
  { initials: "CD", name: "Coastal Designs", meta: "Email · May 20", tint: "#10b981" },
  { initials: "VS", name: "Vertex Solutions", meta: "Call · May 20", tint: "#e23324" },
  { initials: "PL", name: "Pioneer Labs", meta: "SMS · May 19", tint: "#64748b" },
];

export type Message = { from: "them" | "us"; text: string; time: string };

export const THREAD: { name: string; phone: string; messages: Message[] } = {
  name: "BrightWave Co.",
  phone: "(806) 123-4567",
  messages: [
    { from: "them", text: "Hi, I'm interested in learning more about your solution.", time: "10:00 AM" },
    {
      from: "us",
      text: "Great! Thanks for reaching out. When would be a good time to connect?",
      time: "10:05 AM",
    },
    { from: "them", text: "How about tomorrow at 10am?", time: "10:30 AM" },
    { from: "us", text: "Perfect, I'll send a calendar invite shortly.", time: "10:31 AM" },
  ],
};

export const INBOX_TABS = ["All", "Unread", "Calls", "SMS", "Email"] as const;

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

export const SOCIALS: { icon: IconName; label: string; href: string }[] = [
  { icon: "fb", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61554575739247" },
  { icon: "li", label: "LinkedIn", href: "https://www.linkedin.com/company/databasebuilder-com" },
];
