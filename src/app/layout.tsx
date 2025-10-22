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
import { replaceCurrentYear } from "../utils/yearReplacer";
import * as fonts from "./fonts";
import LanguageDebugLogger from "@/components/debug/LanguageDebugLogger";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

const contentMetaCache = new Map<string, { title: string; description: string }>();

async function readContentMeta(
  lang: string,
  baseUrl?: string
): Promise<{ title: string; description: string }> {
  const key = `content:${lang}`;
  const cached = contentMetaCache.get(key);
  if (cached) return cached;
  const fsPath = path.join(
    process.cwd(),
    "public",
    "content",
    `content.${lang}.json`
  );
  const fsJson = await readJSON<Record<string, any>>(fsPath, {});
  const fromFs = extractMeta(fsJson);
  if (fromFs.title !== "Title" || fromFs.description !== "Description") {
    contentMetaCache.set(key, fromFs);
    return fromFs;
  }

  if (baseUrl) {
    try {
      const res = await fetch(`${baseUrl}/content/content.${lang}.json`, {
        cache: "no-store",
      });
      if (res.ok) {
        const json = (await res.json()) as Record<string, any>;
        const extracted = extractMeta(json);
        contentMetaCache.set(key, extracted);
        return extracted;
      }
    } catch {}
  }

  return { title: "Title", description: "Description" };
}

let manifestCache: { languages: string[]; defaultLang: string } | null = null;

async function readManifest(): Promise<{
  languages: string[];
  defaultLang: string;
}> {
  if (manifestCache) return manifestCache;
  const p = path.join(process.cwd(), "public", "content", "languages.json");
  const m = await readJSON<{ languages: string[]; defaultLang: string }>(p, {
    languages: [],
    defaultLang: "au",
  });
  manifestCache = m;
  return m;
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

  try {
    console.log("[SSR] root generateMetadata", {
      baseUrl,
      defaultLang,
      languagesCount: languages.length,
      canonical,
      ogLocale,
    });
  } catch {}

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
  const { languages, defaultLang } = await readManifest();
  const h = headers();
  const headerGeo = h.get("x-geo")?.toLowerCase() || "";
  const path = h.get("x-url-pathname") || "/";
  const seg = path.split("/").filter(Boolean)[0]?.toLowerCase() || "";
  const cookieGeo = cookies().get("lang")?.value?.toLowerCase() || "";
  const candidate = headerGeo || seg || cookieGeo;
  const geo = languages.includes(candidate) ? candidate : defaultLang;
  const { htmlLang } = getLocaleMeta(geo);
  const fontVars = Object.values(fonts)
    .map((f) => f.variable)
    .join(" ");

  try {
    const debugHeaders = {
      "x-matched-path": h.get("x-matched-path") || null,
      "rsc-path": h.get("rsc") || null,
      "next-url": h.get("next-url") || null,
    };
    console.log("[SSR] RootLayout", { headerGeo: headerGeo || null, path, seg, selectedGeo: geo, htmlLang, debugHeaders });
  } catch {}

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        {/* SSR debug: selected geo/lang */}
        <meta name="x-debug-geo" content={geo} />
        <meta name="x-debug-lang" content={htmlLang} />
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
        <LanguageDebugLogger />
        {children}
      </body>
    </html>
  );
}
