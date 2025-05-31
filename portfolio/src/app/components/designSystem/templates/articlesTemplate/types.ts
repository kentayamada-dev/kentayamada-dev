import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type ArticlesTemplateProps = {
  articles: {
    createdAt: Date;
    description: string;
    slug: string;
    title: string;
  }[];
  articlesHref: string;
  locale: LocaleKeyType;
  title: string;
};

type ArticlesTemplateType = ComponentType<ArticlesTemplateProps>;

export type { ArticlesTemplateType };
