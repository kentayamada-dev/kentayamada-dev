import type { NavigationItemType } from '@/constants/navigation/types';
import type { ComponentType } from '@/types/components';

type NavItemsProps = {
  currentPathname: string;
  items: Record<string, NavigationItemType>;
  navLabel: string;
};

type NavItemsType = ComponentType<NavItemsProps>;

export type { NavItemsProps, NavItemsType };
