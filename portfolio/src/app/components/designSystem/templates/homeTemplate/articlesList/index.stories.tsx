import articleStory from './article/index.stories';
import { ArticlesList } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { ...articleStory.argTypes },
  args: {
    ...articleStory.args,
    articles: [
      {
        createdAt: new Date('2025-08-26T21:50:14.930Z'),
        description: 'Description 1',
        slug: 'slug-1',
        title: 'Title 1'
      },
      {
        createdAt: new Date('2025-07-14T09:30:00.000Z'),
        description: 'Description 2',
        slug: 'slug-2',
        title: 'Title 2'
      },
      {
        createdAt: new Date('2024-10-01T18:45:29.200Z'),
        description: 'Description 3',
        slug: 'slug-3',
        title: 'Title 3'
      },
      {
        createdAt: new Date('2023-05-05T12:00:00.000Z'),
        description: 'Description 4',
        slug: 'slug-4',
        title: 'Title 4'
      }
    ],
    articlesHref: '/articles'
  },
  component: ArticlesList
} satisfies Meta<typeof ArticlesList>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
