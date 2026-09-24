import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import LegalHero from "@/components/sections/legal/LegalHero";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { TERMS, legalHeroProps } from "@/lib/legal";

export const metadata: Metadata = {
  title: TERMS.name,
  description: TERMS.description,
  alternates: { canonical: TERMS.path },
  ...pageMeta({
    title: `${TERMS.name} — DatabaseBuilder`,
    description: TERMS.description,
    path: TERMS.path,
  }),
};

/* Still, like /faq: terms are read, not browsed, so nothing fades in. */
export default function TermsPage() {
  return (
    <main className="db-still">
      <LegalHero {...legalHeroProps(TERMS)} />
      <LegalDocument doc={TERMS} />
    </main>
  );
}
