import type { IconType } from '@/types/components';

type NavigationItemType = {
  href: string;
  icon: IconType;
  title: string;
};

type NavigationType = Record<string, NavigationItemType>;

export type { NavigationType };
