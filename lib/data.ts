import type { IconName } from "@/components/ui/Icon";

export const SITE = {
  name: "DatabaseBuilder",
  tagline: "Sales Solution",
  title: "DatabaseBuilder — A Simple Alternative to Your Overpriced CRM",
  description:
    "Sales software designed by salespeople. Advanced features at no additional cost, call recording, email and SMS, and live human support.",
  url: "https://www.databasebuilder.com",
  register:
    "https://app.databasebuilder.com:446/Account/Register?id=9edcb5d7-b24a-44cc-80be-58cb47a7a2fc",
  login: "https://app.databasebuilder.com:446/Account/Login",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Our Story", href: "#why" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#features" },
  { label: "Contact Us", href: "#contact" },
] as const;

/* ---- hero -------------------------------------------------------------- */
export type HeroCard = {
  top: string[];
  bottom: string[];
  art: "checklist" | "dialer" | "messaging" | "support";
  alert?: boolean;
};

export const HERO_CARDS: HeroCard[] = [
  { top: ["Advanced", "Features"], bottom: ["At No", "Additional Cost"], art: "checklist" },
  { top: ["Click To Dial", "With Automatic"], bottom: ["Call", "Recording"], art: "dialer" },
  { top: ["Email & SMS"], bottom: ["Messaging", "Included"], art: "messaging" },
  { top: ["Live", "Support"], bottom: ["Not an AI", "Chatbot"], art: "support", alert: true },
];

/* ---- why --------------------------------------------------------------- */
export const WHY_PARAGRAPHS = [
  "A productive CRM does not have to cost a fortune to be effective.",
  "DatabaseBuilder is a simple-to-use CRM offered at a reasonable price, designed for salespeople by salespeople.",
  "Our all-in-one pricing keeps the product easy to understand, without the complicated features the average salesperson is unlikely to use.",
  "We build the features you want to see, not the features a software developer wants you to see.",
];

/* ---- feature checklist -------------------------------------------------- */
export type ChecklistItem = { icon: IconName; label: string };

export const CHECKLIST: ChecklistItem[] = [
  { icon: "phone", label: "Click to dial calling" },
  { icon: "rec", label: "Automatic call recording" },
  { icon: "user", label: "Simple lead management with customizable data fields" },
  { icon: "swap", label: "Import/Export functionality for all your data" },
  { icon: "shield", label: "Safe and secure security controls" },
  { icon: "share", label: "Shareable data for your sales team" },
  { icon: "mail", label: "Email and two-way SMS communications included" },
  { icon: "voicemail", label: "Auto voicemail library" },
  { icon: "chat", label: "Sales talking points" },
  { icon: "chart", label: "Customizable features and KPI dashboard" },
  { icon: "api", label: "Scalable, with API access" },
  { icon: "video", label: "Integrated video conferencing email invitations" },
  { icon: "pin", label: "Local presence" },
  { icon: "headset", label: "Whisper coaching" },
  { icon: "monitor", label: "Real-time call monitoring" },
  { icon: "bell", label: "Real-time agent notification and call transfer" },
  { icon: "user", label: "Live human customer support when you need it" },
  { icon: "tag", label: "No long-term commitment" },
  { icon: "card", label: "Billed monthly" },
  { icon: "clock", label: "30-day cancellation" },
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
      { label: "XLSX", tint: "#1d6fe8" },
      { label: "JSON", tint: "#ea580c" },
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
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Integrations", href: "#features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "#why" },
      { label: "Careers", href: "#contact" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQs", href: "#features" },
      { label: "Support", href: "#contact" },
      { label: "Blog", href: "#why" },
    ],
  },
];

export const SOCIALS: { icon: IconName; label: string; href: string }[] = [
  { icon: "fb", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61554575739247" },
  { icon: "li", label: "LinkedIn", href: "https://www.linkedin.com/company/databasebuilder-com" },
  { icon: "tw", label: "X", href: "#top" },
  { icon: "yt", label: "YouTube", href: "#top" },
];
