import { Metadata } from "next";

const url = "levelupcasino-online.com";
const ogTitle =
  "Level Up Casino Australia – Your Ultimate Online Gaming Destination";
const ogSiteName = "Level Up Casino";
const metaDescription =
  "Level Up Casino Australia delivers an exceptional gaming experience with a vast selection of pokies, table games, and live casino options. Enjoy generous bonuses, secure transactions, and fast payouts. Join now and start your winning journey today!";

const locale = "en-AU";
const language = "English";
const ogImage = `https://${url}/og-image.webp`;

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: ogTitle,
  description: metaDescription,
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
    icon: "/icons/xxxhdpi.png",
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
        <meta name="language" content={language} />
        <link rel="icon" href="/icons/xxxhdpi.png" />
        <link rel="apple-touch-icon" href="/icons/Icon.png" sizes="57x57" />
        <link
          rel="apple-touch-icon"
          href="/icons/Icon-Notification@3x.png"
          sizes="60x60"
        />
        <link rel="apple-touch-icon" href="/icons/Icon-72.png" sizes="72x72" />
        <link rel="apple-touch-icon" href="/icons/Icon-76.png" sizes="76x76" />
        <link
          rel="apple-touch-icon"
          href="/icons/Icon@2x.png"
          sizes="114x114"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/Icon-60@2x.png"
          sizes="120x120"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/Icon-72@2x.png"
          sizes="144x144"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/Icon-76@2x.png"
          sizes="152x152"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/Icon-60@3x.png"
          sizes="180x180"
        />
        <link
          rel="icon"
          href="/icons/xxxhdpi.png"
          type="image/png"
          sizes="192x192"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
