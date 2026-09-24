import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ContactForm from "@/components/sections/contact/ContactForm";
import NextSteps from "@/components/sections/contact/NextSteps";
import MapSection from "@/components/sections/contact/MapSection";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact DatabaseBuilder. Email info@databasebuilder.com, or write to us at 3312 W Peterson Ave, Chicago, IL 60659.",
  alternates: { canonical: "/contact" },
  ...pageMeta({
    title: "Contact — DatabaseBuilder",
    description:
      "Contact us and we will put your ideas into action.",
    path: "/contact"
  }),
};

export default function ContactPage() {
  let scheduleCallUrl: string | undefined;
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SCHEDULE_CALL_URL?.trim() || "");
    if (url.protocol === "https:" && !url.username && !url.password) scheduleCallUrl = url.href;
  } catch {
    // An absent or invalid booking URL must never produce a broken link.
  }
  return (
    <main id="top" tabIndex={-1} className="db-contact-page">
      <ContactForm scheduleCallUrl={scheduleCallUrl} />
      {/* between the two light sections, so the page alternates again */}
      <NextSteps />
      <MapSection />
      <CtaBand id="trial" showTrialLength />
    </main>
  );
}
