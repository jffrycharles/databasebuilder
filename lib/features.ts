import type { IconName } from "@/components/ui/Icon";

/* The 21 features from the outline, grouped so they read as capabilities
   rather than 21 identical cards. Every item from the list appears once. */
export type FeatureGroup = {
  title: string;
  icon: IconName;
  blurb: string;
  items: string[];
};

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Communication",
    icon: "phone",
    blurb: "Every way you reach a prospect, in one place.",
    items: [
      "Click to dial calling",
      "Automatic call recording",
      "Email and two-way SMS",
      "Auto voicemail library",
      "Local Presence calling",
      "Integrated video conferencing email invitations",
    ],
  },
  {
    title: "Sales management",
    icon: "chart",
    blurb: "The day-to-day work of running a pipeline.",
    items: [
      "Simple lead management",
      "Customizable data fields",
      "Talking Points functionality",
      "Customizable KPI dashboard",
    ],
  },
  {
    title: "Team & training",
    icon: "headset",
    blurb: "Coach a rep mid-call, not after the fact.",
    items: [
      "Real-time call monitoring",
      "Whisper coaching",
      "Real-time agent call transfer",
      "Customer profile popup when transferred",
    ],
  },
  {
    title: "Data & integration",
    icon: "swap",
    blurb: "Your pipeline stays yours, and connects to what you run.",
    items: [
      "Import and export all your data",
      "Custom integration with API access",
      "Shareable data for your team",
      "Safe and secure platform",
    ],
  },
  {
    title: "Support & terms",
    icon: "user",
    blurb: "A person on the phone, and no contract to sign.",
    items: [
      "Live customer support when you need it",
      "No long-term contract or commitment",
      "Pay as you go with 30-day cancellation",
      "Scalable for most size businesses",
    ],
  },
];
