import { isValueInArray } from '@/typeGuards';
import type { LocaleKeyArrayType, LocaleKeyType } from '@/constants/i18n/types';

const getLocale = (
  acceptLanguage: string | null,
  cookieLocale: string | null,
  defaultLocale: LocaleKeyType,
  locales: LocaleKeyArrayType
): LocaleKeyType => {
  if (isValueInArray(cookieLocale, locales)) {
    return cookieLocale;
  }

  const localeFromPrimaryLanguage = acceptLanguage?.split(',')[0]?.split(';')[0]?.trim().split('-')[0];

  if (isValueInArray(localeFromPrimaryLanguage, locales)) {
    return localeFromPrimaryLanguage;
  }

  return defaultLocale;
};

export { getLocale };
