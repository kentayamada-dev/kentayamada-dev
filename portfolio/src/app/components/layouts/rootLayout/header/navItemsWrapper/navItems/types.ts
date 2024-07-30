import type { LocaleKeyType } from '@/constants/i18n/types';
import type { NavigationItemsType } from '@/constants/navigation/types';
import type { ReadonlyComponentType } from '@/types/components';

type NavItemsProps = {
  items: NavigationItemsType;
  lang: LocaleKeyType;
};

type NavItemsType = ReadonlyComponentType<NavItemsProps>;

export type { NavItemsType };
