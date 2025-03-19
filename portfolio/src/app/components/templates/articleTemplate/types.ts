import type { ArticlesListProps } from '@/components/molecules';
import type { ArticleProps } from './article/types';
import type { ComponentType, StrictOmitType } from '@/types/components';

type ArticleTemplateProps = ArticleProps & StrictOmitType<ArticlesListProps, 'title'>;

type ArticleTemplateType = ComponentType<ArticleTemplateProps>;

export type { ArticleTemplateType };
