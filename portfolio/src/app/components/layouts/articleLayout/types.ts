import type { ArticlesListProps } from '@/components/elements';
import type { ArticleProps } from './article/types';
import type { ReadonlyComponentType, StrictOmitType } from '@/types/components';

type ArticleLayoutProps = ArticleProps & StrictOmitType<ArticlesListProps, 'title'>;

type ArticleLayoutType = ReadonlyComponentType<ArticleLayoutProps>;

export type { ArticleLayoutType };
