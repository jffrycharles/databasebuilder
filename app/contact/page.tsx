import type { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactForm from "@/components/sections/contact/ContactForm";
import MapSection from "@/components/sections/contact/MapSection";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Your ideas, our solution. Call +1 773 273 7310, email info@databasebuilder.com, or write to us at 3312 W Peterson Ave, Chicago, IL 60659.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — DatabaseBuilder",
    description: "Contact us and we will put your ideas into action.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <MapSection />
      <CtaBand id="trial" showTrialLength />
    </main>
  );
}
