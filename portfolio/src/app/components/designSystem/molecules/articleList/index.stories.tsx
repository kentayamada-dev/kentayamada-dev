import { arrayOfLocales } from '@/constants/i18n';
import { ArticleList } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  argTypes: {
    locale: { control: 'select', options: arrayOfLocales }
  },
  args: {
    articles: [
      {
        createdAt: new Date('2025-08-26T21:50:14.930Z'),
        href: '#',
        likeCount: 20,
        subtitle: 'Subtitle',
        title: 'Title',
        topics: ['React', 'JavaScript', 'TypeScript'],
        viewCount: 10
      },
      {
        createdAt: new Date('2025-08-26T21:50:14.930Z'),
        href: '#',
        likeCount: 20,
        subtitle: 'Subtitle',
        title: 'Title',
        topics: ['React', 'JavaScript', 'TypeScript'],
        viewCount: 10
      },
      {
        createdAt: new Date('2025-08-26T21:50:14.930Z'),
        href: '#',
        likeCount: 20,
        subtitle: 'Subtitle',
        title: 'Title',
        topics: ['React', 'JavaScript', 'TypeScript'],
        viewCount: 10
      },
      {
        createdAt: new Date('2025-08-26T21:50:14.930Z'),
        href: '#',
        likeCount: 20,
        subtitle: 'Subtitle',
        title: 'Title',
        topics: ['React', 'JavaScript', 'TypeScript'],
        viewCount: 10
      }
    ],
    locale: 'en'
  },
  component: ArticleList,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='flex min-h-screen w-96'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof ArticleList>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
