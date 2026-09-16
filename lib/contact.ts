import type { IconName } from "@/components/ui/Icon";

/* Real details from the old site's contact page. */

export const CONTACT = {
  kicker: "Contact",
  headline: ["Your Ideas,", "Our Solution"],
  standfirst: "Contact us and we will put your ideas into action.",
  intro:
    "We are happy to help with any issue or question about the CRM. If you have a suggestion for the product, we would rather hear it than not — the roadmap is built from what our own reps and customers ask for.",
  address: { line1: "3312 W Peterson Ave", line2: "Chicago, IL 60659" },
  phone: { label: "+1 773 273 7310", href: "tel:+17732737310" },
  email: "info@databasebuilder.com",
  maps: "https://www.google.com/maps/search/?api=1&query=3312+W+Peterson+Ave+Chicago+IL+60659",
  // 3312 W Peterson Ave, Chicago — used to centre the office map
  lat: 41.990556,
  lng: -87.71,
} as const;

export type Channel = {
  icon: IconName;
  title: string;
  lines: string[];
  href?: string;
  action: string;
};

export const CHANNELS: Channel[] = [
  {
    icon: "mail",
    title: "Email",
    lines: ["info@databasebuilder.com", "A person reads it — not a chatbot"],
    href: "mailto:info@databasebuilder.com",
    action: "Write to us",
  },
  {
    icon: "pin",
    title: "Office",
    lines: ["3312 W Peterson Ave", "Chicago, IL 60659"],
    href: "https://www.google.com/maps/search/?api=1&query=3312+W+Peterson+Ave+Chicago+IL+60659",
    action: "Open in Maps",
  },
];

export const SUBJECTS = [
  "Product question",
  "Free trial and pricing",
  "Data and lead lists",
  "Technical support",
  "A suggestion for the product",
  "Something else",
] as const;
