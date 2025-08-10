// src/app/[lang]/layout.tsx
import type { Metadata, Viewport } from "next";
import path from "node:path";
import fs from "node:fs/promises";
import { getLocaleMeta } from "@/utils/localeMap";
import { PROJECT_URL, PROJECT_NAME } from "@/config/projectConfig";
import "../globals.scss";

type LangManifest = { languages: string[]; defaultLang: string };

async function readJSON<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function readManifest(): Promise<LangManifest> {
  const p = path.join(process.cwd(), "public", "content", "languages.json");
  return readJSON<LangManifest>(p, { languages: [], defaultLang: "au" });
}

async function readContentMeta(
  lang: string
): Promise<{ title: string; description: string }> {
  const p = path.join(
    process.cwd(),
    "public",
    "content",
    `content.${lang}.json`
  );
  const json = await readJSON<Record<string, any>>(p, {});
  const title = json["meta-title"] || json.title || PROJECT_NAME || "Website";
  const description =
    json["meta-description"] || json.description || "Description";
  return { title, description };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const currentGeo = params.lang.toLowerCase();
  const { languages, defaultLang } = await readManifest();
  const { ogLocale, htmlLang, languageName } = getLocaleMeta(currentGeo);
  const { title, description } = await readContentMeta(currentGeo);

  const base = `https://${PROJECT_URL}`;
  const isDefault = currentGeo === defaultLang;
  const canonical = isDefault ? `${base}/` : `${base}/${currentGeo}`;

  const alternatesLanguages: Record<string, string> = {};
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
      canonical,
      languages: alternatesLanguages,
    },
    openGraph: {
      locale: ogLocale,
      type: "website",
      url: canonical,
      title,
      siteName: PROJECT_NAME,
      description,
      images: [
        {
          url: `${base}/og-image.webp`,
          width: 1200,
          height: 630,
          alt: PROJECT_NAME,
        },
      ],
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

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return <>{children}</>;
}
