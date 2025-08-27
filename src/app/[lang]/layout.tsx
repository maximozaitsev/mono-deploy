// src/app/[lang]/layout.tsx
import type { Metadata, Viewport } from "next";
import path from "node:path";
import fs from "node:fs/promises";
import { headers } from "next/headers";
import { getLocaleMeta } from "@/utils/localeMap";
import { PROJECT_NAME } from "@/config/projectConfig";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  const currentGeo = (params.lang || "").toLowerCase();

  const { languages, defaultLang } = await readManifest();
  const { ogLocale, languageName } = getLocaleMeta(currentGeo);
  const { title, description } = await readContentMeta(currentGeo, baseUrl);

  const isDefault = currentGeo === defaultLang;
  const canonical = baseUrl
    ? isDefault
      ? `${baseUrl}/`
      : `${baseUrl}/${currentGeo}`
    : isDefault
    ? "/"
    : `/${currentGeo}`;

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

  const ogImage = baseUrl ? `${baseUrl}/og-image.webp` : "/og-image.webp";

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
      images: [{ url: ogImage, width: 1200, height: 630, alt: PROJECT_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
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
}) {
  return <>{children}</>;
}
