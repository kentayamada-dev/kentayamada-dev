import type { ArticlesListProps } from '@/components/designSystem/molecules';
import type { ComponentType } from '@/types/components';

type ArticlesTemplateProps = ArticlesListProps & {
  title: string;
};

type ArticlesTemplateType = ComponentType<ArticlesTemplateProps>;

export type { ArticlesTemplateType };
