// /src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.scss";
import "../styles/colors.scss";
import "../styles/variables.scss";
import fs from "node:fs/promises";
import path from "node:path";
import { getLocaleMeta } from "../utils/localeMap";
import { PROJECT_NAME } from "../config/projectConfig";

export const dynamic = "force-dynamic";
export const revalidate = 0;
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
  const fsJson = await readJSON<{ defaultLang?: string }>(p, {} as any);
  if (fsJson.defaultLang) return fsJson.defaultLang.toLowerCase();
  try {
    const res = await fetch("/content/languages.json", { cache: "no-store" });
    if (res.ok) {
      const j = (await res.json()) as { defaultLang?: string };
      return (j.defaultLang || "au").toLowerCase();
    }
  } catch {}
  return "au";
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
  lang: string
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
  try {
    const res = await fetch(`/content/content.${lang}.json`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = (await res.json()) as Record<string, any>;
      return extractMeta(json);
    }
  } catch {}
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

  const alternatesLanguages: Record<string, string> = {};
  for (const geo of languages) {
    const { htmlLang: hreflang } = getLocaleMeta(geo);
    alternatesLanguages[hreflang] = geo === defaultLang ? "/" : `/${geo}`;
  }
  alternatesLanguages["x-default"] = "/";

  const siteName = PROJECT_NAME;
  const ogImage = "/og-image.webp";

  return {
    manifest: "/manifest.json",
    title,
    description,
    alternates: {
      canonical: "/",
      languages: alternatesLanguages,
    },
    openGraph: {
      locale: ogLocale,
      type: "website",
      url: "/",
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
