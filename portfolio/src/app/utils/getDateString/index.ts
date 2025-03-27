import type { LocaleKeyType } from '@/constants/i18n/types';

const getDateString = (utcTime: Date, locale: LocaleKeyType): string => {
  const date = new Date(utcTime);
  const currentYear = new Date().getFullYear();
  const year = date.getFullYear();

  if (year < currentYear) {
    return date.toISOString().split('T')[0] ?? '';
  }

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' } as const;

  return date.toLocaleDateString(locale, options);
};

export { getDateString };
