import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type ThemeSwitcherWrapperProps = {
  lang: LocaleKeyType;
};

type ThemeSwitcherWrapperType = ComponentType<ThemeSwitcherWrapperProps>;

export type { ThemeSwitcherWrapperType };
