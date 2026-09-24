import { CONTACT } from "@/lib/contact";

/* The Privacy Policy and the Terms & Conditions, as data.

   Every promise in here is one the site already makes somewhere else — the
   FAQ (your data is kept separately, backed up offsite daily, never accessed
   or passed on without permission, exportable to CSV), the pricing page (7-day
   trial with no card, no setup fees, usage billed separately, 30 days' notice
   to cancel) and the contact page (a person reads every message). Where the
   two documents need something the site does not say, they say it in the
   plainest form that is still true, and nothing more specific than we know.

   Text is plain strings with two bits of inline markup: [label](href) for a
   link and **bold** for a lead-in. Section ids are the anchors, so
   /privacy#cookies and /terms#calls-and-messages are stable addresses. */

export type LegalBlock =
  | { kind: "p"; text: string; emphasis?: boolean }
  | { kind: "list"; items: string[] }
  | { kind: "h3"; text: string };

export type LegalSection = {
  id: string;
  title: string;
  /** the plain-English version, shown above the section as "In short" */
  summary: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  path: "/privacy" | "/terms";
  /** the document's name, for the contents, the switcher and the <title> */
  name: string;
  /** the headline, split so the second part can carry the red */
  title: [string, string];
  lede: string;
  description: string;
  /** ISO date — shown as "Last updated" */
  updated: string;
  sections: LegalSection[];
};

const p = (text: string, emphasis = false): LegalBlock => ({ kind: "p", text, emphasis });
const list = (...items: string[]): LegalBlock => ({ kind: "list", items });
const h3 = (text: string): LegalBlock => ({ kind: "h3", text });

const MAIL = `[${CONTACT.email}](mailto:${CONTACT.email})`;
const POSTAL = `DatabaseBuilder, ${CONTACT.address.line1}, ${CONTACT.address.line2}`;

export const LEGAL_UPDATED = "2026-09-22";

/* ------------------------------------------------------------------------ */

