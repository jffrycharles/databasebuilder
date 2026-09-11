import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import OriginStory from "@/components/sections/about/OriginStory";
import Timeline from "@/components/sections/about/Timeline";
import QuoteBand from "@/components/sections/about/QuoteBand";
import Leadership from "@/components/sections/about/Leadership";
import ArchiveLinks from "@/components/sections/about/ArchiveLinks";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "DatabaseBuilder was created to give small and mid-sized businesses a simpler sales CRM. Sales software, designed by salespeople — our history, our leadership, and why we built it.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Our Story — DatabaseBuilder",
    description:
      "Sales software, designed by salespeople. The history behind DatabaseBuilder and the people who built it.",
    url: "/about",
    type: "article",
  },
};

export default function AboutPage() {
  return (
    <main>
      {/* Order of the story: why it exists, who built it, the founder in his
          own words, then the year-by-year and the archive. */}
      <AboutHero />
      <OriginStory />
      <Leadership />
      <QuoteBand />
      <Timeline />
      <ArchiveLinks />
      <CtaBand id="trial" />
    </main>
  );
}
