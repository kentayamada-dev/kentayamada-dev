import type { ThemeOptionsType } from '@/constants/themes/types';
import type { ReadonlyComponentType, StateSetterType } from '@/types/components';

type ThemeSwitchProps = {
  currentThemeKey: string | undefined;
  handleTheme: StateSetterType<string>;
  isMounted: boolean;
  items: ThemeOptionsType;
};

type ThemeSwitchType = ReadonlyComponentType<ThemeSwitchProps>;

export type { ThemeSwitchType };
