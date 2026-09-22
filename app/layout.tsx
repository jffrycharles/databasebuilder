import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import AppShell from "@/components/animations/AppShell";
import SmoothScroll from "@/components/animations/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { IconSprite } from "@/components/ui/Icon";
import { SITE } from "@/lib/data";
import { CONTACT } from "@/lib/contact";
import { OG_IMAGE, IS_INDEXABLE } from "@/lib/seo";

/* Self-hosted and subset: no third-party request, no layout shift. */
const anton = localFont({
  src: "./fonts/anton-400.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-anton",
  display: "swap",
});

const oswald = localFont({
  src: "./fonts/oswald-var.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-oswald",
  display: "swap",
});

/* Google Sans, the face Adam's comparison chart is set in, so the copy
   around the chart reads in the same voice. Only 400–700 exists; the opsz
   axis swaps in the Text cut below 18px on its own. */
const googleSans = localFont({
  src: "./fonts/google-sans-var.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-google-sans",
  display: "swap",
});

/* Raleway is what databasebuilder.com itself runs on. Carried here for the
   small stuff — eyebrows, metric labels, captions — so the site shares a
   detail with the product's own pages without restyling the headlines. */
const raleway = localFont({
  src: "./fonts/raleway-var.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s — DatabaseBuilder",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "CRM",
    "sales software",
    "click to dial",
    "call recording",
    "sales SMS",
    "small business CRM",
    "affordable CRM",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: "DatabaseBuilder — Sales CRM for small and mid-sized businesses",
    description: "Sales software, designed by salespeople. No long-term commitment required.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "DatabaseBuilder — Sales CRM for small and mid-sized businesses",
    description: "Sales software, designed by salespeople. No long-term commitment required.",
    images: [OG_IMAGE.url],
  },
  /* Flipped by NEXT_PUBLIC_NOINDEX. robots.txt alone only stops a crawl —
     an inbound link can still put a staging URL in the index, and only the
     meta tag keeps it out. */
  robots: IS_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#010409",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${oswald.variable} ${googleSans.variable} ${raleway.variable}`}>
      <body>
        {/* With scripting off the loader can never be dismissed, so hide it. */}
        <noscript>
          <style>{`.db-boot{display:none!important}.db-anim{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        {/* #top is the opening section of every page; #why is homepage-only,
            which left this bypass inert on four of the five routes. */}
        <script
          type="application/ld+json"
          // our own constants — no user input reaches this
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE.url}/#organization`,
                  name: SITE.name,
                  url: SITE.url,
                  logo: `${SITE.url}/og.png`,
                  description: SITE.description,
                  email: CONTACT.email,
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: CONTACT.address.line1,
                    addressLocality: "Chicago",
                    addressRegion: "IL",
                    postalCode: "60659",
                    addressCountry: "US",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE.url}/#website`,
                  url: SITE.url,
                  name: SITE.name,
                  publisher: { "@id": `${SITE.url}/#organization` },
                  inLanguage: "en-US",
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />

        <a className="db-skiplink" href="#top">
          Skip to main content
        </a>
        <IconSprite />

        <AppShell>
          <SmoothScroll />
          <Header />
          {children}
          <Footer />
        </AppShell>
      </body>
    </html>
  );
}
