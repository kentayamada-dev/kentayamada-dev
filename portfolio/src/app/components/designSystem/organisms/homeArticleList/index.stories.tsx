import { HomeArticleList } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  args: {
    articles: [
      {
        createdAt: new Date('2025-08-26T21:50:14.930Z'),
        description: 'Description 1',
        href: '/title-1',
        title: 'Title 1'
      },
      {
        createdAt: new Date('2025-07-14T09:30:00.000Z'),
        description: 'Description 2',
        href: '/title-2',
        title: 'Title 2'
      },
      {
        createdAt: new Date('2024-10-01T18:45:29.200Z'),
        description: 'Description 3',
        href: '/title-3',
        title: 'Title 3'
      },
      {
        createdAt: new Date('2023-05-05T12:00:00.000Z'),
        description: 'Description 4',
        href: '/title-4',
        title: 'Title 4'
      }
    ],
    locale: 'en',
    readArticle: 'Read article'
  },
  component: HomeArticleList,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='flex min-h-screen w-96'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof HomeArticleList>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
