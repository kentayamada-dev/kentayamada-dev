import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';
import type { ArticlesResponseType } from '@/types/contentful';

type ArticlesListProps = {
  articles: ArticlesResponseType['articleCollection']['items'];
  articlesHref: string;
  lang: LocaleKeyType;
  title: string;
};

type ArticlesListType = ComponentType<ArticlesListProps>;

export type { ArticlesListProps, ArticlesListType };
