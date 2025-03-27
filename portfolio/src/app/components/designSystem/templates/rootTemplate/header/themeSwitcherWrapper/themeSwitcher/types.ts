import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ThemeOptionsType } from '@/constants/themes/types';
import type { ComponentType, StateSetterType } from '@/types/components';

type ThemeSwitcherProps = {
  currentThemeKey: string | undefined;
  handleTheme: StateSetterType<string>;
  isMounted: boolean;
  locale: LocaleKeyType;
  themes: ThemeOptionsType;
};

type ThemeSwitcherType = ComponentType<ThemeSwitcherProps>;

export type { ThemeSwitcherType };
