import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is defined, fallback to 'en' if not
  const validLocale = locale || 'en';
  
  try {
    return {
      locale: validLocale,
      messages: (await import(`./messages/${validLocale}.json`)).default
    };
  } catch (error) {
    console.error(`Failed to load messages for locale ${validLocale}:`, error);
    // Fallback to English
    return {
      locale: 'en',
      messages: (await import(`./messages/en.json`)).default
    };
  }
});
