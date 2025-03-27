import type { ProjectsListProps } from '@/components/designSystem/molecules';
import type { ComponentType } from '@/types/components';

type ProjectsTemplateProps = ProjectsListProps & {
  title: string;
};

type ProjectsTemplateType = ComponentType<ProjectsTemplateProps>;

export type { ProjectsTemplateType };
