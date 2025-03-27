import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType, JSXElementType } from '@/types/components';

type ArticleProps = {
  articleTitle: string;
  content: JSXElementType;
  createdAt: Date;
  locale: LocaleKeyType;
  tocTitle: string;
  updatedAt: Date;
};

type ArticleType = ComponentType<ArticleProps>;

export type { ArticleProps, ArticleType };
