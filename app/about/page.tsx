import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import AboutHero from "@/components/sections/about/AboutHero";
import OriginStory from "@/components/sections/about/OriginStory";
import Timeline from "@/components/sections/about/Timeline";
import QuoteBand from "@/components/sections/about/QuoteBand";
import Leadership from "@/components/sections/about/Leadership";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "DatabaseBuilder was created to give small and mid-sized businesses a simpler sales CRM. Sales software, designed by salespeople — our history, our leadership, and why we built it.",
  alternates: { canonical: "/about" },
  ...pageMeta({
    title: "Our Story — DatabaseBuilder",
    description:
      "Sales software, designed by salespeople. The history behind DatabaseBuilder and the people who built it.",
    path: "/about",
type: "article"
  }),
};

export default function AboutPage() {
  return (
    <main>
      {/* Order of the story: why it exists, who built it, the founder in his
          own words, then the year-by-year and the archive. */}
      <AboutHero />
      <OriginStory />
      {/* the history belongs with the story, not after the team */}
      <Timeline />
      <Leadership />
      <QuoteBand />
      <CtaBand id="trial" />
    </main>
  );
}
