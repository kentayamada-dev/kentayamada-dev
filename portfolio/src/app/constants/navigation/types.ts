import type { IconType } from '@/types/components';

type NavigationItemType = {
  href: string;
  icon: IconType;
  isHidden: boolean;
  title: string;
};

type NavigationKeyType = 'home' | 'articles' | 'utilities' | 'projects' | 'contact' | 'topics';

type NavigationType = Record<NavigationKeyType, NavigationItemType>;

export type { NavigationItemType, NavigationType };
