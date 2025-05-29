import type { IconType } from '@/types/components';

type NavigationItemType = {
  href: string;
  icon: IconType;
  title: string;
};

type NavigationType = Record<'home' | 'articles' | 'utilities' | 'projects' | 'contact', NavigationItemType>;

export type { NavigationType };
