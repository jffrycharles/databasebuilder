import type { IconName } from "@/components/ui/Icon";

/* The Features page (/features), from Adam's outline: "Start best choice image
   up top", then the customizable database, productivity tracking and team
   user & account management, with integrated video conferencing and the data
   ownership section he moved here from About.

   Every claim below is read off the product screenshots in public/features/
   or is copy the site already carries. Nothing is invented for the page. */

export type FeaturePoint = { icon: IconName; title: string; body: string };

export const FX_HERO = {
  label: "Features",
  lede:
    "The database, dialer, coaching tools, reporting and video meetings your team uses every day — in one easy-to-use CRM, at one all-in-one price.",
};

/* Jump links under the hero. Plain anchors, no motion. */
export const FX_SECTIONS = [
  { id: "database", label: "Database" },
  { id: "lead-screen", label: "Lead screen" },
  { id: "productivity", label: "Productivity" },
  { id: "team", label: "Team management" },
  { id: "video", label: "Video meetings" },
  { id: "your-data", label: "Your data" },
];

export const FX_DATABASE = {
  label: "Customizable database",
  lede:
    "Every lead, customer and account in one grid you set up yourself: your tabs, your columns, your filters. Built for real lists — the account in this screen holds 17,405 records.",
  points: [
    {
      icon: "grid",
      title: "Tabs for every list",
      body: "Split your data by campaign, industry or city — training leads, orphan accounts, Chicago, retail.",
    },
    {
      icon: "search",
      title: "Filters and search",
      body: "Switch views, filter by category and find any contact from the search box.",
    },
    {
      icon: "chart",
      title: "The columns you care about",
      body: "Last called, last purchased, who called, total spent, total orders and a rating on every record.",
    },
  ] satisfies FeaturePoint[],
};

export const FX_LEAD = {
  label: "Lead screen",
  lede:
    "Click-to-dial with call recording on the left, the full business record in the middle, and talking points on the right — so the next call starts prepared.",
  points: [
    {
      icon: "phone",
      title: "Click to dial, with recording",
      body: "Call, end, record and play back from the dialer, with reminders and lead status beside it.",
    },
    {
      icon: "clip",
      title: "The whole record",
      body: "Company, contact, general and optional information, and dated notes in one place.",
    },
    {
      icon: "search",
      title: "One-click research",
      body: "Local time and weather, plus Google, Yahoo Finance, Chamber of Commerce, Maps and Facebook.",
    },
  ] satisfies FeaturePoint[],
};

export const FX_PRODUCTIVITY = {
  label: "Productivity tracking",
  lede:
    "Calls, emails, amounts and orders for every rep, by week, by year or across any date range you pick.",
  points: [
    {
      icon: "cal",
      title: "Any period",
      body: "Jump to today, choose a year and week, or set your own date range.",
    },
    {
      icon: "phone",
      title: "Activity per rep",
      body: "Calls and emails side by side for everyone on the team.",
    },
    {
      icon: "chart",
      title: "Results, not just effort",
      body: "Amounts and orders next to the activity, with the period's total at the foot.",
    },
  ] satisfies FeaturePoint[],
};

export const FX_TEAM = {
  label: "Team user & account management",
  lede:
    "Invite people, see every rep's tabs and leads, and keep an eye on company credits and dialer minutes — all from one admin screen.",
  points: [
    {
      icon: "users",
      title: "Invite and email users",
      body: "Add people to the account and message the whole team from the same screen.",
    },
    {
      icon: "card",
      title: "Credits and minutes",
      body: "Company credits and dialer minutes are always on show.",
    },
    {
      icon: "headset",
      title: "Call monitoring",
      body: "Listen in on your reps from the Call Monitoring tab.",
    },
    {
      icon: "swap",
      title: "Leads pool",
      body: "See each rep's tabs and record counts, and move leads between them.",
    },
  ] satisfies FeaturePoint[],
};

export const FX_VIDEO = {
  label: "Integrated video conferencing",
  lede:
    "Schedule the meeting from the lead you're already working. Tick Include Zoom and the join link, meeting ID and dial-in numbers go into the invite for you.",
  points: [
    {
      icon: "send",
      title: "Invite from the lead",
      body: "Title, date, time, location and a note, sent from the dashboard.",
    },
    {
      icon: "video",
      title: "Zoom details added",
      body: "The meeting link and dial-in numbers are written into the invite.",
    },
    {
      icon: "user",
      title: "Clients just join",
      body: "They open the link in their invite and the call starts.",
    },
  ] satisfies FeaturePoint[],
};

/* Moved here from /about at Adam's request ("I like this section but it
   doesn't belong in the About section"). His copy, unchanged. */
export const FX_OWNERSHIP = {
  body:
    "One of the biggest problems with the other CRMs on the market — beyond the price tag and the complexity — is how little control you have over data that took your team time and money to build. Cancel your service and it can be effectively held hostage, or simply unreachable without an active subscription. We do the opposite and hand you the keys.",
  points: [
    { icon: "upload" as IconName, text: "Download and back up your own data with a built-in tool" },
    { icon: "swap" as IconName, text: "Take it whenever you want it, as often as you want it" },
    { icon: "chat" as IconName, text: "Client notes and sales history come with it, not just contacts" },
    { icon: "user" as IconName, text: "Administrators keep full control of users and access levels" },
  ],
};
