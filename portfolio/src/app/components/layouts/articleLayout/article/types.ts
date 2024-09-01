import type { LocaleKeyType } from '@/constants/i18n/types';
import type { JSXElementType, ReadonlyComponentType } from '@/types/components';

type ArticleProps = {
  content: JSXElementType;
  lang: LocaleKeyType;
  publishedAt: Date;
  title: string;
};

type ArticleType = ReadonlyComponentType<ArticleProps>;

export type { ArticleProps, ArticleType };
