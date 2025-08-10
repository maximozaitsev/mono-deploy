import type { Metadata, Viewport } from "next";
import "./globals.scss";
import "../styles/colors.scss";
import "../styles/variables.scss";
import fs from "node:fs/promises";
import path from "node:path";
import { getLocaleMeta } from "../utils/localeMap";

// Генерировать метаданные на каждый запрос (не на билде)
export const dynamic = "force-dynamic";
export const revalidate = 0;
// Явно используем Node.js runtime, чтобы работал fs
export const runtime = "nodejs";

async function readJSON<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function readDefaultLang(): Promise<string> {
  const p = path.join(process.cwd(), "public", "content", "languages.json");
  // 1) пробуем через fs
  const fsJson = await readJSON<{ defaultLang?: string }>(p, {} as any);
  if (fsJson.defaultLang) return fsJson.defaultLang.toLowerCase();

  // 2) fallback: пробуем через fetch (на проде всегда доступно как публичный ассет)
  try {
    const base = process.env.SITE_URL ? `https://${process.env.SITE_URL}` : "";
    if (base) {
      const res = await fetch(`${base}/content/languages.json`, {
        cache: "no-store",
      } as any);
      if (res.ok) {
        const j = (await res.json()) as { defaultLang?: string };
        return (j.defaultLang || "au").toLowerCase();
      }
    }
  } catch {
    // ignore
  }
  return "au";
}

async function readContentMeta(
  lang: string
): Promise<{ title: string; description: string }> {
  const fsPath = path.join(
    process.cwd(),
    "public",
    "content",
    `content.${lang}.json`
  );

  // 1) пробуем через fs
  const fsJson = await readJSON<Record<string, any>>(fsPath, {});
  let title = fsJson["meta-title"] || fsJson.title || "";
  let description = fsJson["meta-description"] || fsJson.description || "";
  if (title || description) {
    return {
      title: title || "Title",
      description: description || "Description",
    };
  }

  // 2) fallback: пробуем через fetch
  try {
    const base = process.env.SITE_URL ? `https://${process.env.SITE_URL}` : "";
    if (base) {
      const res = await fetch(`${base}/content/content.${lang}.json`, {
        cache: "no-store",
      } as any);
      if (res.ok) {
        const json = (await res.json()) as Record<string, any>;
        title = json["meta-title"] || json.title || "Title";
        description =
          json["meta-description"] || json.description || "Description";
        return { title, description };
      }
    }
  } catch {
    // ignore
  }

  // 3) совсем fallback
  return { title: "Title", description: "Description" };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const defaultLang = await readDefaultLang();
  const { ogLocale, htmlLang, languageName } = getLocaleMeta(defaultLang);
  const { title, description } = await readContentMeta(defaultLang);

  const siteUrl = process.env.SITE_URL || "example.com";
  const siteName = process.env.SITE_NAME || "SiteName";
  const ogImage = `https://${siteUrl}/og-image.webp`;

  // languages.json для alternates (hreflang)
  let languages: string[] = [];
  try {
    const p = path.join(process.cwd(), "public", "content", "languages.json");
    const j = await readJSON<{ languages?: string[] }>(p, {});
    languages = Array.isArray(j.languages) ? j.languages : [];
  } catch {
    languages = [];
  }

  // alternates.languages
  const alternatesLanguages: Record<string, string> = {};
  const base = `https://${siteUrl}`;
  for (const geo of languages) {
    const { htmlLang: hreflang } = getLocaleMeta(geo);
    alternatesLanguages[hreflang] =
      geo === defaultLang ? `${base}/` : `${base}/${geo}`;
  }
  alternatesLanguages["x-default"] = `${base}/`;

  return {
    manifest: "/manifest.json",
    title,
    description,
    alternates: {
      canonical: `${base}`,
      languages: alternatesLanguages,
    },
    openGraph: {
      locale: ogLocale,
      type: "website",
      url: `${base}`,
      title,
      siteName,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteName }],
    },
    icons: {
      icon: [
        { url: "/icons/ico-192.png", type: "image/png", sizes: "192x192" },
        { url: "/icons/ico-512.png", type: "image/png", sizes: "512x512" },
        { url: "/icons/ico-100.png", type: "image/png", sizes: "100x100" },
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
        { url: "/icons/ico-180.png", sizes: "180x180" },
      ],
    },
    other: {
      language: languageName,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const defaultLang = await readDefaultLang();
  const { htmlLang } = getLocaleMeta(defaultLang);

  return (
    <html lang={htmlLang}>
      <body>{children}</body>
    </html>
  );
}
