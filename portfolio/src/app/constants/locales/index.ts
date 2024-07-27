import { JapanFlagIcon, UsFlagIcon } from '@/components/icons';
import { getKeysFromObject } from '@/utils';
import type { LocaleKeyType, LocaleType } from './types';

const locales = {
  en: { icon: UsFlagIcon, name: 'English' },
  ja: { icon: JapanFlagIcon, name: '日本語' }
} as const satisfies LocaleType;

const defaultLocale: LocaleKeyType = 'en';
const arrayOfLocales = getKeysFromObject(locales);
const localeCookie = '__Host-LOCALE';

export { arrayOfLocales, defaultLocale, localeCookie, locales };
