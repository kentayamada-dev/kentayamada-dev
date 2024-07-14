import type { NavigationItemsType } from '@/constants/navigation/types';
import type { ReadonlyComponentType } from '@/types/components';

type NavItemsProps = {
  items: NavigationItemsType;
};

type NavItemsType = ReadonlyComponentType<NavItemsProps>;

export type { NavItemsType };
