import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType, JSXElementType } from '@/types/components';

type ArticleProps = {
  content: JSXElementType;
  lang: LocaleKeyType;
  publishedAt: Date;
  title: string;
};

type ArticleType = ComponentType<ArticleProps>;

export type { ArticleProps, ArticleType };
