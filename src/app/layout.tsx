import { Metadata } from "next";

const url = "https://skycity-adelaide.com";
const ogTitle =
  "Skycity Adelaide Casino Australia: A Review of the Popular Casino";
const ogSiteName = "Skycity Adelaide Casino";
const metaDescription =
  "Skycity Adelaide Casino Australia: what you need to know about the popular gambling establishment. Range of gambling games, bonuses and promotions, payment methods and many other useful information. Find out about it first";

const locale = "en-AU";
const ogImage = `${url}/og-image.webp`;

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: ogTitle,
  description: metaDescription,
  openGraph: {
    locale: locale,
    type: "website",
    url: url,
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
  return (
    <html lang={locale}>
      <head>
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
      <body>{children}</body>
    </html>
  );
}
