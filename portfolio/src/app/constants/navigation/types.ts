import type { IconType } from '@/types/components';

type NavigationItemType = {
  href: string;
  icon: IconType;
  title: string;
};

type NavigationItemsType = Readonly<NavigationItemType>[];

export type { NavigationItemsType };
