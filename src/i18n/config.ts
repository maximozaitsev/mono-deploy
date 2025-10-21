// Поддерживаемые локали
export const locales = ['en', 'de', 'es', 'fr', 'it'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];