export const PRIVACY: LegalDoc = {
  path: "/privacy",
  name: "Privacy Policy",
  title: ["Privacy", "Policy"],
  lede: "What we collect, why we collect it and the choices you have, in plain English. The short version: your data is yours, and we don’t sell it.",
  description:
    "How DatabaseBuilder collects, uses and protects personal information on databasebuilder.com and in the DatabaseBuilder CRM.",
  updated: LEGAL_UPDATED,
  sections: [
    {
      id: "who-we-are",
      title: "Who we are and what this covers",
      summary:
        "This policy covers the DatabaseBuilder website and the DatabaseBuilder CRM. It explains what we collect, why we collect it and the choices you have.",
      blocks: [
        p(
          `DatabaseBuilder.com (“DatabaseBuilder,” “we,” “us” or “our”) makes CRM software for sales teams. We’re based at ${CONTACT.address.line1} in Chicago, Illinois.`,
        ),
        p(
          "This Privacy Policy applies when you visit databasebuilder.com (the “Site”), contact us, start a free trial, or use the DatabaseBuilder CRM at app.databasebuilder.com (the “Service”). It deals with two different kinds of information:",
        ),
        list(
          "**Information about you** as a visitor, prospect or account holder. We decide how that information is used, and this policy explains how.",
          "**Information your business keeps in the CRM** about its own contacts, leads and customers (“Customer Data”). Your business decides what goes in and how it’s used; we look after it on your behalf. [Your business’s data](#customer-data) explains how.",
        ),
      ],
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      summary:
        "What you tell us, what the Service needs in order to work, and the basic technical details every website receives. We don’t buy information about you from anyone.",
      blocks: [
        h3("Information you give us"),
        list(
          "**Contact form and email.** Your name and email address, and anything else you choose to include, such as your phone number, company and message.",
          "**Trial and account sign-up.** Your name, email address, company name and login details, and the details of any users you add to your account.",
          "**Billing.** Your billing contact and the payment details needed to charge your subscription. Card payments are handled by our payment processor, and we don’t keep full card numbers on our servers.",
          "**Support.** What you tell us when you ask for help, and any records you ask us to import for you.",
        ),
        h3("Information the Service records as you use it"),
        list(
          "**Account activity,** such as sign-ins, settings and the features you use, so we can run and secure the Service.",
          "**Calls, messages and email sent through the Service,** including call logs, call recordings where your account has recording turned on, and the content of texts and emails. This is Customer Data, covered in [Your business’s data](#customer-data).",
        ),
        h3("Information sent automatically"),
        p(
          "Like every website, our servers receive basic technical details when you load a page: your IP address, your browser and device type, the page you asked for, the page that sent you and the time. We keep these server logs to keep the Site and the Service secure and working.",
        ),
        p(
          "The Site doesn’t use advertising or analytics trackers. [Cookies](#cookies) lists the few cookies the Service does use.",
        ),
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use information",
      summary:
        "To run the Service, help you, bill you, keep things secure and improve the product. We don’t sell personal information.",
      blocks: [
        list(
          "Provide the Service: set up and manage your account, and deliver the features you use.",
          "Answer your questions and support you, including importing your data when you ask us to.",
          "Bill you for your subscription and any usage charges, and keep records of payments.",
          "Send you messages about your account, such as trial reminders, billing notices, security alerts and changes to the Service.",
          "Improve DatabaseBuilder. Our roadmap is built from what customers ask for, and we look at how features are used overall.",
          "Protect the Service, our customers and ourselves against fraud, abuse and security threats.",
          "Meet our legal obligations and enforce our [Terms & Conditions](/terms).",
        ),
        p(
          "We may also send you occasional news about the product. Every one of those emails has an unsubscribe link, and unsubscribing doesn’t stop the messages we need to send about your account.",
        ),
      ],
    },
    {
      id: "customer-data",
      title: "Your business’s data",
      summary:
        "Your data is yours. We don’t look at it, use it or pass it on without your permission, apart from what it takes to run the features you use.",
      blocks: [
        p(
          "You own the Customer Data you put into DatabaseBuilder. Each business’s data is kept in its own separate environment and backed up offsite every day.",
        ),
        p(
          "Unless you give us permission, we don’t access your Customer Data, use it, or provide it to any other company. The only exceptions are:",
        ),
        list(
          "**What it takes to run the features you use.** The carriers that connect your calls and deliver your texts, and the services that send your email, have to handle those calls and messages to deliver them.",
          "**When you ask us to,** for example to fix a problem or import your records.",
          "**When the law requires it.** See [When we share information](#sharing).",
        ),
        p(
          "We never sell Customer Data or use it for advertising. You can export it to a CSV file at any time, and if you prefer, you can host it on your own secure platform that we have no access to.",
        ),
        p(
          "Your business is responsible for collecting and using the personal information in its CRM lawfully, including giving any notice and getting any consent the law requires before you record calls or send texts. Our [Terms & Conditions](/terms#calls-and-messages) cover this in more detail.",
        ),
      ],
    },
    {
      id: "sharing",
      title: "When we share information",
      summary:
        "With the companies that help us run DatabaseBuilder, when the law requires it, or if the business changes hands. Never for sale.",
      blocks: [
        list(
          "**Service providers** that host and back up the Service, process payments, connect calls, deliver texts and email, deliver messages from our contact form and show the map on our Contact page. They may only use the information to provide their service to us.",
          "**Legal reasons.** When we believe in good faith that the law requires it, for example to answer a subpoena or court order, or when it’s needed to protect someone’s safety, prevent fraud or defend our legal rights.",
          "**Business transfers.** If DatabaseBuilder is involved in a merger, acquisition or sale of assets, information may pass to the new owner, who will be bound by this policy.",
          "**With your permission,** or when you ask us to share it.",
        ),
        p(
          "We don’t sell personal information, and we don’t share it for cross-context behavioral advertising.",
        ),
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      summary:
        "The website doesn’t use tracking cookies. The CRM uses a few essential ones to keep you signed in and your account secure.",
      blocks: [
        p(
          "**On the Site,** we don’t set cookies for analytics or advertising. The map on our Contact page loads map images from OpenFreeMap (or, if that map can’t load, from OpenStreetMap), and those services receive your IP address as part of the request.",
        ),
        p(
          "**In the Service,** we use essential cookies that sign you in, remember you if you tick “Remember me,” and protect forms against forgery. The Service can’t work without them, so they can’t be switched off, but they aren’t used to follow you around other websites.",
        ),
        p(
          "You can block or delete cookies in your browser settings, but if you block the essential ones you won’t be able to sign in. Because we don’t track you across websites, there’s nothing for Do Not Track or Global Privacy Control signals to switch off.",
        ),
      ],
    },
    {
      id: "retention",
      title: "How long we keep information",
      summary:
        "For as long as your account is open, then only as long as it takes to hand your data back and meet our legal obligations.",
      blocks: [
        list(
          "**Account and billing information** is kept while your account is open, and afterwards for as long as we need it for accounting, tax, legal and dispute purposes.",
          "**Customer Data** is kept while your account is open. When you cancel, we’ll ask what you want done with it, and you can download it to a CSV file. After that we delete it, unless the law requires us to keep it. Copies in backups are overwritten as the backups roll over.",
          "**Messages you send us** are kept as long as we need them to help you and follow up.",
          "**Server logs** are kept for a limited time, unless we need them longer to investigate a security issue.",
        ),
      ],
    },
    {
      id: "security",
      title: "How we protect information",
      summary:
        "Separate environments, daily offsite backups, encrypted connections and limited access. No system is perfect, so we’ll tell you if something goes wrong.",
      blocks: [
        list(
          "The Site and the Service are only available over encrypted (HTTPS) connections.",
          "Each business’s data is kept separately and backed up offsite every day.",
          "Access to systems that hold personal information is limited to the people who need it to do their jobs.",
          "Account administrators can set security levels for their users, lock accounts and transfer records when someone leaves.",
        ),
        p(
          "You can help by using a strong password, keeping your login to yourself and telling us straight away if you think someone has got into your account.",
        ),
        p("If a security incident affects your personal information, we’ll notify you as the law requires."),
      ],
    },
    {
      id: "your-rights",
      title: "Your choices and rights",
      summary:
        "You can ask to see, correct, export or delete your information. Email us, and a person will handle it.",
      blocks: [
        list(
          "See the personal information we hold about you, and get a copy of it.",
          "Correct information that’s wrong or out of date.",
          "Delete your information, or close your account.",
          "Stop marketing emails at any time.",
        ),
        p(
          "Depending on where you live, you may have further rights under laws such as those of California, Colorado and Virginia, or of the UK and the EU. We’ll honor them as those laws require, and we won’t treat you differently for using them.",
        ),
        p(
          `To make a request, email ${MAIL}. We may need to confirm who you are first, and if someone is asking on your behalf, we may ask for proof that you’ve authorized them.`,
        ),
        p(
          "If your information is in the CRM of one of our customers, that business controls it. We’ll pass your request on and help them respond.",
        ),
      ],
    },
    {
      id: "children",
      title: "Children",
      summary: "DatabaseBuilder is a business tool, and it isn’t meant for children.",
      blocks: [
        p(
          "The Site and the Service aren’t directed to children under 16, and we don’t knowingly collect their personal information. If you think a child has given us information, contact us and we’ll delete it.",
        ),
      ],
    },
    {
      id: "where-we-process",
      title: "Where information is processed",
      summary: "We’re based in the United States, and that’s where your information is processed.",
      blocks: [
        p(
          "DatabaseBuilder is run from the United States. Information we collect is processed in the United States and in the other places where our service providers operate. If you use DatabaseBuilder from outside the United States, your information will be transferred there.",
        ),
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      summary:
        "If we change this policy, we’ll update the date at the top, and tell you first if the change is significant.",
      blocks: [
        p(
          "We may update this policy as DatabaseBuilder or the law changes. The date at the top always shows the latest version. If we make a change that significantly affects how we handle your information, we’ll let account holders know by email or in the Service before it takes effect.",
        ),
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      summary: "Questions about your privacy go to a person, not a chatbot.",
      blocks: [p(`Email ${MAIL}, or write to ${POSTAL}.`)],
    },
  ],
};

/* ------------------------------------------------------------------------ */

export const TERMS: LegalDoc = {
  path: "/terms",
  name: "Terms & Conditions",
  title: ["Terms &", "Conditions"],
  lede: "The agreement between you and DatabaseBuilder, in plain English. The short version: no long-term contract, your data stays yours, and the calling tools are yours to use within the law.",
  description:
    "The terms for using databasebuilder.com and the DatabaseBuilder CRM: trials, billing, cancellation, your data, and calling and messaging rules.",
  updated: LEGAL_UPDATED,
  sections: [
    {
      id: "agreement",
      title: "The agreement",
      summary:
        "Using DatabaseBuilder means agreeing to these terms. If you sign up for a business, you’re agreeing on its behalf.",
      blocks: [
        p(
          "These Terms & Conditions (the “Terms”) are an agreement between you and DatabaseBuilder.com (“DatabaseBuilder,” “we,” “us” or “our”). They cover your use of databasebuilder.com (the “Site”) and the DatabaseBuilder CRM (the “Service”).",
        ),
        p(
          "By starting a trial, creating an account or using the Service, you agree to these Terms and to our [Privacy Policy](/privacy). If you’re signing up for a company or other organization, you confirm that you’re authorized to accept these Terms for it, and “you” means that organization.",
        ),
        p(
          "If we agree a written quote with you, for example for custom development, the quote applies to that work, and where it conflicts with these Terms, the quote wins for that work.",
        ),
        p(
          "You must be at least 18 and use the Service for business purposes. If you don’t agree with these Terms, please don’t use the Service.",
        ),
      ],
    },
    {
      id: "accounts",
      title: "Accounts and users",
      summary: "Keep your logins private. You’re responsible for the people you add to your account.",
      blocks: [
        list(
          "Give us accurate information when you sign up, and keep it up to date.",
          "Each user license is for one named person. Logins can’t be shared between people.",
          "You’re responsible for everything done under your account, including by the users you add, and for keeping passwords secure.",
          "Your account administrators control who has access, and can lock accounts and transfer records when someone leaves.",
          `Tell us straight away at ${MAIL} if you think someone has got into your account without permission.`,
        ),
      ],
    },
    {
      id: "free-trial",
      title: "Free trial",
      summary: "Seven days, no card required. If you don’t subscribe, the trial simply ends.",
      blocks: [
        p(
          "New customers can try the Service free for 7 days. You don’t need to give us payment details to start a trial.",
        ),
        p(
          "When the trial ends, you’ll need a paid subscription to keep using the Service. If you don’t subscribe, your trial account closes and its data may be deleted, so export anything you want to keep before the trial ends.",
        ),
        p(
          "Features that rely on paid third-party usage, such as dialer minutes, SMS and phone numbers, may be limited during a trial. Trials are one per business, and we may change or end trial offers at any time.",
        ),
      ],
    },
    {
      id: "billing",
      title: "Plans, billing and usage",
      summary: "One monthly price for the package, with usage billed separately. No setup fees and no tiers.",
      blocks: [
        list(
          "**Subscription.** The subscription is billed monthly at the price on our [Pricing page](/pricing) or in your quote. The package includes up to three users, and more user licenses are available at the listed monthly rate.",
          "**User licenses.** If you pay monthly, you can change the number of user licenses from month to month.",
          "**No setup fees.** There’s no charge to get started.",
          "**Usage charges.** Dialer minutes, SMS messages and additional phone numbers are third-party services billed separately each month. You can buy them in bulk or pay as you go with auto-refill. If you turn auto-refill on, you authorize us to charge you each time your balance is topped up.",
          "**Custom work.** Custom programming and integrations are quoted and billed separately.",
          "**Taxes.** Prices don’t include taxes, and you’re responsible for any taxes that apply to your purchase.",
        ),
        p(
          "You authorize us, through our payment processor, to charge your payment method for all fees when they’re due. If a payment fails, we’ll let you know, and if it isn’t resolved, we may suspend the Service until it is.",
        ),
        p(
          "We may change our prices. We’ll give you at least 30 days’ notice, and the new price applies from your next billing period after that. Except where the law requires otherwise, fees you’ve already paid aren’t refundable.",
        ),
      ],
    },
    {
      id: "cancellation",
      title: "Cancelling and your data",
      summary: "No long-term contract. Cancel with 30 days’ notice and take your data with you.",
      blocks: [
        p(
          `You can cancel your subscription at any time by giving us 30 days’ notice, for example by emailing ${MAIL}. Your subscription stays active, and is billed, until the end of the notice period.`,
        ),
        p(
          "When you cancel, we’ll ask you what you want done with your data. You can download it to a CSV file at any time, before or after you give notice. We don’t hold your data hostage.",
        ),
        p(
          "We may suspend or end your access if you seriously or repeatedly breach these Terms, don’t pay what you owe, or use the Service in a way that’s illegal or puts others at risk. Where it’s reasonable, we’ll warn you first and give you a chance to put things right, and we’ll give you a chance to export your data unless the law prevents it.",
        ),
      ],
    },
    {
      id: "your-data",
      title: "Your data",
      summary: "You own what you put in. We use it only to run the Service for you.",
      blocks: [
        p(
          "You keep all rights to the data you put into the Service (“Customer Data”). You give us permission to host, copy, process, transmit and display it only as needed to provide the Service and support to you, as described in our [Privacy Policy](/privacy#customer-data).",
        ),
        p(
          "You’re responsible for your Customer Data: that it’s accurate, that you have the right to use it and that you collected it lawfully.",
        ),
        p(
          "We back up Customer Data offsite every day, but we still recommend exporting copies of anything critical to your business from time to time.",
        ),
        p("If you send us ideas or suggestions for the product, we’re free to use them without any obligation to you."),
      ],
    },
    {
      id: "calls-and-messages",
      title: "Calls, recordings and messages",
      summary:
        "The calling, recording and texting tools are powerful. You’re responsible for using them within the law.",
      blocks: [
        list(
          "**Recording and monitoring calls.** Recording laws differ from place to place, and some states, including Illinois, require the consent of everyone on the call. Before you record or monitor a call, or use whisper coaching on it, you must give any notice and get any consent the law requires.",
          "**Calling and texting rules.** You must follow the laws and carrier rules that apply to sales calls, texts and email, such as the Telephone Consumer Protection Act, the Telemarketing Sales Rule, Do Not Call rules and CAN-SPAM. That includes getting consent where it’s required, honoring opt-outs and calling only at permitted times.",
          "**Your own team.** If you use recording, monitoring or activity reporting on your staff, you’re responsible for telling them and for following employment and privacy laws.",
          "**Phone numbers** we provide are supplied by telecommunications carriers and are subject to their rules.",
        ),
        p(
          "The Service isn’t a replacement for a telephone line and must not be used for emergency calls. It isn’t designed to place calls to 911 or any other emergency service.",
          true,
        ),
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      summary: "Don’t use DatabaseBuilder to break the law, spam people or break the Service.",
      blocks: [
        p("You agree not to, and not to let anyone else:"),
        list(
          "use the Service for anything illegal, fraudulent or deceptive;",
          "send unsolicited bulk messages, or make automated or prerecorded calls without the consent the law requires;",
          "harass, threaten or abuse anyone;",
          "upload content you don’t have the right to use, or anything containing viruses or other harmful code;",
          "try to get into accounts or systems you’re not authorized to use, or probe or test the Service’s security without our written permission;",
          "copy, reverse engineer or resell the Service, except where the law allows it or we agree in writing;",
          "put an unreasonable load on the Service, for example with automated scraping.",
        ),
      ],
    },
    {
      id: "support",
      title: "Support and changes to the Service",
      summary: "Support from real people is included, and we keep improving the product.",
      blocks: [
        p(
          "Support is included in your subscription. We do our best to have team members available to answer your questions, and we’re happy to import your data for you at no extra cost.",
        ),
        p(
          "We work to keep the Service available and reliable, but we can’t promise it will always be uninterrupted or error-free. We sometimes need to take it offline for maintenance, and some features depend on carriers and other providers outside our control.",
        ),
        p(
          "We may add, change or remove features over time. If a change significantly reduces the core features you’re paying for, we’ll tell you in advance.",
        ),
      ],
    },
    {
      id: "ownership",
      title: "Our software and brand",
      summary: "The software is ours. Your data is yours.",
      blocks: [
        p(
          "DatabaseBuilder owns the Service and the Site and everything in them, including the software, design, text, and our name and logo, but not your Customer Data. While your subscription is active, we give you a limited, non-exclusive, non-transferable right to use the Service for your internal business purposes. We keep every right we don’t expressly give you.",
        ),
      ],
    },
    {
      id: "third-parties",
      title: "Other companies’ services",
      summary: "Some features rely on other companies, and their terms may apply too.",
      blocks: [
        p(
          "Parts of the Service rely on third parties, such as telecommunications carriers, messaging and email providers, and our payment processor. If you connect other software to the Service, for example through our API, your use of that software is governed by its own terms. We aren’t responsible for services we don’t control.",
        ),
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      summary: "We work hard to make DatabaseBuilder reliable, but it’s provided as is.",
      blocks: [
        p(
          "To the fullest extent the law allows, the Service and the Site are provided “as is” and “as available,” without warranties of any kind, whether express or implied, including any implied warranties of merchantability, fitness for a particular purpose and non-infringement.",
          true,
        ),
        p(
          "We don’t promise any particular sales results. The features that help you manage calls and messages are tools, not legal advice, and you’re responsible for making sure the way you use them is lawful.",
        ),
      ],
    },
    {
      id: "liability",
      title: "Limit of liability",
      summary:
        "If something goes wrong, our total liability is limited to what you paid us in the 12 months before it happened.",
      blocks: [
        p(
          "To the fullest extent the law allows, DatabaseBuilder won’t be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of profits, revenue, data or goodwill, arising from or related to these Terms or the Service, even if we were told they were possible.",
          true,
        ),
        p(
          "Our total liability for all claims arising from or related to these Terms or the Service is limited to the amount you paid us for the Service in the 12 months before the event that gave rise to the claim.",
          true,
        ),
        p("Some places don’t allow these limits, so they may not all apply to you."),
      ],
    },
    {
      id: "indemnity",
      title: "Indemnity",
      summary: "If your use of the Service breaks the law and someone makes a claim against us, you’ll cover it.",
      blocks: [
        p(
          "You agree to defend and indemnify DatabaseBuilder, and its owners, employees and agents, against any third-party claims, losses and costs (including reasonable legal fees) arising from your Customer Data, from your use of the calling, recording or messaging features in breach of the law, or from your breach of these Terms.",
        ),
      ],
    },
    {
      id: "governing-law",
      title: "Governing law and disputes",
      summary: "Illinois law applies. If there’s a problem, talk to us first.",
      blocks: [
        p(
          "These Terms are governed by the laws of the State of Illinois, without regard to its conflict-of-laws rules. Any dispute will be heard only in the state or federal courts located in Cook County, Illinois, and you and we both agree to the jurisdiction of those courts.",
        ),
        p(`Before starting any legal claim, please email us at ${MAIL} and give us 30 days to try to resolve it informally.`),
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      summary: "If we change these terms in a significant way, we’ll tell you before the change takes effect.",
      blocks: [
        p(
          "We may update these Terms from time to time, and the date at the top shows the latest version. For significant changes, we’ll give account holders at least 30 days’ notice by email or in the Service. If you keep using the Service after a change takes effect, you accept the new Terms; if you don’t agree, you can cancel as described in [Cancelling and your data](#cancellation).",
        ),
      ],
    },
    {
      id: "general",
      title: "General",
      summary: "The standard provisions that make the agreement work.",
      blocks: [
        list(
          "**Entire agreement.** These Terms, our Privacy Policy and any written quote are the whole agreement between us about the Service.",
          "**Severability.** If any part of these Terms can’t be enforced, the rest stays in effect.",
          "**No waiver.** If we don’t enforce a right straight away, we haven’t given it up.",
          "**Assignment.** You can’t transfer these Terms without our written consent, except as part of a merger or sale of your business. We may transfer them to a successor.",
          "**Events beyond anyone’s control.** Neither of us is responsible for delays caused by events outside reasonable control, such as carrier outages, natural disasters or internet failures. This doesn’t excuse payments that are due.",
          `**Notices.** We’ll send notices to the email address on your account. You can send notices to ${MAIL} or to our mailing address below.`,
          "**Relationship.** We’re independent businesses. Nothing in these Terms creates a partnership, employment or agency relationship.",
        ),
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      summary: "Questions about these terms go to a real person.",
      blocks: [p(`Email ${MAIL}, or write to ${POSTAL}.`)],
    },
  ],
};

export const LEGAL_DOCS = [PRIVACY, TERMS] as const;

/** "September 22, 2026" — fixed to one locale and zone, so the server and the
    browser can never render two different dates for the same page. */
export function formatLegalDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** What the opener renders, and nothing else. The opener is a client
    component, so everything handed to it is serialized into the page for
    the browser — passing the whole document shipped every section twice. */
export function legalHeroProps(doc: LegalDoc) {
  return {
    path: doc.path,
    title: doc.title,
    lede: doc.lede,
    updated: doc.updated,
    updatedLabel: formatLegalDate(doc.updated),
    minutes: readingMinutes(doc),
    links: LEGAL_DOCS.map((d) => ({ path: d.path, name: d.name })),
  };
}
export type LegalHeroProps = ReturnType<typeof legalHeroProps>;

/** Minutes to read at a steady 230 words a minute, markup stripped. */
export function readingMinutes(doc: LegalDoc) {
  const text = doc.sections
    .flatMap((s) => [
      s.title,
      s.summary,
      ...s.blocks.flatMap((b) => (b.kind === "list" ? b.items : [b.text])),
    ])
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "");
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 230));
}
