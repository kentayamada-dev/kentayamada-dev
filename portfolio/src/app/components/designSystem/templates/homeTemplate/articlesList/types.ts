import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType, ConditionalPickType } from '@/types/components';
import type { ArticleProps } from './article/types';

type ArticlesListProps = ConditionalPickType<ArticleProps, 'readArticle'> & {
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
