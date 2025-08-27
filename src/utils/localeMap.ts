// src/utils/localeMap.ts
export type GeoCode = string;

const GEO_TO_LANG: Record<string, string> = {
  au: "en-AU",
  ca: "en-CA",
  us: "en-US",
  uk: "en-GB",
  gb: "en-GB",
  nz: "en-NZ",
  en: "en",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
  es: "es-ES",
  pt: "pt-PT",
  br: "pt-BR",
  nl: "nl-NL",
  se: "sv-SE",
  sv: "sv-SE",
  no: "nb-NO",
  dk: "da-DK",
  pl: "pl-PL",
  jp: "ja-JP",
  cn: "zh-CN",
  kr: "ko-KR",
  ru: "ru-RU",
  mx: "es-MX",
  in: "en-IN",
  ch: "de-CH",
  be: "fr-BE",
  gr: "el-GR",
};

const GEO_NAME: Record<string, string> = {
  au: "Australia",
  ca: "Canada",
  us: "United States",
  uk: "United Kingdom",
  gb: "United Kingdom",
  nz: "New Zealand",
  en: "",
  de: "Germany",
  fr: "France",
  it: "Italy",
  es: "Spain",
  pt: "Portugal",
  br: "Brazil",
  nl: "Netherlands",
  se: "Sweden",
  sv: "Sweden",
  no: "Norway",
  dk: "Denmark",
  pl: "Poland",
  jp: "Japan",
  cn: "China",
  kr: "South Korea",
  ru: "Russia",
  mx: "Mexico",
  in: "India",
  ch: "Switzerland",
  be: "Belgium",
  gr: "Greece",
};

const GEO_LANGUAGE_NAME: Record<string, string> = {
  au: "English",
  ca: "English",
  us: "English",
  uk: "English",
  gb: "English",
  nz: "English",
  in: "English",
  en: "English",
  de: "German",
  fr: "French",
  it: "Italian",
  es: "Spanish",
  pt: "Portuguese",
  br: "Portuguese",
  nl: "Dutch",
  se: "Swedish",
  sv: "Swedish",
  no: "Norwegian",
  dk: "Danish",
  pl: "Polish",
  jp: "Japanese",
  cn: "Chinese",
  kr: "Korean",
  ru: "Russian",
  mx: "Spanish",
  ch: "German",
  be: "French",
  gr: "Greek",
};

const DEFAULT_EN_LOCALES = new Set(["au", "ca", "us", "uk", "gb", "in"]);

export function geoToHtmlLang(geo: string): string {
  const g = (geo || "").toLowerCase();
  const v = GEO_TO_LANG[g];
  if (v) return v;
  if (/^[a-z]{2}$/.test(g)) {
    if (DEFAULT_EN_LOCALES.has(g)) return `en-${g.toUpperCase()}`;
    return `${g}-${g.toUpperCase()}`;
  }
  return "en-US";
}

export function geoToOgLocale(geo: string): string {
  return geoToHtmlLang(geo).replace(/-/g, "_");
}

export function getGeoName(geo: string): string {
  const g = (geo || "").toLowerCase();
  return GEO_NAME[g] || "Global";
}

export function getLanguageName(geo: string): string {
  const g = (geo || "").toLowerCase();
  return GEO_LANGUAGE_NAME[g] || "English";
}

export function getProjectGeoForLang(langOrGeo: string): string {
  return getGeoName(langOrGeo);
}

export function getLocaleMeta(geo: string) {
  const htmlLang = geoToHtmlLang(geo);
  const ogLocale = htmlLang.replace(/-/g, "_");
  const languageName = getLanguageName(geo);
  return { htmlLang, ogLocale, languageName };
}

export function allKnownGeos(): string[] {
  return Object.keys(GEO_TO_LANG);
}
