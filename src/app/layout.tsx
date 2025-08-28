// /src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.scss";
import "../styles/colors.scss";
import "../styles/variables.scss";

import fs from "node:fs/promises";
import path from "node:path";
import { headers, cookies } from "next/headers";
import { getLocaleMeta } from "../utils/localeMap";
import { PROJECT_NAME } from "../config/projectConfig";
import * as fonts from "./fonts";

// мобайл LCP картинка — импортируем, чтобы прелоадить ровно тот же URL (/_next/static/media/...)
import mobileImg from "../../public/block-images/welcome-mobile.webp";

function getBaseUrl(): string | undefined {
  if (process.env.SITE_URL) return `https://${process.env.SITE_URL}`;
  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? undefined;
  return host ? `${proto}://${host}` : undefined;
}

async function readJSON<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function extractMeta(obj: Record<string, any>): {
  title: string;
  description: string;
} {
  const titleKeys = ["meta-title", "metaTitle", "ogTitle", "title"];
  const descKeys = [
    "meta-description",
    "metaDescription",
    "description",
    "metaDesc",
  ];
  let title = "";
  let description = "";
  for (const k of titleKeys) {
    if (typeof obj[k] === "string" && obj[k].trim()) {
      title = obj[k].trim();
      break;
    }
  }
  for (const k of descKeys) {
    if (typeof obj[k] === "string" && obj[k].trim()) {
      description = obj[k].trim();
      break;
    }
  }
  return { title: title || "Title", description: description || "Description" };
}

async function readContentMeta(
  lang: string,
  baseUrl?: string
): Promise<{ title: string; description: string }> {
  const fsPath = path.join(
    process.cwd(),
    "public",
    "content",
    `content.${lang}.json`
  );
  const fsJson = await readJSON<Record<string, any>>(fsPath, {});
  const fromFs = extractMeta(fsJson);
  if (fromFs.title !== "Title" || fromFs.description !== "Description") {
    return fromFs;
  }

  if (baseUrl) {
    try {
      const res = await fetch(`${baseUrl}/content/content.${lang}.json`, {
        cache: "no-store",
      });
      if (res.ok) {
        const json = (await res.json()) as Record<string, any>;
        return extractMeta(json);
      }
    } catch {}
  }

  return { title: "Title", description: "Description" };
}

async function readManifest(): Promise<{
  languages: string[];
  defaultLang: string;
}> {
  const p = path.join(process.cwd(), "public", "content", "languages.json");
  return readJSON<{ languages: string[]; defaultLang: string }>(p, {
    languages: [],
    defaultLang: "au",
  });
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  const { languages, defaultLang } = await readManifest();
  const { title, description } = await readContentMeta(defaultLang, baseUrl);

  const canonical = baseUrl ? `${baseUrl}/` : "/";

  const alternatesLanguages: Record<string, string> = {};
  for (const geo of languages) {
    const { htmlLang: hreflang } = getLocaleMeta(geo);
    alternatesLanguages[hreflang] = baseUrl
      ? geo === defaultLang
        ? `${baseUrl}/`
        : `${baseUrl}/${geo}`
      : geo === defaultLang
      ? "/"
      : `/${geo}`;
  }
  alternatesLanguages["x-default"] = baseUrl ? `${baseUrl}/` : "/";

  const { ogLocale } = getLocaleMeta(defaultLang);
  const siteName = PROJECT_NAME;
  const ogImage = baseUrl ? `${baseUrl}/og-image.webp` : "/og-image.webp";

  return {
    manifest: "/manifest.json",
    title,
    description,
    alternates: { canonical, languages: alternatesLanguages },
    openGraph: {
      locale: ogLocale,
      type: "website",
      url: canonical,
      title,
      siteName,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteName }],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { languages, defaultLang } = await readManifest();
  const cookieLang = cookies().get("lang")?.value?.toLowerCase() || "";
  const geo = languages.includes(cookieLang) ? cookieLang : defaultLang;
  const { htmlLang } = getLocaleMeta(geo);
  const fontVars = Object.values(fonts)
    .map((f) => f.variable)
    .join(" ");

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        {/* сети для внешнего API */}
        <link
          rel="preconnect"
          href="https://api.adkey-seo.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://api.adkey-seo.com" />

        {/* ДЕСКТОПНЫЙ фон: совпадает с CSS background-image в .welcomeBg */}
        <link
          rel="preload"
          as="image"
          href="/block-images/welcome.webp"
          media="(min-width: 769px)"
        />

        {/* МОБИЛЬНЫЙ LCP: прелоадим ТОТ ЖЕ URL, который вернёт <Image unoptimized> */}
        <link
          rel="preload"
          as="image"
          href={mobileImg.src}
          media="(max-width: 768px)"
          fetchPriority="high"
        />

        {/*
          Важно: не добавляем второй preload на /block-images/welcome-mobile.webp
          и НЕ используем `priority` у <Image> в секции — чтобы не дублировать прелоад.
        */}
      </head>
      <body className={fontVars}>{children}</body>
    </html>
  );
}
