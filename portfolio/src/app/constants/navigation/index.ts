import { ArticleIcon, EmailIcon, HomeIcon, ProjectIcon, UtilityIcon } from '@/components/icons';
import { dictionaries } from '../i18n';
import type { LocaleKeyType } from '../i18n/types';
import type { NavigationType } from './types';

/* eslint-disable sort-keys*/
const navigationItems = (locale: LocaleKeyType): NavigationType => {
  const { navigation } = dictionaries[locale];

  return {
    home: { href: '', icon: HomeIcon, title: navigation.home },
    articles: { href: '/articles', icon: ArticleIcon, title: navigation.articles },
    utilities: { href: '/utilities', icon: UtilityIcon, title: navigation.utilities },
    projects: { href: '/projects', icon: ProjectIcon, title: navigation.projects },
    contact: { href: '/contact', icon: EmailIcon, title: navigation.contact }
  } as const;
};
/* eslint-enable sort-keys*/

export { navigationItems };
