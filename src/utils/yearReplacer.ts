export function replaceCurrentYear(text: string): string {
  if (!text || typeof text !== 'string') {
    return text;
  }

  const currentYear = new Date().getFullYear();
  return text.replace(/\{\{CURRENT_YEAR\}\}/g, currentYear.toString());
}
