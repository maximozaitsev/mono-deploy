import { Metadata } from "next";
import "./globals.scss";
import "../styles/colors.scss";
import "../styles/variables.scss";
import * as fonts from "./fonts";

const url = "highroller-casino-luck.com";
const ogTitle = "HighRoller Casino: Premium Online Gaming Experience!";
const ogSiteName = "HighRoller Casino";
const metaDescription = "Join HighRoller Casino and discover a world of top-tier games, generous bonuses, and unparalleled service. Dive into gaming excellence today!";

const locale = "en-CA";
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
        />
        <link
          rel="preload"
          as="image"
          href="/block-images/welcome-mobile.webp"
          media="(max-width: 768px)"
          fetchPriority="high"
          imagesrcset="/block-images/welcome-mobile.webp 576w"
          imagesizes="(max-width: 768px) 100vw, 576px"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 768px) {
              .WelcomeSection_mobileFigure__GTuqC {
                min-height: 240px;
                aspect-ratio: 3 / 2;
                contain: layout style paint;
              }
              .WelcomeSection_mobileImage__M3QiS {
                will-change: auto;
                transform: translateZ(0);
                backface-visibility: hidden;
                perspective: 1000px;
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
              }
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
      <body className={fontVars}>
        {children}
        {process.env.NODE_ENV === "production" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(){
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    var delay = 'requestIdleCallback' in window ? requestIdleCallback : function(cb){setTimeout(cb, 2000)};
                    delay(function(){
                      navigator.serviceWorker.register('/sw.js');
                    });
                  });
                }
              })();
            `,
            }}
          />
        )}
      </body>
    </html>
  );
}
