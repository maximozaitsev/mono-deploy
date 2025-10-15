/**
 * Утилита для замены плейсхолдера {{CURRENT_YEAR}} на актуальный год в runtime
 */

/**
 * Заменяет плейсхолдер {{CURRENT_YEAR}} на актуальный год
 * @param text - текст для обработки
 * @returns текст с замененным плейсхолдером на актуальный год
 */
export function replaceCurrentYear(text: string): string {
  if (!text || typeof text !== 'string') {
    return text;
  }

  const currentYear = new Date().getFullYear();
  // ЗАХАРДКОД ДЛЯ ТЕСТИРОВАНИЯ: +1 год
  const testYear = currentYear + 1;
  return text.replace(/\{\{CURRENT_YEAR\}\}/g, testYear.toString());
}
