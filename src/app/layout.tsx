import { Metadata } from "next";
import "./globals.scss";
import "../styles/colors.scss";
import "../styles/variables.scss";
import * as fonts from "./fonts";

const url = "goodman-casino.net";
const ogTitle = "Goodman Casino online casino review for beginners and experienced players.";
const ogSiteName = "Goodman Casino";
const metaDescription = "To play on the site, register on the gambling platform and get the Goodman Casino bonus. The best choice of entertainment for players is in the Goodman Casino review.";

const locale = "en";
const language = "English";
const ogImage = `https://${url}/og-image.webp`;

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: ogTitle,
  description: metaDescription,
  alternates: {
    canonical: `https://${url}`,
  },
  openGraph: {
    locale: locale,
    type: "website",
    url: `https://${url}`,
    title: ogTitle,
    description: metaDescription,
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
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/block-images/welcome-mobile.webp"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/Inter/Inter-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Roboto/Roboto-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { background: #0a0a0a; font-family: 'Inter', sans-serif; }
            .container { max-width: 1120px; width: 100%; margin: 0 auto; }
            .section { display: flex; flex-direction: column; gap: 48px; align-items: flex-start; width: 100%; margin-bottom: 140px; }
            .h2-heading { color: #ffd700; font-family: 'Roboto', sans-serif; font-size: 56px; font-weight: 700; text-transform: uppercase; }
            .h3-heading { color: #ffffff; font-family: 'Roboto', sans-serif; font-size: 40px; font-weight: 700; text-transform: uppercase; }
            .paragraph-text { color: #ffffff; font-family: 'Inter', sans-serif; font-size: 20px; line-height: 40px; }
            @media (max-width: 768px) {
              .h2-heading { font-size: 32px; }
              .h3-heading { font-size: 24px; }
              .paragraph-text { font-size: 18px; line-height: 32px; }
            }
          `
        }} />

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
