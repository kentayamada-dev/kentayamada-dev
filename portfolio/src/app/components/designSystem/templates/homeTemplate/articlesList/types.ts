import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type ArticlesListProps = {
  articles: {
    createdAt: Date;
    description: string;
    href: string;
    title: string;
  }[];
  locale: LocaleKeyType;
  readArticle: string;
};

type ArticlesListType = ComponentType<ArticlesListProps>;

export type { ArticlesListProps, ArticlesListType };
