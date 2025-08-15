import { getLocaleMeta } from "./localeMap";
import fs from "node:fs/promises";
import path from "node:path";

type ContentMeta = {
  title: string;
  description: string;
  url: string;
  siteName: string;
};

async function loadContentMeta(lang: string): Promise<ContentMeta> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "content",
    `content.${lang}.json`
  );
  let title = "";
  let description = "";
  try {
    const file = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(file);
    title = json["meta-title"] ?? "";
    description = json["meta-description"] ?? "";
  } catch {
    // fallback to empty strings
  }
  return {
    title,
    description,
    url: process.env.SITE_URL || "",
    siteName: process.env.SITE_NAME || "",
  };
}

export async function generateMetadata(lang: string) {
  const { htmlLang, ogLocale } = getLocaleMeta(lang);
  const { title, description, url, siteName } = await loadContentMeta(lang);
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: ogLocale,
      type: "website",
    },
    icons: {
      icon: "/favicon.ico",
    },
    metadataBase: new URL(url),
    // Optionally, we could add more fields as needed for Next.js Metadata
  };
}
