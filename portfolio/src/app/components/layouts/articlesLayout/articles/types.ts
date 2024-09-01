import type { ArticlesListProps } from '@/components/elements';
import type { ReadonlyComponentType, StrictOmitType } from '@/types/components';

type ArticlesProps = StrictOmitType<ArticlesListProps, 'title'>;

type ArticlesType = ReadonlyComponentType<ArticlesProps>;

export type { ArticlesProps, ArticlesType };
