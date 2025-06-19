import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type HomeArticleListProps = {
  articles: {
    createdAt: Date;
    href: string;
    subtitle: string;
    title: string;
  }[];
  locale: LocaleKeyType;
  readArticle: string;
};

type HomeArticleListType = ComponentType<HomeArticleListProps>;

export type { HomeArticleListType };
