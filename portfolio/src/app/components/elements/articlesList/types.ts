import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';
import type { ArticlesResponseType } from '@/types/contentful';

type ArticlesListProps = {
  articles: ArticlesResponseType['articleCollection']['items'];
  articlesHref: string;
  lang: LocaleKeyType;
  title: string;
};

type ArticlesListType = ReadonlyComponentType<ArticlesListProps>;

export type { ArticlesListProps, ArticlesListType };
