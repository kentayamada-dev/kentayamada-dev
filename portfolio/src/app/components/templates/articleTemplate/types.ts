import type { ArticlesListProps } from '@/components/molecules';
import type { ArticleProps } from './article/types';
import type { ReadonlyComponentType, StrictOmitType } from '@/types/components';

type ArticleTemplateProps = ArticleProps & StrictOmitType<ArticlesListProps, 'title'>;

type ArticleTemplateType = ReadonlyComponentType<ArticleTemplateProps>;

export type { ArticleTemplateType };
