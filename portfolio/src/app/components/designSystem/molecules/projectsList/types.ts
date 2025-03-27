import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type ProjectsListProps = {
  locale: LocaleKeyType;
  projects: {
    createdAt: Date;
    description: string;
    forkCount: number;
    name: string;
    stargazerCount: number;
    updatedAt: Date;
    url: string;
  }[];
};

type ProjectsListType = ComponentType<ProjectsListProps>;

export type { ProjectsListProps, ProjectsListType };
