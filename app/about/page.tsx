import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import OriginStory from "@/components/sections/about/OriginStory";
import QuoteBand from "@/components/sections/about/QuoteBand";
import Timeline from "@/components/sections/about/Timeline";
import Leadership from "@/components/sections/about/Leadership";
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

/* Three acts, three surfaces: the dark opener, the story on the light page,
   the history on a dark band, then the people and the close back on light. */
export default function AboutPage() {
  return (
    <main id="main">
      <AboutHero />
      <OriginStory />
      <QuoteBand />
      <Timeline />
      <Leadership />
      <CtaBand id="trial" />
    </main>
  );
}
