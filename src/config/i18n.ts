import languagesJson from "@/../public/content/languages.json";

export type LangManifest = {
  languages: string[];
  defaultLang: string;
};

function normalize(m: LangManifest): LangManifest {
  const languages = (m.languages || []).map((x) => x.toLowerCase());
  const defaultLang = (m.defaultLang || "en").toLowerCase();
  return { languages, defaultLang };
}

const manifest = normalize(languagesJson as unknown as LangManifest);

export const locales = manifest.languages;
export const defaultLocale = manifest.defaultLang;

export function isSupportedLocale(l: string): boolean {
  const v = (l || "").toLowerCase();
  return locales.includes(v);
}

export function normalizeLocale(l: string): string {
  const v = (l || "").toLowerCase();
  return isSupportedLocale(v) ? v : defaultLocale;
}

export function getManifest(): LangManifest {
  return { languages: locales, defaultLang: defaultLocale };
}


