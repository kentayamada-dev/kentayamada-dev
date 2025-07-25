import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { ProjectsList } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    locale: { control: 'select', options: arrayOfLocales }
  },
  args: {
    locale: defaultLocale,
    projects: [
      {
        createdAt: new Date('2025-03-14T04:07:48Z'),
        description: 'A React-based web application for managing tasks efficiently.',
        forkCount: 0,
        name: 'task-manager',
        stargazerCount: 45,
        updatedAt: new Date('2025-12-20T18:07:56Z'),
        url: '/projects/task-manager'
      },
      {
        createdAt: new Date('2024-03-21T04:13:15Z'),
        description: 'A TypeScript library for data visualization with charts and graphs.',
        forkCount: 8,
        name: 'data-viz-lib',
        stargazerCount: 0,
        updatedAt: new Date('2025-03-20T18:08:02Z'),
        url: '/projects/data-viz-lib'
      },
      {
        createdAt: new Date('2023-01-03T06:43:49Z'),
        description: 'A Node.js API for handling user authentication and authorization.',
        forkCount: 0,
        name: 'auth-api',
        stargazerCount: 0,
        updatedAt: new Date('2024-03-20T18:08:07Z'),
        url: '/projects/auth-api'
      },
      {
        createdAt: new Date('2022-01-03T06:43:49Z'),
        description: 'A Python script for automating data cleaning and preprocessing.',
        forkCount: 3,
        name: 'data-cleaner',
        stargazerCount: 10,
        updatedAt: new Date('2022-03-20T18:08:07Z'),
        url: '/projects/data-cleaner'
      }
    ]
  },
  component: ProjectsList
} satisfies Meta<typeof ProjectsList>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
