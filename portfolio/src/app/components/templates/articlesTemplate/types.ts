import type { ArticlesListProps } from '@/components/molecules';
import type { ComponentType, StrictOmitType } from '@/types/components';

type ArticlesTemplateProps = StrictOmitType<ArticlesListProps, 'title'>;

type ArticlesTemplateType = ComponentType<ArticlesTemplateProps>;

export type { ArticlesTemplateType };
