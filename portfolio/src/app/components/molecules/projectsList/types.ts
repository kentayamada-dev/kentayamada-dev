import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';
import type { ProjectItemsType } from '@/types/contentful';

type ProjectsListProps = {
  lang: LocaleKeyType;
  projects: ProjectItemsType;
  title: string;
};

type ProjectsListType = ComponentType<ProjectsListProps>;

export type { ProjectsListProps, ProjectsListType };
