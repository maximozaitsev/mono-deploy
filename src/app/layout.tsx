import { Metadata } from "next";
import "./globals.scss";
import "../styles/colors.scss";
import "../styles/variables.scss";
import "../styles/critical.css";
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
        <style dangerouslySetInnerHTML={{
          __html: `
            *{box-sizing:border-box}
            body{margin:0;font-family:Inter,system-ui,-apple-system,sans-serif}
            .welcomeSection{background:#1e1e20;margin-bottom:140px;width:100%}
            .mobileFigure{display:none;margin:0}
            .mobileImage{display:inline-block;width:100vw;max-width:576px;height:auto;object-fit:cover;object-position:center}
            .welcomeBg{display:flex;justify-content:center;width:100%;background-image:url("/block-images/welcome.webp");background-repeat:no-repeat;background-position:right 110px center;max-width:90rem;margin:0 auto;height:540px}
            .welcomeContent{display:flex;flex-direction:column;gap:3rem;position:relative;z-index:1;max-width:72.5rem}
            .welcomeText{display:flex;flex-direction:column;align-items:flex-start;gap:48px;width:410px;max-width:50%}
            .welcomeText h2{font-family:Roboto,sans-serif;color:#fff;font-size:32px;font-weight:900;line-height:normal;text-transform:uppercase;margin:0}
            .bonusText{display:none}
            @media (max-width:768px){
              .welcomeSection{margin-bottom:62px;gap:20px}
              .mobileFigure{display:block;width:100%;text-align:center}
              .welcomeBg{height:auto;justify-content:flex-end;background-image:none;background-size:auto;background-position:initial;margin:0 auto 24px auto}
              .welcomeContent button{align-self:center;max-height:77px}
              .welcomeText{width:100%;max-width:100%;gap:24px;align-items:center;text-align:center}
              .welcomeText h2{font-size:24px}
              .bonusText{display:block}
              .offerText{display:none}
            }
            @media (max-width:380px){
              .welcomeText{gap:20px}
              .welcomeText h2{font-size:20px}
            }
          `
        }} />
        <link
          rel="preconnect"
          href="https://api.adkey-seo.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://api.adkey-seo.com" />
        <link
          rel="preload"
          as="image"
          href="/block-images/welcome-mobile.webp"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/block-images/welcome.webp"
          media="(min-width: 769px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/fonts/Inter/Inter-VAR.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Roboto/Roboto-900.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Roboto/Roboto-500.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
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
