import { Metadata } from "next";
import "./globals.scss";
import "../styles/colors.scss";
import "../styles/variables.scss";
import * as fonts from "./fonts";
import { OffersProvider } from "../contexts/OffersContext";
import { fetchOffers } from "../utils/fetchOffers";

const url = "7bitcasino-wins.com";
const ogTitle = "7Bit Casino Canada Games: Gaming Experience, Live Dealers and Bonuses";
const ogSiteName = "7bitcasino Casino";
const metaDescription = "Explore the gaming opportunities of 7Bit Casino Games. A range of games, live dealers, jackpots. Enjoy your favorite casino games and get a chance to win big";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = Object.values(fonts)
    .map((f) => f.variable)
    .join(" ");
  
  // Загружаем данные offers на сервере
  const offersData = await fetchOffers();

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
        <link rel="apple-touch-icon" href="/icons/ico-192.png" sizes="192x192" />
      </head>
      <body className={fontVars}>
        <OffersProvider initialData={offersData}>
          {children}
        </OffersProvider>
      </body>
    </html>
  );
}
