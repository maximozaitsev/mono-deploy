// /src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.scss";
import "../styles/colors.scss";
import "../styles/variables.scss";
import fs from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import { getLocaleMeta } from "../utils/localeMap";
import { PROJECT_NAME, PROJECT_URL } from "../config/projectConfig";
// рядом с остальными импортами

// Генерация на каждый запрос (чтобы на проде мета не кэшировалась)
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

// Базовый URL (приоритет: PROJECT_URL → SITE_URL → заголовки запроса)
function getBaseUrl(): string {
  if (PROJECT_URL) return `https://${PROJECT_URL}`;
  if (process.env.SITE_URL) return `https://${process.env.SITE_URL}`;
  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

async function readJSON<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function readDefaultLang(baseUrl: string): Promise<string> {
  // 1) через fs (dev/standalone на проде)
  const p = path.join(process.cwd(), "public", "content", "languages.json");
  const fsJson = await readJSON<{ defaultLang?: string }>(p, {} as any);
  if (fsJson.defaultLang) return fsJson.defaultLang.toLowerCase();

  // 2) фолбэк для edge/верцел
  try {
    const res = await fetch(`${baseUrl}/content/languages.json`, {
      cache: "no-store",
    });
    if (res.ok) {
      const j = (await res.json()) as { defaultLang?: string };
      return (j.defaultLang || "au").toLowerCase();
    }
  } catch {
    // ignore
  }
  return "au";
}

async function readContentMeta(
  baseUrl: string,
  lang: string
): Promise<{ title: string; description: string }> {
  // 1) через fs
  const fsPath = path.join(
    process.cwd(),
    "public",
    "content",
    `content.${lang}.json`
  );
  const fsJson = await readJSON<Record<string, any>>(fsPath, {});
  let title = fsJson["meta-title"] || fsJson.title || "";
  let description = fsJson["meta-description"] || fsJson.description || "";
  if (title || description) {
    return {
      title: title || "Title",
      description: description || "Description",
    };
  }

  // 2) фолбэк fetch
  try {
    const res = await fetch(`${baseUrl}/content/content.${lang}.json`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = (await res.json()) as Record<string, any>;
      title = json["meta-title"] || json.title || "Title";
      description =
        json["meta-description"] || json.description || "Description";
      return { title, description };
    }
  } catch {
    // ignore
  }

  return { title: "Title", description: "Description" };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  const defaultLang = await readDefaultLang(baseUrl);
  const { ogLocale, htmlLang, languageName } = getLocaleMeta(defaultLang);
  const { title, description } = await readContentMeta(baseUrl, defaultLang);

  // alternates.languages из languages.json (fs → fetch фолбэк)
  let languages: string[] = [];
  const manifestPath = path.join(
    process.cwd(),
    "public",
    "content",
    "languages.json"
  );
  const localManifest = await readJSON<{ languages?: string[] }>(
    manifestPath,
    {}
  );
  languages = Array.isArray(localManifest.languages)
    ? localManifest.languages
    : [];
  if (languages.length === 0) {
    try {
      const res = await fetch(`${baseUrl}/content/languages.json`, {
        cache: "no-store",
      });
      if (res.ok) {
        const j = (await res.json()) as { languages?: string[] };
        languages = Array.isArray(j.languages) ? j.languages : [];
      }
    } catch {
      // ignore
    }
  }

  const alternatesLanguages: Record<string, string> = {};
  for (const geo of languages) {
    const { htmlLang: hreflang } = getLocaleMeta(geo);
    alternatesLanguages[hreflang] =
      geo === defaultLang ? `${baseUrl}/` : `${baseUrl}/${geo}`;
  }
  alternatesLanguages["x-default"] = `${baseUrl}/`;

  const siteName = PROJECT_NAME;
  const ogImage = `${baseUrl}/og-image.webp`;

  return {
    manifest: "/manifest.json",
    title,
    description,
    alternates: {
      canonical: `${baseUrl}`,
      languages: alternatesLanguages,
    },
    openGraph: {
      locale: ogLocale,
      type: "website",
      url: `${baseUrl}`,
      title,
      siteName,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    // все иконки, как просил
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
      // человекочитаемое имя языка в отдельном мета-теге
      language: languageName,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const baseUrl = getBaseUrl();
  const defaultLang = await readDefaultLang(baseUrl);
  const { htmlLang } = getLocaleMeta(defaultLang);

  return (
    <html lang={htmlLang}>
      <body>{children}</body>
    </html>
  );
}
