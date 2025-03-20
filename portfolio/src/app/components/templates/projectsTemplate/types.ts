import type { ProjectsListProps } from '@/components/molecules';
import type { ComponentType, StrictOmitType } from '@/types/components';

type ProjectsTemplateProps = StrictOmitType<ProjectsListProps, 'title'>;

type ProjectsTemplateType = ComponentType<ProjectsTemplateProps>;

export type { ProjectsTemplateType };
