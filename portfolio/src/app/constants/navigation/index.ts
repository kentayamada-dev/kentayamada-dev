import { ArticleIcon, EmailIcon, HomeIcon, ProjectIcon, UtilityIcon } from '@/components/icons';
import { dictionaries } from '../i18n';
import type { LocaleKeyType } from '../i18n/types';
import type { NavigationType } from './types';

const REQUEST_URL_HEADER = 'x-request-url';

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

export { REQUEST_URL_HEADER, navigationItems };
