import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type ArticlesTemplateProps = {
  articles: {
    createdAt: Date;
    description: string;
    href: string;
    title: string;
    topics: string[];
    views: number;
  }[];
  locale: LocaleKeyType;
  title: string;
};

type ArticlesTemplateType = ComponentType<ArticlesTemplateProps>;

export type { ArticlesTemplateType };
