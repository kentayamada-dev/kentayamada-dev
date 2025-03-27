import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { ProjectsList } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { locale: { control: 'select', options: arrayOfLocales } },
  args: {
    locale: defaultLocale,
    projects: [
      {
        createdAt: new Date('2025-03-14T04:07:48Z'),
        description: 'Project 1',
        forkCount: 5,
        name: 'project-1',
        stargazerCount: 23,
        updatedAt: new Date('2025-12-20T18:07:56Z'),
        url: '/project-1'
      },
      {
        createdAt: new Date('2024-03-21T04:13:15Z'),
        description: 'Project 2',
        forkCount: 4,
        name: 'project-2',
        stargazerCount: 0,
        updatedAt: new Date('2025-03-20T18:08:02Z'),
        url: '/project-2'
      },
      {
        createdAt: new Date('2023-01-03T06:43:49Z'),
        description: 'Project 3',
        forkCount: 0,
        name: 'project-3',
        stargazerCount: 4,
        updatedAt: new Date('2024-03-20T18:08:07Z'),
        url: '/project-3'
      },
      {
        createdAt: new Date('2022-01-03T06:43:49Z'),
        description: 'Project 4',
        forkCount: 0,
        name: 'project-4',
        stargazerCount: 0,
        updatedAt: new Date('2022-03-20T18:08:07Z'),
        url: '/project-4'
      }
    ]
  },
  component: ProjectsList
} satisfies Meta<typeof ProjectsList>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
