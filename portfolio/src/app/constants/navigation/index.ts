import { ArticleIcon, HomeIcon, ProjectIcon, UtilityIcon } from '@/components/icons';
import type { NavigationType } from './types';

/* eslint-disable sort-keys*/
const navigationItems = {
  home: { href: '', icon: HomeIcon, title: 'Home' },
  articles: { href: '/articles', icon: ArticleIcon, title: 'Articles' },
  utilities: { href: '/utilities', icon: UtilityIcon, title: 'Utilities' },
  projects: { href: '/projects', icon: ProjectIcon, title: 'Projects' }
} as const satisfies NavigationType;
/* eslint-enable sort-keys*/

export { navigationItems };
