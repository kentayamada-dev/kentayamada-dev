import type { LocaleKeyType } from '@/constants/i18n/types';

const getDateString = (utcTime: Date, locale: LocaleKeyType): string => {
  const date = new Date(utcTime);
  const currentYear = new Date().getFullYear();
  const year = date.getFullYear();

  if (year === currentYear) {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' } as const;

    return date.toLocaleDateString(locale, options);
  }

  if (locale === 'ja') {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}年${month}月${day}日`;
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };

  return date.toLocaleDateString(locale, options);
};

export { getDateString };
