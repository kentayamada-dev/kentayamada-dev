import { JapanFlagIcon, UsFlagIcon } from '@/components/icons';
import { getKeysFromObject } from '@/utils';
import type { LocaleKeyType, LocaleType } from './types';
import type { i18nRouter } from 'next-i18n-router';

const locales = {
  en: { icon: UsFlagIcon, name: 'English' },
  ja: { icon: JapanFlagIcon, name: '日本語' }
} as const satisfies LocaleType;

const defaultLocale: LocaleKeyType = 'en';
const arrayOfLocales = getKeysFromObject(locales);
const localeCookie = 'NEXT_LOCALE';

const i18nConfig: Parameters<typeof i18nRouter>[1] = {
  defaultLocale,
  localeCookie,
  locales: arrayOfLocales
} as const;

export { arrayOfLocales, defaultLocale, i18nConfig, localeCookie, locales };
