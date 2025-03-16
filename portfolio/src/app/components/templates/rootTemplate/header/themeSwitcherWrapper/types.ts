import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';

type ThemeSwitcherWrapperProps = {
  lang: LocaleKeyType;
};

type ThemeSwitcherWrapperType = ReadonlyComponentType<ThemeSwitcherWrapperProps>;

export type { ThemeSwitcherWrapperType };
