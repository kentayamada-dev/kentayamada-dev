import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';

type ArticleProps = {
  content: string;
  lang: LocaleKeyType;
  publishedAt: string;
  title: string;
};

type ArticleType = ReadonlyComponentType<ArticleProps>;

export type { ArticleType };
