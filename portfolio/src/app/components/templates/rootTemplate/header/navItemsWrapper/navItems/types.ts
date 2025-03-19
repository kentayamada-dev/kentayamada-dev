import type { LocaleKeyType } from '@/constants/i18n/types';
import type { NavigationType } from '@/constants/navigation/types';
import type { ComponentType } from '@/types/components';

type NavItemsProps = {
  currentPathname: string;
  items: NavigationType;
  lang: LocaleKeyType;
};

type NavItemsType = ComponentType<NavItemsProps>;

export type { NavItemsType };
