import {getRequestConfig} from "next-intl/server";
import {locales as _locales, defaultLocale as _defaultLocale} from "@/config/i18n";

export const locales = _locales;
export const defaultLocale = _defaultLocale;

export default getRequestConfig(async ({requestLocale}) => {
  const locale = ((await requestLocale) || defaultLocale).toLowerCase();
  return {locale, messages: {}};
});
