import type { IconType } from '@/types/components';

type NavigationItemType = {
  href: string;
  icon: IconType;
  title: string;
};

type NavigationKeyType = 'articles' | 'home';

type NavigationType = Record<NavigationKeyType, NavigationItemType>;

export type { NavigationType };
