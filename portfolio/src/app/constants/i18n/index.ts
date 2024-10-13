import { JapanFlagIcon, UsFlagIcon } from '@/components/icons';
import { getKeysFromObject } from '@/utils';
import { env } from '../env';
import en from './dictionaries/en.json';
import ja from './dictionaries/ja.json';
import type { DictionariesType, LocaleKeyType, LocaleType } from './types';

const locales = {
  en: { icon: UsFlagIcon, name: 'English' },
  ja: { icon: JapanFlagIcon, name: '日本語' }
} as const satisfies LocaleType;

const dictionaries = {
  en,
  ja
} as const satisfies DictionariesType;

const defaultLocale: LocaleKeyType = 'en';
const arrayOfLocales = getKeysFromObject(locales);
const localeCookieName = `${env.IS_VERCEL_ENV ? '__Host-' : ''}locale`;

export { arrayOfLocales, defaultLocale, dictionaries, localeCookieName, locales };
