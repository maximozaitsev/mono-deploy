import { Metadata } from "next";
import "./globals.scss";
import "../styles/colors.scss";
import "../styles/variables.scss";
import { replaceCurrentYear } from "../utils/yearReplacer";
import * as fonts from "./fonts";

const url = "acecasino-online.com";
const ogTitle = "Ace Casino: A Canadian Hub of Entertainment and Wins to Visit in 2025";
const ogSiteName = "Ace Casino";
const metaDescription = "Ace Casino is a licensed gambling hall in Canada. It hosts over 630+ slots and offers 12 poker rooms and 12 VLT slots. Learn how to join this casino in 2025 and what perks can you expect there.";

const locale = "en-CA";
const language = "English";
const ogImage = `https://${url}/og-image.webp`;

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: replaceCurrentYear(ogTitle),
  description: replaceCurrentYear(metaDescription),
  alternates: {
    canonical: `https://${url}`,
  },
  openGraph: {
    locale: locale,
    type: "website",
    url: `https://${url}`,
    title: replaceCurrentYear(ogTitle),
    description: replaceCurrentYear(metaDescription),
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: ogSiteName,
      },
    ],
  },
  icons: {
    icon: "/icons/ico-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = Object.values(fonts)
    .map((f) => f.variable)
    .join(" ");
  return (
    <html lang={locale}>
      <head>
        <meta name="language" content={language} />
        <link
          rel="preconnect"
          href="https://api.adkey-seo.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://api.adkey-seo.com" />
        <link
          rel="preload"
          as="image"
          href="/block-images/welcome.webp"
          media="(min-width: 769px)"
        />
        <link
          rel="preload"
          as="image"
          href="/block-images/welcome-mobile.webp"
          media="(max-width: 768px)"
        />

        <link rel="icon" href="/icons/ico-192.png" />
        <link rel="apple-touch-icon" href="/icons/ico-57.png" sizes="57x57" />
        <link rel="apple-touch-icon" href="/icons/ico-60.png" sizes="60x60" />
        <link rel="apple-touch-icon" href="/icons/ico-72.png" sizes="72x72" />
        <link rel="apple-touch-icon" href="/icons/ico-76.png" sizes="76x76" />
        <link
          rel="apple-touch-icon"
          href="/icons/ico-114.png"
          sizes="114x114"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/ico-120.png"
          sizes="120x120"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/ico-144.png"
          sizes="144x144"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/ico-152.png"
          sizes="152x152"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/ico-180.png"
          sizes="180x180"
        />
        <link
          rel="icon"
          href="/icons/ico-192.png"
          type="image/png"
          sizes="192x192"
        />
      </head>
      <body className={fontVars}>{children}</body>
    </html>
  );
}
