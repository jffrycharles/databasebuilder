import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import AppShell from "@/components/animations/AppShell";
import SmoothScroll from "@/components/animations/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { IconSprite } from "@/components/ui/Icon";
import { SITE } from "@/lib/data";

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

const roboto = localFont({
  src: "./fonts/roboto-var.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-roboto",
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
    url: SITE.url,
    siteName: SITE.name,
    title: "DatabaseBuilder — Sales CRM for small and mid-sized businesses",
    description: "Sales software, designed by salespeople. No long-term commitment required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DatabaseBuilder — Sales CRM for small and mid-sized businesses",
    description: "Sales software, designed by salespeople. No long-term commitment required.",
  },
  robots: { index: true, follow: true },
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
    <html lang="en" className={`${anton.variable} ${oswald.variable} ${roboto.variable}`}>
      <body>
        {/* With scripting off the loader can never be dismissed, so hide it. */}
        <noscript>
          <style>{`.db-boot{display:none!important}.db-anim{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <a className="db-skiplink" href="#main">
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
