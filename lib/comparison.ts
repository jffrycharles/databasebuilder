/* DatabaseBuilder vs other CRMs — every row of Adam's comparison chart
   (public/comparison.png), in its order, with its spelling corrected
   ("Indiviual", "DatebaseBuilder", "Wisper", "addional").

   What each cell means, as the chart draws it:
     yes         a green tick: included
     no          a red cross: not offered
     addon       "Add-On": available, at extra cost
     additional  "Additional": charged separately */

import type { IconName } from "@/components/ui/Icon";

export type Mark = "yes" | "no" | "addon" | "additional";

export type CompareRow = { feature: string; us: Mark; them: Mark };
export type CompareGroup = { title: string; icon: IconName; rows: CompareRow[] };

const row = (feature: string, us: Mark, them: Mark): CompareRow => ({ feature, us, them });

export const COMPARE_TITLE = "DatabaseBuilder vs Other CRMs";
export const COMPARE_LEDE =
  "More advanced features at no additional cost compared to other CRM companies.";

export const COMPARE_GROUPS: CompareGroup[] = [
  {
    title: "Individual features",
    icon: "user",
    rows: [
      row("Click to Dial Calling", "yes", "no"),
      row("Customizable Data Fields & Dashboard", "yes", "no"),
      row("Sales Pipeline Management", "yes", "no"),
      row("Call History & Activity Tracking", "yes", "no"),
      row("Workflow Management", "yes", "no"),
      row("Email, Templates, & Account Sync", "yes", "no"),
      row("Data Import Module", "yes", "no"),
      row("Scalable as Needed", "yes", "no"),
      row("Safe & Secure Platform", "yes", "no"),
      row("User Permissions Levels", "yes", "no"),
      row("Calendar & Lead Management", "yes", "no"),
      row("Automatic Call Recording", "yes", "no"),
      row("Auto Voicemail Library", "yes", "no"),
      row("Built-in SMS Text Campaigns", "yes", "no"),
      row("Local Presence", "yes", "no"),
      row("Integrated Video Conferencing", "yes", "no"),
      row("Data Export Module", "yes", "no"),
    ],
  },
  {
    title: "Team & training features",
    icon: "users",
    rows: [
      row("User Account & Lead Management", "yes", "addon"),
      row("Company Data Share", "yes", "addon"),
      row("Team Tracking & Monitoring", "yes", "addon"),
      row("Call Monitoring", "yes", "addon"),
      row("Whisper Coaching", "yes", "addon"),
      row("Live Call Transfer w/ Popup Notification", "yes", "addon"),
      row("Customer Profile Popup on Transfer", "yes", "addon"),
    ],
  },
  {
    /* On the chart these run on under the team heading; they are the
       pricing and service promises, so they get a heading of their own. */
    title: "Pricing & support",
    icon: "tag",
    rows: [
      row("All-in-One Pricing", "yes", "no"),
      row("Talking Points", "yes", "no"),
      row("Integrated Google and Social Media", "yes", "no"),
      row("Live Customer Support", "yes", "no"),
      row("No Long-Term Contract", "yes", "no"),
      row("30-Day Cancellation", "yes", "no"),
      row("Not Overly Complicated", "yes", "no"),
      row("Affordable Pricing", "yes", "no"),
    ],
  },
  {
    title: "Charged separately",
    icon: "card",
    rows: [
      row("Custom API Integration", "additional", "additional"),
      row("Dialer Minutes & SMS Messages", "additional", "additional"),
      row("Additional Phone Numbers", "additional", "additional"),
      row("Data Cloud Storage", "additional", "additional"),
      row("Additional User Licenses", "additional", "additional"),
    ],
  },
];
