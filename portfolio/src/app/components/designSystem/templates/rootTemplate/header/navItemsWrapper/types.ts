import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type NavItemsWrapperProps = {
  locale: LocaleKeyType;
};

type NavItemsWrapperType = ComponentType<NavItemsWrapperProps>;

export type { NavItemsWrapperType };
