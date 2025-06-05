import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type HomeArticleListProps = {
  articles: {
    createdAt: Date;
    description: string;
    href: string;
    title: string;
  }[];
  locale: LocaleKeyType;
  readArticle: string;
};

type HomeArticleListType = ComponentType<HomeArticleListProps>;

export type { HomeArticleListType };
