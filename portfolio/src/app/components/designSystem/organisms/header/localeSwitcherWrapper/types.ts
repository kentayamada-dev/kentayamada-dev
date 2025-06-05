import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type LocaleSwitcherWrapperProps = {
  locale: LocaleKeyType;
};

type LocaleSwitcherWrapperType = ComponentType<LocaleSwitcherWrapperProps>;

export type { LocaleSwitcherWrapperType };
