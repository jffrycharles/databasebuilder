import PageHero from "@/components/ui/PageHero";
import { CONTACT } from "@/lib/contact";

export default function ContactHero() {
  return (
    <PageHero
      label="Contact Us"
      title={
        <>
          Your ideas, <span className="text-db-red-hot">our solution.</span>
        </>
      }
      lede={CONTACT.standfirst}
      wave={false}
    />
  );
}
