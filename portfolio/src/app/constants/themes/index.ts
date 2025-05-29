import { ComputerIcon, MoonIcon, SunIcon } from '@/components/icons';
import { getKeysFromObject } from '@/utils';
import { defaultLocale, dictionaries } from '../i18n';
import type { LocaleKeyType } from '../i18n/types';
import type { ThemeOptionKeyType, ThemeOptionsType } from './types';

const themeOptions = (locale: LocaleKeyType): ThemeOptionsType => {
  const { theme } = dictionaries[locale];

  return {
    dark: { icon: MoonIcon, name: theme.dark },
    light: { icon: SunIcon, name: theme.light },
    system: { icon: ComputerIcon, name: theme.system }
  } as const;
};

const defaultTheme: ThemeOptionKeyType = 'system';
const arrayOfThemes = getKeysFromObject(themeOptions(defaultLocale));

export { arrayOfThemes, defaultTheme, themeOptions };
