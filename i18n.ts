import {locales as _locales, defaultLocale as _defaultLocale} from "./src/config/i18n";
import {getRequestConfig} from "next-intl/server";

export const locales = _locales;
export const defaultLocale = _defaultLocale;
export const localePrefix = "as-needed" as const;

export default getRequestConfig(async ({requestLocale}) => {
  const locale = ((await requestLocale) || defaultLocale).toLowerCase();
  return {locale, messages: {}};
});
