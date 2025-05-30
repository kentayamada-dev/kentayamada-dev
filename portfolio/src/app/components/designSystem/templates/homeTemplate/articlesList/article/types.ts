import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type ArticleProps = {
  createdAt: Date;
  description: string;
  locale: LocaleKeyType;
  readArticle: string;
  title: string;
};

type ArticleType = ComponentType<ArticleProps>;

export type { ArticleProps, ArticleType };
