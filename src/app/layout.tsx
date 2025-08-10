import type { Metadata, Viewport } from "next";
import "./globals.scss";
import "../styles/colors.scss";
import "../styles/variables.scss";
import fs from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import { getLocaleMeta } from "../utils/localeMap";
import { PROJECT_NAME } from "../config/projectConfig";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

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

async function readManifest(): Promise<{
  languages: string[];
  defaultLang: string;
}> {
  const p = path.join(process.cwd(), "public", "content", "languages.json");
  const json = await readJSON<{ languages?: string[]; defaultLang?: string }>(
    p,
    {}
  );
  const languages = Array.isArray(json.languages) ? json.languages : [];
  const defaultLang =
    (typeof json.defaultLang === "string" && json.defaultLang) ||
    (languages[0] ?? "au");
  return { languages, defaultLang: defaultLang.toLowerCase() };
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
  const title = json["meta-title"] || json.title || "Title";
  const description =
    json["meta-description"] || json.description || "Description";
  return { title, description };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  const { languages, defaultLang } = await readManifest();
  const { ogLocale, languageName } = getLocaleMeta(defaultLang);
  const { title, description } = await readContentMeta(defaultLang);

  const canon = baseUrl ? `${baseUrl}` : undefined;
  const languagesAlt: Record<string, string> = {};
  for (const geo of languages) {
    const { htmlLang: hreflang } = getLocaleMeta(geo);
    languagesAlt[hreflang] = baseUrl
      ? geo === defaultLang
        ? `${baseUrl}/`
        : `${baseUrl}/${geo}`
      : geo === defaultLang
      ? "/"
      : `/${geo}`;
  }
  languagesAlt["x-default"] = baseUrl ? `${baseUrl}/` : "/";

  const ogImageAbs = baseUrl ? `${baseUrl}/og-image.webp` : "/og-image.webp";

  return {
    manifest: "/manifest.json",
    title,
    description,
    alternates: {
      canonical: canon,
      languages: languagesAlt,
    },
    openGraph: {
      locale: ogLocale,
      type: "website",
      url: canon,
      title,
      siteName: PROJECT_NAME,
      description,
      images: [
        { url: ogImageAbs, width: 1200, height: 630, alt: PROJECT_NAME },
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { defaultLang } = await readManifest();
  const { htmlLang } = getLocaleMeta(defaultLang);

  return (
    <html lang={htmlLang}>
      <body>{children}</body>
    </html>
  );
}
