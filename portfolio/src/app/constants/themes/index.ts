import { ComputerIcon } from '@/components/icons/computerIcon';
import { MoonIcon } from '@/components/icons/moonIcon';
import { SunIcon } from '@/components/icons/sunIcon';
import { defaultLocale, dictionaries } from '@/constants/i18n';
import { getKeysFromObject } from '@/utils/getKeysFromObject';
import type { LocaleKeyType } from '@/constants/i18n/types';
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
