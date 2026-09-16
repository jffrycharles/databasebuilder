import type { IconName } from "@/components/ui/Icon";

/* Content sourced from the old databasebuilder.com — the Our Team and History
   pages and the CEO's "About Us" letter. Only the genuine copy is kept; the
   old theme's placeholder text is not carried over. */

export const ABOUT = {
  kicker: "Our story",
  headline: ["Sales software,", "designed by", "salespeople."],
  standfirst:
    "Most CRM companies answered complexity by adding more of it, and raised the price to match. We went the other way: one simple system, one all-in-one price, built the way a salesperson actually works.",
  closing: "Salespeople close deals, not software.",
  ceoLetter: "https://databasebuilder.com/wp-content/uploads/2022/05/about-us.pdf",
} as const;

export const ORIGIN = {
  lead:
    "Our founder is a 45-year veteran of the sales industry who started in high school, selling sunglasses to his classmates and teachers. Many of the ideas behind this CRM came from his early days canvassing door to door, selling commercial printing.",
  body: [
    "Adam Berman has a fair amount of sales experience under his belt, and he managed to survive most of it without computers, cell phones, CRMs or AI. That perspective is the reason the product looks the way it does.",
    "After growing increasingly frustrated with what was on offer, the idea to build something better took hold. While most CRM companies were adding complex features and hiking their prices, we decided to do the opposite — a simple CRM at a reasonable all-in-one price.",
    "The goal was a system that worked the way a salesperson wants to use it, not the way a group of software developers decided it should be used. As we like to say, it's sales software, designed by salespeople.",
  ],
  pullQuote:
    "You present a product, give a price, and close the deal. It's not complicated, so there's no reason your CRM should be either.",
  stats: [
    { value: 45, suffix: " yrs", label: "Of sales experience behind the product" },
    { value: 20, suffix: "M", label: "Business and consumer records in the database" },
    { value: 1, suffix: " price", label: "All-in-one, with no tiers and no à la carte add-ons" },
  ],
};

export const OWNERSHIP = {
  title: "Your data is never held hostage",
  body:
    "One of the biggest problems with the other CRMs on the market — beyond the price tag and the complexity — is how little control you have over data that took your team time and money to build. Cancel your service and it can be effectively held hostage, or simply unreachable without an active subscription. We do the opposite and hand you the keys.",
  points: [
    { icon: "upload" as IconName, text: "Download and back up your own data with a built-in tool" },
    { icon: "swap" as IconName, text: "Take it whenever you want it, as often as you want it" },
    { icon: "chat" as IconName, text: "Client notes and sales history come with it, not just contacts" },
    { icon: "user" as IconName, text: "Administrators keep full control of users and access levels" },
  ],
};

export type Milestone = {
  year: string;
  title: string;
  body: string;
  tag: string;
};

export const TIMELINE: Milestone[] = [
  {
    year: "2013",
    title: "The idea",
    body: "A sales floor watching its own CRM get in the way. Complicated, expensive, and priced for features that went untouched. The brief was simple: build the version salespeople would actually use.",
    tag: "Origin",
  },
  {
    year: "2019",
    title: "The emergence of DatabaseBuilder",
    body: "In January we began implementation: the user dashboard, business and consumer search, the call dialer, call reporting, and roughly one million business and consumer records in the database.",
    tag: "Build",
  },
  {
    year: "2020",
    title: "20,000,000 records and growing",
    body: "We added approximately 20 million business and consumer records. Any business or consumer in the United States — any time, anywhere, any device.",
    tag: "Data",
  },
  {
    year: "2021",
    title: "Built to generate more leads",
    body: "Sales talking points from local demographics, news, weather and sports. Research tools, call recording, an email and voicemail library, Zoom teleconferencing, and list transfer through Google Drive, OneDrive and Dropbox.",
    tag: "Product",
  },
  {
    year: "2022",
    title: "First major release",
    body: "After three years of building the most convenient sales software we could, DatabaseBuilder shipped — efficient, secure, and straightforward enough that a rep can start on day one.",
    tag: "Launch",
  },
];

export type Leader = {
  name: string;
  role: string;
  initials: string;
  since: string;
  /** portrait in /public/team — falls back to the monogram when absent */
  photo?: string;
  /** one line shown on the card; `bio` sits behind "Read more" */
  summary: string;
  bio: string;
  quote?: string;
  phone: string;
  email: string;
};

export const LEADERS: Leader[] = [
  {
    name: "Adam Berman",
    photo: "/team/adam-berman.webp",
    summary: "Born into the business, in sales and marketing his whole career, and running the company since 1998.",
    role: "President / CEO",
    initials: "AB",
    since: "Leading since 1998",
    bio: "Adam was born into the business and has spent most of his life in sales and marketing, starting in commercial printing before joining RAI. Since taking over in 1998 he has overseen the company's growth and expansion into digital media. DatabaseBuilder is his latest project, and his passion for selling is what drives the product's direction.",
    quote: "Selling hasn't changed much in 40 years. The technology around it has.",
    phone: "773-273-7310",
    email: "aberman@raichicago.com",
  },
  {
    name: "Topaz Bigel",
    photo: "/team/topaz-bigel.webp",
    summary: "Twenty years from lead qualifier to VP of Operations, keeping the company running on all cylinders.",
    role: "VP of Operations & New Business Development",
    initials: "TB",
    since: "20+ years",
    bio: "Topaz has been with RAI for more than 20 years and keeps the company running on all cylinders. She started as a lead qualifier in marketing and worked her way up to Marketing Director, then General Sales Manager, and now VP of Operations and Co-Director of New Business Development.",
    phone: "773-273-7332",
    email: "tbigel@raichicago.com",
  },
  {
    name: "Mike Gallant",
    photo: "/team/mike-gallant.webp",
    summary: "Thirty years in radio advertising and marketing, now a partner leading sales and new business.",
    role: "Director of Sales & New Business Development · Partner",
    initials: "MG",
    since: "30+ years",
    bio: "Mike started in radio advertising more than 30 years ago as a sales rep and moved into marketing shortly after. A second-generation Gallant, he worked his way up to Marketing Director and is now a Partner in charge of Sales and New Business Development.",
    quote:
      "My team is always accessible to speak with customers. That's why we list our contact information.",
    phone: "773-273-7334",
    email: "mgallant@raichicago.com",
  },
  {
    name: "Sergiu Durlesteanu",
    photo: "/team/sergiu-durlesteanu.webp",
    summary: "Joined as a backend developer in 2013 and helped build DatabaseBuilder itself.",
    role: "Director of Business Technology & Senior Software Developer",
    initials: "SD",
    since: "Since 2013",
    bio: "Sergiu joined in 2013 as a backend developer and worked his way up to Senior Lead Developer, then Director of Business Technology. He helped build DatabaseBuilder itself, and his knowledge of databases and programming shapes how the platform handles data at scale.",
    phone: "773-273-7317",
    email: "sdurlesteanu@raichicago.com",
  },
];

