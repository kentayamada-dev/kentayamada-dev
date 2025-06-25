import { ArticleIcon, EmailIcon, HomeIcon, ProjectIcon, UtilityIcon } from '@/components/icons';
import { dictionaries } from '../i18n';
import type { LocaleKeyType } from '../i18n/types';
import type { NavigationType } from './types';

const X_REAL_IP_HEADER = 'x-real-ip';
const STORYBOOK_URL = 'https://storybook.kentayamada.dev';
const GITHUB_URL = 'https://github.com/kentayamada-dev/kentayamada-dev/tree/main/portfolio';

/* eslint-disable sort-keys*/
const navigationItems = (locale: LocaleKeyType): NavigationType => {
  const { navigation } = dictionaries[locale];

  return {
    home: { href: `/${locale}`, icon: HomeIcon, title: navigation.home },
    articles: { href: `/${locale}/articles`, icon: ArticleIcon, title: navigation.articles },
    utilities: { href: `/${locale}/utilities`, icon: UtilityIcon, title: navigation.utilities },
    projects: { href: `/${locale}/projects`, icon: ProjectIcon, title: navigation.projects },
    contact: { href: `/${locale}/contact`, icon: EmailIcon, title: navigation.contact }
  } as const;
};
/* eslint-enable sort-keys*/

export { GITHUB_URL, STORYBOOK_URL, X_REAL_IP_HEADER, navigationItems };
