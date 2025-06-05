import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type ThemeSwitcherWrapperProps = {
  locale: LocaleKeyType;
};

type ThemeSwitcherWrapperType = ComponentType<ThemeSwitcherWrapperProps>;

export type { ThemeSwitcherWrapperType };
