import { defaultLocale } from '@/constants/i18n';
import { ArticlesTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {},
  args: {
    articles: [
      {
        createdAt: new Date('2025-08-26T21:50:14.930Z'),
        description: 'Description 1',
        href: '/title-1',
        title: 'Title 1',
        topics: ['React', 'JavaScript', 'TypeScript'],
        views: 10
      },
      {
        createdAt: new Date('2025-07-14T09:30:00.000Z'),
        description: 'Description 2',
        href: '/title-2',
        title: 'Title 2',
        topics: ['TypeScript'],
        views: 20
      },
      {
        createdAt: new Date('2024-10-01T18:45:29.200Z'),
        description: 'Description 3',
        href: '/title-3',
        title: 'Title 3',
        topics: ['React', 'JavaScript'],
        views: 0
      },
      {
        createdAt: new Date('2023-05-05T12:00:00.000Z'),
        description: 'Description 4',
        href: '/title-4',
        title: 'Title 4',
        topics: ['React'],
        views: 200
      }
    ],
    locale: defaultLocale,
    title: 'Title'
  },
  component: ArticlesTemplate
} satisfies Meta<typeof ArticlesTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
