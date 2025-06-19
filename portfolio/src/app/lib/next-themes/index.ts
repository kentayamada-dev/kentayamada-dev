import { useTheme } from 'next-themes';
import { defaultTheme, themeOptions } from '@/constants/themes';
import { isDefined } from '@/typeGuards';
import type { ThemeOptionKeyType, ThemeOptionsType } from '@/constants/themes/types';
import type { UseNextThemeType } from './types';

const isThemeKey = (key: string | undefined, options: ThemeOptionsType): key is ThemeOptionKeyType => {
  return isDefined(key) && key in options;
};

export const useNextTheme: UseNextThemeType = (locale) => {
  const { setTheme, theme: rawTheme } = useTheme();
  const options = themeOptions(locale);
  const themeKey = isThemeKey(rawTheme, options) && rawTheme in options ? rawTheme : defaultTheme;
  const theme = options[themeKey];

  return { options, setTheme, theme, themeKey };
};
