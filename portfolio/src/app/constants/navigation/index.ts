import { HomeIcon, MoonIcon } from '@/components/icons';
import type { NavigationType } from './types';

const navigationItems = {
  articles: { href: '/articles', icon: MoonIcon, title: 'Articles' },
  home: { href: '', icon: HomeIcon, title: 'Home' }
} as const satisfies NavigationType;

export { navigationItems };
