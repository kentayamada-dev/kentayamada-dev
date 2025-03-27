import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { ArticlesList } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { locale: { control: 'select', options: arrayOfLocales } },
  args: {
    articles: [
      {
        coverImage: {
          title: 'Cover Image Title 1',
          url: 'storybook/image1.jpg'
        },
        createdAt: new Date('2025-08-26T21:50:14.930Z'),
        slug: 'slug-1',
        title: 'Title 1'
      },
      {
        coverImage: {
          title: 'Cover Image Title 2',
          url: 'storybook/image2.jpg'
        },
        createdAt: new Date('2025-07-14T09:30:00.000Z'),
        slug: 'slug-2',
        title: 'Title 2'
      },
      {
        coverImage: {
          title: 'Cover Image Title 3',
          url: 'storybook/image3.jpg'
        },
        createdAt: new Date('2024-10-01T18:45:29.200Z'),
        slug: 'slug-3',
        title: 'Title 3'
      },
      {
        coverImage: {
          title: 'Cover Image Title 4',
          url: 'storybook/image4.jpg'
        },
        createdAt: new Date('2023-05-05T12:00:00.000Z'),
        slug: 'slug-4',
        title: 'Title 4'
      }
    ],
    articlesHref: '/articles',
    locale: defaultLocale
  },
  component: ArticlesList
} satisfies Meta<typeof ArticlesList>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
