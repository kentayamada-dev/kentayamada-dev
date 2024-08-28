import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';
import type { ArticlesResponseType } from '@/types/contentful';

type ArticlesProps = {
  articles: ArticlesResponseType['blogPostCollection']['items'];
  lang: LocaleKeyType;
};

type ArticlesType = ReadonlyComponentType<ArticlesProps>;

export type { ArticlesType };
