import type { ComponentType } from '@/types/components';
import type { ArticleProps } from './article/types';

type ArticleTemplateProps = ArticleProps & {
  articles: {
    createdAt: Date;
    description: string;
    slug: string;
    title: string;
  }[];
  articlesHref: string;
  articlesListTitle: string;
};

type ArticleTemplateType = ComponentType<ArticleTemplateProps>;

export type { ArticleTemplateType };
