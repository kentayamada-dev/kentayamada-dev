import type { ArticlesListProps } from '@/components/designSystem/molecules';
import type { ComponentType } from '@/types/components';
import type { ArticleProps } from './article/types';

type ArticleTemplateProps = ArticleProps &
  ArticlesListProps & {
    articlesListTitle: string;
  };

type ArticleTemplateType = ComponentType<ArticleTemplateProps>;

export type { ArticleTemplateType };
