import type { ArticlesProps } from './articles/types';
import type { ReadonlyComponentType } from '@/types/components';

type ArticlesLayoutProps = ArticlesProps;

type ArticlesLayoutType = ReadonlyComponentType<ArticlesLayoutProps>;

export type { ArticlesLayoutType };
