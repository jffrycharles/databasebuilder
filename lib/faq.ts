/** Adam Berman's rebranding outline, September 2026. Typos and punctuation corrected. */
export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "own-data",
    question: "Can I use my own data with your CRM?",
    answer: [
      "Yes. We have a user-friendly import module built in so you can upload all of your current data and customer information from a CSV file. Our customer support team is happy to upload your data for you at no additional cost.",
    ],
  },
  {
    id: "customization",
    question: "Is your CRM customizable for my business needs?",
    answer: [
      "Yes. We offer many customizable data fields so you can import industry-specific information. You can organize and sort through that data the way you want to see and use it. We also offer custom development and network integration using API technology to bridge your network data with our CRM platform. Call for pricing.",
    ],
  },
  {
    id: "phone-and-email",
    question: "Can I use my own phone number and email address?",
    answer: [
      "Yes. Work numbers, mobile numbers, and email addresses can be set up and linked to personal or business accounts as the primary contact.",
    ],
  },
  {
    id: "data-after-cancellation",
    question: "What happens to my data if I cancel?",
    answer: [
      "Great question. Your data is always available to you and can be downloaded at any time. DatabaseBuilder.com is not in the business of holding your data hostage like so many other CRM companies. If you decide to cancel for any reason, you will always be asked what you want to do with your data, and it can be downloaded to a CSV file.",
    ],
  },
  {
    id: "cancellation",
    question: "Can I cancel my subscription or decrease the number of user licenses?",
    answer: [
      "Yes. We do not ask our customers for a long-term commitment. You can cancel your subscription at any time with 30 days' notice. You also have full control over the user licenses. The number of licenses can be modified on a monthly basis if you choose to pay monthly.",
    ],
  },
  {
    id: "advanced-features",
    question: "How much do you charge for advanced features?",
    answer: [
      'DatabaseBuilder.com does not use tiered or à la carte pricing like so many others. We designed our CRM to be simple and easy to understand. Our "all-in-one" pricing provides many advanced features in one pricing package, plus a few extras that you might find useful.',
      "One of the best features we offer is call recording. You might not use call recording currently, but you will. You no longer need to ask your customers to repeat themselves when providing their phone number, email address, or payment information.",
    ],
  },
  {
    id: "additional-costs",
    question: "Are there any setup fees or additional costs besides the monthly subscription?",
    answer: [
      "There are no setup fees for our CRM. We want to get you up and running as fast as we can.",
      "There are a few additional charges for third-party consumable services such as dialer minute usage, SMS usage, or additional phone numbers if you choose to purchase them. These services will be invoiced separately on a monthly basis. Customized programming will be quoted and billed separately.",
      'Dialer minutes and SMS packages can be purchased in bulk or "pay as you go" using the auto-refill setting in your account profile.',
    ],
  },
  {
    id: "sales-training",
    question: "Can I use DatabaseBuilder.com for sales training?",
    answer: [
      "Yes. Every business with at least one salesperson needs some level of training. We built training features into our CRM and included features like call recording, call monitoring, whisper coaching, and real-time call transfers with popup notification when a call is transferred to a new agent. All are included in our subscription package.",
    ],
  },
  {
    id: "security",
    question: "Is my data safe and secure?",
    answer: [
      "Yes. When it comes to security, we take this very seriously and provide a secure and independent environment for your business's data. Your data is kept separately and is backed up offsite daily. Unless you give us permission, DBB does not access your data, use your data, or provide your data to any third-party company whatsoever. If you choose, you can set up your own secure hosting platform offsite that DBB will have no access to.",
      "When it comes to managing your sales team, we provide a user-friendly management tool to edit users' profiles and set security levels. When a user's employment status changes or is terminated, system administrators have full access and control to lock users' accounts, review account information, monitor users' productivity, and transfer account information to other users.",
    ],
  },
  {
    id: "free-trial",
    question: "How long is my free trial?",
    answer: ["We offer a 7-day free trial."],
  },
  {
    id: "support",
    question: "Is support included?",
    answer: [
      "Yes. When it comes to tech support, DatabaseBuilder.com has a vested interest in getting our customers up and going as quickly as we can, so we do our best to have team members available to answer your questions. This is a big reason why we try to keep our CRM platform simple.",
    ],
  },
];

/**
 * The four groups used by the live DatabaseBuilder FAQ, applied to the
 * approved questions in this project. Every approved question appears once.
 */
export const FAQ_CATEGORIES: {
  title: string;
  art: "product" | "data" | "policy" | "sales";
  ids: string[];
}[] = [
  {
    title: "Product & Features",
    art: "product",
    ids: ["own-data", "customization", "phone-and-email", "advanced-features"],
  },
  {
    title: "Data",
    art: "data",
    ids: ["data-after-cancellation", "security"],
  },
  {
    title: "Policy",
    art: "policy",
    ids: ["additional-costs", "cancellation", "free-trial"],
  },
  {
    title: "Sales",
    art: "sales",
    ids: ["sales-training", "support"],
  },
];
