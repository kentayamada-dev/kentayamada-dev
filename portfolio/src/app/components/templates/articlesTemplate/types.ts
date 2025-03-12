import type { ArticlesListProps } from '@/components/molecules';
import type { ReadonlyComponentType, StrictOmitType } from '@/types/components';

type ArticlesTemplateProps = StrictOmitType<ArticlesListProps, 'title'>;

type ArticlesTemplateType = ReadonlyComponentType<ArticlesTemplateProps>;

export type { ArticlesTemplateType };
