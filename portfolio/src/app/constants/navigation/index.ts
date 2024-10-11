import { ArticleIcon, HomeIcon } from '@/components/icons';
import type { NavigationType } from './types';

/* eslint-disable sort-keys*/
const navigationItems = {
  home: { href: '', icon: HomeIcon, title: 'Home' },
  articles: { href: '/articles', icon: ArticleIcon, title: 'Articles' }
} as const satisfies NavigationType;
/* eslint-enable sort-keys*/

export { navigationItems };
