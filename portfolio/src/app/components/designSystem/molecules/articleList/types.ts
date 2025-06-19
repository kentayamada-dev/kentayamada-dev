import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type ArticleListProps = {
  articles: {
    createdAt: Date;
    href: string;
    likeCount: number;
    subtitle: string;
    title: string;
    topics: string[];
    viewCount: number;
  }[];
  locale: LocaleKeyType;
};

type ArticleListType = ComponentType<ArticleListProps>;

export type { ArticleListType };
