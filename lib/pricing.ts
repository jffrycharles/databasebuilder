type Pricing = {
  includedUsers: number;
  baseMonthly: number | null;
  additionalUserMonthly: number | null;
  currencySymbol: string;
};

/** Amounts are TBA in Adam's outline. Keep null until approved prices are provided. */
export const PRICING: Pricing = {
  includedUsers: 3,
  baseMonthly: null,
  additionalUserMonthly: null,
  currencySymbol: "$",
};

export const PLAN_INCLUDES = [
  "Advanced features in one subscription package",
  "Click to dial with automatic call recording",
  "Email and two-way SMS messaging",
  "Sales training and call coaching tools",
  "Live human customer support",
  "No setup fees",
];

export const USAGE_CHARGES = [
  {
    title: "Dialer minutes & SMS usage",
    body: 'Usage is billed separately each month. Purchase minutes and SMS packages in bulk or pay as you go with the auto-refill setting in your account profile.',
  },
  {
    title: "Additional phone numbers",
    body: "Additional phone numbers are charged separately if you choose to purchase them.",
  },
  {
    title: "Custom programming & integration",
    body: "Customized programming and network integration are quoted and billed separately. Contact us to discuss your requirements.",
  },
];
