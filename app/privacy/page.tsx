import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import LegalHero from "@/components/sections/legal/LegalHero";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { PRIVACY, legalHeroProps } from "@/lib/legal";

export const metadata: Metadata = {
  title: PRIVACY.name,
  description: PRIVACY.description,
  alternates: { canonical: PRIVACY.path },
  ...pageMeta({
    title: `${PRIVACY.name} — DatabaseBuilder`,
    description: PRIVACY.description,
    path: PRIVACY.path,
  }),
};

/* Still, like /faq: a policy is read, not browsed, so nothing fades in. */
export default function PrivacyPage() {
  return (
    <main className="db-still">
      <LegalHero {...legalHeroProps(PRIVACY)} />
      <LegalDocument doc={PRIVACY} />
    </main>
  );
}
