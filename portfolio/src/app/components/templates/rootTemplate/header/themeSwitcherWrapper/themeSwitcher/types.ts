import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ThemeOptionsType } from '@/constants/themes/types';
import type { ReadonlyComponentType, StateSetterType } from '@/types/components';

type ThemeSwitcherProps = {
  currentThemeKey: string | undefined;
  handleTheme: StateSetterType<string>;
  isMounted: boolean;
  items: ThemeOptionsType;
  lang: LocaleKeyType;
};

type ThemeSwitcherType = ReadonlyComponentType<ThemeSwitcherProps>;

export type { ThemeSwitcherType };
