import type { NavigationType } from '@/constants/navigation/types';
import type { ComponentType } from '@/types/components';

type NavItemsProps = {
  currentPathname: string;
  items: NavigationType;
  navLabel: string;
};

type NavItemsType = ComponentType<NavItemsProps>;

export type { NavItemsProps, NavItemsType };
