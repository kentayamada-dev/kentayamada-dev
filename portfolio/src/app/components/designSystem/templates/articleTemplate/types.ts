import type { ArticlesListProps } from '@/components/designSystem/molecules';
import type { ArticleProps } from './article/types';
import type { ComponentType } from '@/types/components';

type ArticleTemplateProps = ArticleProps &
  ArticlesListProps & {
    articlesListTitle: string;
  };

type ArticleTemplateType = ComponentType<ArticleTemplateProps>;

export type { ArticleTemplateType };
