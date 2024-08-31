import type { LocaleKeyType } from '@/constants/i18n/types';

const getDateString = (utcTime: Date, lang: LocaleKeyType): string => {
  const date = new Date(utcTime);
  const currentYear = new Date().getFullYear();
  const year = date.getFullYear();

  if (year < currentYear) {
    return date.toISOString().slice(0, 10);
  }

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' } as const;

  return date.toLocaleDateString(lang, options);
};

export { getDateString };
