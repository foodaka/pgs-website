import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { FAQS, INSTAGRAM_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const title = "Portugal Golf Society | Lisbon Golf Society for Golfers in Portugal";
// Search snippet: front-loaded and kept near Google's ~160 char display limit.
const description =
  "Portugal Golf Society: the bilingual Lisbon golf society for expats and locals. Rounds, Stableford competitions, an Order of Merit and socials. All handicaps welcome.";
// Longer version for social cards and structured data.
const longDescription =
  "The Portugal Golf Society is a Lisbon-based golf society for golfers living in Portugal, expats and locals alike. Regular society rounds, Stableford competitions, an Order of Merit, society days and clubhouse socials. All handicaps welcome. Established 2026. Join today.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${SITE_NAME}` },
  description,
  applicationName: SITE_NAME,
  keywords: [
    "Portugal Golf Society",
    "golf society Portugal",
    "Portuguese golf society",
    "Lisbon golf society",
    "golf society Lisbon",
    "expat golf society Portugal",
    "golf club Lisbon expats",
    "golf group Lisbon",
    "join a golf society",
    "Stableford competitions Portugal",
    "golf Order of Merit",
    "sociedade de golfe Portugal",
    "grupo de golfe Lisboa",
  ],
  category: "sports",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title,
    description: longDescription,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description: longDescription },
};

export const viewport: Viewport = {
  themeColor: "#003e33",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SportsOrganization", "Organization"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ["PGS", "Portugal Golf Society Lisbon"],
      sameAs: [INSTAGRAM_URL],
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      image: `${SITE_URL}/opengraph-image.png`,
      description: longDescription,
      sport: "Golf",
      knowsLanguage: ["en", "pt"],
      foundingDate: "2026",
      slogan: "Serious about golf. Not too serious about ourselves.",
      areaServed: { "@type": "Country", name: "Portugal" },
      location: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lisbon",
          addressCountry: "PT",
        },
      },
      knowsAbout: [
        "Golf",
        "Golf society",
        "Stableford scoring",
        "Golf competitions",
        "Order of Merit",
        "Golf in Portugal",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
