import Hero from "@/components/sections/Hero";
import WhySection from "@/components/sections/WhySection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import BuiltForSection from "@/components/sections/BuiltForSection";
import PricingTeaser from "@/components/sections/PricingTeaser";
import HomeFaq from "@/components/sections/HomeFaq";
import CtaBand from "@/components/sections/CtaBand";

/* Server component: the page itself ships no JavaScript. Only the pieces that
   animate or respond to input opt into the client. */
export default function Page() {
  return (
    <main>
      <Hero />
      <WhySection />
      <FeaturesSection />
      <BuiltForSection />
      <PricingTeaser />
      <HomeFaq />
      <CtaBand showTrialLength showSignOff />
    </main>
  );
}
