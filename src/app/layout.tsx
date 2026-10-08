import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const title = "Portugal Golf Society | A community you belong to";
const description =
  "Weekly golf, good company and life in Portugal. Join the Portugal Golf Society: serious about golf, not too serious about ourselves.";

export const metadata: Metadata = {
  metadataBase: new URL("https://portugalgolfstudy.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Portugal Golf Society",
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#003e33",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
