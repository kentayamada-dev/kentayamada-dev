import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type ArticlesListProps = {
  articles: {
    createdAt: Date;
    description: string;
    slug: string;
    title: string;
  }[];
  articlesHref: string;
  locale: LocaleKeyType;
};

type ArticlesListType = ComponentType<ArticlesListProps>;

export type { ArticlesListProps, ArticlesListType };
