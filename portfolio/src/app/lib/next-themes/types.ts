import type { Dispatch, SetStateAction } from 'react';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ThemeOptionKeyType, ThemeOptionType, ThemeOptionsType } from '@/constants/themes/types';

type UseNextThemeType = (locale: LocaleKeyType) => {
  options: ThemeOptionsType;
  setTheme: Dispatch<SetStateAction<string>>;
  theme: ThemeOptionType;
  themeKey: ThemeOptionKeyType;
};

export type { UseNextThemeType };
