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

/* What happens after someone writes in.

   Every line here is already promised somewhere else on the site — the form
   says "usually answered within one business day", the email channel says
   "a person reads it — not a chatbot", and the FAQ says the support team
   imports your data at no additional cost. Nothing new is claimed; it is the
   same commitments, put in order, because the thing a contact page has to
   beat is the fear that a message disappears. */
export type ContactStep = { n: string; title: string; body: string };

export const CONTACT_STEPS: ContactStep[] = [
  {
    n: "01",
    title: "You send it",
    body: "The form or a plain email — both land in the same inbox in Chicago.",
  },
  {
    n: "02",
    title: "A person reads it",
    body: "Not a chatbot and not a ticket queue. Someone who knows the product.",
  },
  {
    n: "03",
    title: "You hear back",
    body: "Usually within one business day, with an actual answer rather than a holding note.",
  },
  {
    n: "04",
    title: "We set you up",
    body: "If you want the trial, we import your existing data for you at no extra cost.",
  },
];
