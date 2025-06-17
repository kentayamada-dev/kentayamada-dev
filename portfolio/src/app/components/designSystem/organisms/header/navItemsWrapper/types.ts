import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType, ConditionalPickType } from '@/types/components';
import type { NavItemsProps } from './navItems/types';

type NavItemsWrapperProps = ConditionalPickType<NavItemsProps, 'navLabel'> & {
  locale: LocaleKeyType;
};

type NavItemsWrapperType = ComponentType<NavItemsWrapperProps>;

export type { NavItemsWrapperType };
