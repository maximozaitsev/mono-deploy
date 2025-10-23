import {getRequestConfig} from "next-intl/server";
import { locales as _locales, defaultLocale as _defaultLocale } from "./config/i18n";

export const locales = _locales;
export const defaultLocale = _defaultLocale;
export const localePrefix = "as-needed" as const;

export default getRequestConfig(async ({requestLocale}) => {
  const l = ((await requestLocale) || defaultLocale).toLowerCase();
  // We don't use next-intl's messages mechanism; components read translations from static.json manually where needed.
  return {locale: l, messages: {}};
});


