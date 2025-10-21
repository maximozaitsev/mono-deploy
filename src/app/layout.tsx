// /src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.scss";
import "../styles/colors.scss";
import "../styles/variables.scss";

import { headers } from "next/headers";
import { getLocaleMeta } from "../utils/localeMap";
import { PROJECT_NAME } from "../config/projectConfig";
import { replaceCurrentYear } from "../utils/yearReplacer";
import * as fonts from "./fonts";
import { defaultLocale, locales } from '@/i18n';

function getBaseUrl(): string | undefined {
  if (process.env.SITE_URL) return `https://${process.env.SITE_URL}`;
  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? undefined;
  return host ? `${proto}://${host}` : undefined;
}

// Упрощенная функция для получения метаданных
async function getDefaultMeta(): Promise<{ title: string; description: string }> {
  return { title: "Parimatch Online", description: "Best online casino experience" };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  const { title, description } = await getDefaultMeta();

  const canonical = baseUrl ? `${baseUrl}/` : "/";

  const alternatesLanguages: Record<string, string> = {};
  for (const locale of locales) {
    const { htmlLang: hreflang } = getLocaleMeta(locale);
    alternatesLanguages[hreflang] = baseUrl
      ? locale === defaultLocale
        ? `${baseUrl}/`
        : `${baseUrl}/${locale}`
      : locale === defaultLocale
      ? "/"
      : `/${locale}`;
  }
  alternatesLanguages["x-default"] = baseUrl ? `${baseUrl}/` : "/";

  const { ogLocale } = getLocaleMeta(defaultLocale);
  const siteName = PROJECT_NAME;
  const ogImage = baseUrl ? `${baseUrl}/og-image.webp` : "/og-image.webp";

  return {
    manifest: "/manifest.json",
    title: replaceCurrentYear(title),
    description: replaceCurrentYear(description),
    alternates: {
      canonical,
      languages: alternatesLanguages,
    },
    openGraph: {
      locale: ogLocale,
      type: "website",
      url: canonical,
      title: replaceCurrentYear(title),
      siteName,
      description: replaceCurrentYear(description),
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: replaceCurrentYear(title),
      description: replaceCurrentYear(description),
      images: [ogImage],
    },
    icons: {
      icon: [
        { url: "/icons/ico-192.png", type: "image/png", sizes: "192x192" },
        { url: "/icons/ico-512.png", type: "image/png", sizes: "512x512" },
        { url: "/icons/ico-114.png", type: "image/png", sizes: "114x114" },
        { url: "/icons/ico-120.png", type: "image/png", sizes: "120x120" },
        { url: "/icons/ico-144.png", type: "image/png", sizes: "144x144" },
        { url: "/icons/ico-152.png", type: "image/png", sizes: "152x152" },
        { url: "/icons/ico-57.png", type: "image/png", sizes: "57x57" },
        { url: "/icons/ico-60.png", type: "image/png", sizes: "60x60" },
        { url: "/icons/ico-72.png", type: "image/png", sizes: "72x72" },
        { url: "/icons/ico-76.png", type: "image/png", sizes: "76x76" },
      ],
      apple: [
        { url: "/icons/ico-57.png", sizes: "57x57" },
        { url: "/icons/ico-60.png", sizes: "60x60" },
        { url: "/icons/ico-72.png", sizes: "72x72" },
        { url: "/icons/ico-76.png", sizes: "76x76" },
        { url: "/icons/ico-114.png", sizes: "114x114" },
        { url: "/icons/ico-120.png", sizes: "120x120" },
        { url: "/icons/ico-144.png", sizes: "144x144" },
        { url: "/icons/ico-152.png", sizes: "152x152" },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { htmlLang } = getLocaleMeta(defaultLocale);
  const fontVars = Object.values(fonts)
    .map((f) => f.variable)
    .join(" ");

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
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
      </head>
      <body className={fontVars}>
        {children}
      </body>
    </html>
  );
}
