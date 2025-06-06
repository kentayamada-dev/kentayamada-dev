import type { LocaleKeyType } from '@/constants/i18n/types';

const formatNumber = (value: number, locale: LocaleKeyType): string => {
  return Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
    notation: 'compact'
  }).format(value);
};

export { formatNumber };
