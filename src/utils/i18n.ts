// src/utils/i18n.ts
import { getLocaleMeta } from "./localeMap";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import staticTranslations from "../../public/content/static.json";
import languagesJson from "../../public/content/languages.json";
import { STATIC_KEYS, StaticDict } from "@/types/static";

export type LangManifest = {
  languages: string[];
  defaultLang: string;
};

function normalizeManifest(m: LangManifest): LangManifest {
  const languages = (m.languages || []).map((x) => x.toLowerCase());
  const defaultLang = (m.defaultLang || "en").toLowerCase();
  return { languages, defaultLang };
}

type RawStaticMap = Record<string, Record<string, string>>;
const __manifest = normalizeManifest(languagesJson as unknown as LangManifest);
const __ST = staticTranslations as unknown as RawStaticMap;

export const LANG_STORAGE_KEY = "mm:lang";

export function getStoredLang(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(LANG_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setActiveLang(lang: string, manifest: LangManifest): string {
  const { languages, defaultLang } = normalizeManifest(manifest);
  const candidate = (lang || "").toLowerCase();
  const finalLang = languages.includes(candidate) ? candidate : defaultLang;

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, finalLang);
    } catch {}
    try {
      window.dispatchEvent(
        new CustomEvent("monomat:langchange", { detail: { lang: finalLang } })
      );
    } catch {}
  }

  applyLocaleToDOM(finalLang);
  return finalLang;
}

export function getActiveLang(
  manifest: LangManifest,
  pathname?: string
): string {
  const normalized = normalizeManifest(manifest);
  const fromPath = pathname ? getLangFromPath(pathname, normalized) : undefined;

  if (typeof window !== "undefined") {
    const stored = getStoredLang();
    if (stored && normalized.languages.includes(stored)) {
      return stored;
    }
    const currentPath = pathname || window.location.pathname;
    return getLangFromPath(currentPath, normalized);
  }

  return fromPath || normalized.defaultLang;
}

export function initLocale(manifest: LangManifest, pathname?: string): string {
  const lang = getActiveLang(manifest, pathname);
  applyLocaleToDOM(lang);
  return lang;
}

export function getLangFromPath(
  pathname: string,
  manifest: LangManifest
): string {
  const { languages, defaultLang } = normalizeManifest(manifest);
  const first = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  if (first && languages.includes(first) && first !== defaultLang) {
    return first;
  }
  return defaultLang;
}

export function buildUrlForLang(lang: string, manifest: LangManifest): string {
  const { defaultLang } = normalizeManifest(manifest);
  const l = (lang || "").toLowerCase();
  return l === defaultLang ? "/" : `/${l}/`;
}

export function resolveCurrentLangFromPath(
  pathname: string,
  manifest: LangManifest = __manifest
): string {
  return getLangFromPath(pathname, manifest);
}

export async function fetchLangManifest(): Promise<LangManifest> {
  if (typeof window === "undefined") {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const manifestPath = path.join(
      process.cwd(),
      "public",
      "content",
      "languages.json"
    );
    const raw = await fs.readFile(manifestPath, "utf-8");
    const parsed = JSON.parse(raw) as LangManifest;
    const manifest = normalizeManifest(parsed);
    if (
      !manifest.languages.length ||
      typeof manifest.defaultLang !== "string" ||
      !manifest.languages.includes(manifest.defaultLang)
    ) {
      throw new Error("Invalid languages.json");
    }
    return manifest;
  }
  const res = await fetch("/content/languages.json", { cache: "no-cache" });
  if (!res.ok) throw new Error("languages.json not found");
  const parsed = (await res.json()) as LangManifest;
  const manifest = normalizeManifest(parsed);
  if (
    !manifest.languages.length ||
    typeof manifest.defaultLang !== "string" ||
    !manifest.languages.includes(manifest.defaultLang)
  ) {
    throw new Error("Invalid languages.json");
  }
  return manifest;
}

export async function fetchContent(lang: string) {
  const l = (lang || "").toLowerCase();
  if (typeof window === "undefined") {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const publicDir = path.join(process.cwd(), "public", "content");
    const srcDir = path.join(process.cwd(), "src", "content");
    const candidates = [
      path.join(publicDir, `content.${l}.json`),
      path.join(publicDir, "content.json"),
      path.join(srcDir, `content.${l}.json`),
      path.join(srcDir, "content.json"),
    ];
    for (const p of candidates) {
      try {
        const raw = await fs.readFile(p, "utf-8");
        return JSON.parse(raw);
      } catch {}
    }
    throw new Error(`content JSON not found for lang: ${l}`);
  }
  const res = await fetch(`/content/content.${l}.json`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error(`content.${l}.json not found`);
  return res.json();
}

// Нормализуем сырые переводы к строгому словарю StaticDict:
// - если каких-то ключей нет — подставляем пустую строку (или можно дефолт из defaultLang)
function coerceToStaticDict(
  raw: Record<string, string> | undefined,
  fallback: Record<string, string>
): StaticDict {
  const dict: Partial<StaticDict> = {};
  for (const key of STATIC_KEYS) {
    dict[key] = (raw && raw[key]) ?? fallback[key] ?? "";
  }
  return dict as StaticDict;
}

export function getStaticTranslations(
  langOrPath?: string,
  manifest: LangManifest = __manifest
): { t: StaticDict; currentLang: string; manifest: LangManifest } {
  const { languages, defaultLang } = normalizeManifest(manifest);
  let currentLang = defaultLang;

  if (langOrPath) {
    if (langOrPath.includes("/")) {
      currentLang = getLangFromPath(langOrPath, manifest);
    } else {
      const candidate = langOrPath.toLowerCase();
      currentLang = languages.includes(candidate) ? candidate : defaultLang;
    }
  } else if (typeof window !== "undefined") {
    currentLang = getLangFromPath(window.location.pathname, manifest);
  }

  const rawDefault = __ST[defaultLang] || {};
  const rawCurrent = __ST[currentLang] || {};
  const t = coerceToStaticDict(rawCurrent, rawDefault);
  return { t, currentLang, manifest: { languages, defaultLang } };
}

export function useStaticT() {
  const pathname = usePathname();
  const value = useMemo(() => {
    return getStaticTranslations(pathname);
  }, [pathname]);
  return value;
}

export function applyLocaleToDOM(langOrGeo: string) {
  if (typeof document === "undefined") return;
  const { htmlLang, ogLocale, languageName } = getLocaleMeta(
    (langOrGeo || "").toLowerCase()
  );

  document.documentElement.setAttribute("lang", htmlLang);

  let metaOg = document.querySelector('meta[property="og:locale"]');
  if (!metaOg) {
    metaOg = document.createElement("meta");
    metaOg.setAttribute("property", "og:locale");
    document.head.appendChild(metaOg);
  }
  metaOg.setAttribute("content", ogLocale);

  let metaLanguage = document.querySelector('meta[name="language"]');
  if (!metaLanguage) {
    metaLanguage = document.createElement("meta");
    metaLanguage.setAttribute("name", "language");
    document.head.appendChild(metaLanguage);
  }
  metaLanguage.setAttribute("content", languageName);
}
