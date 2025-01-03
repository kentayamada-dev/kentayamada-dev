import type { ArticlesListProps } from '@/components/elements';
import type { ReadonlyComponentType, StrictOmitType } from '@/types/components';

type ArticlesLayoutProps = StrictOmitType<ArticlesListProps, 'title'>;

type ArticlesLayoutType = ReadonlyComponentType<ArticlesLayoutProps>;

export type { ArticlesLayoutType };
