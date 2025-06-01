import type { ComponentType } from '@/types/components';
import type { ArticleProps } from './article/types';

type ArticleTemplateProps = ArticleProps & {
  articles: {
    createdAt: Date;
    description: string;
    href: string;
    title: string;
  }[];
  articlesListTitle: string;
};

type ArticleTemplateType = ComponentType<ArticleTemplateProps>;

export type { ArticleTemplateType };
