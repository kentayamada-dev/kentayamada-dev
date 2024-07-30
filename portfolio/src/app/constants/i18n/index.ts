import { JapanFlagIcon, UsFlagIcon } from '@/components/icons';
import { getKeysFromObject } from '@/utils';
import en from './dictionaries/en.json';
import ja from './dictionaries/ja.json';
import type { DictionaryType, LocaleKeyType, LocaleType } from './types';

const locales = {
  en: { icon: UsFlagIcon, name: 'English' },
  ja: { icon: JapanFlagIcon, name: '日本語' }
} as const satisfies LocaleType;

const dictionaries = {
  en,
  ja
} as const satisfies Record<string, DictionaryType>;

const defaultLocale: LocaleKeyType = 'en';
const arrayOfLocales = getKeysFromObject(locales);
const localeCookieName = '__Host-LOCALE';

export { arrayOfLocales, defaultLocale, dictionaries, localeCookieName, locales };
