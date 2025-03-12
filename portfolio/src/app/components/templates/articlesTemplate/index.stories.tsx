import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { ArticlesTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    articles: [
      {
        coverImage: {
          title: 'Cover Image Title 1',
          url: 'storybook/image1.jpg'
        },
        slug: 'slug-1',
        sys: {
          publishedAt: '2024-08-26T21:50:14.930Z'
        },
        title: 'Title 1'
      },
      {
        coverImage: {
          title: 'Cover Image Title 2',
          url: 'storybook/image2.jpg'
        },
        slug: 'slug-2',
        sys: {
          publishedAt: '2024-07-25T21:50:14.930Z'
        },
        title: 'Title 2'
      },
      {
        coverImage: {
          title: 'Cover Image Title 3',
          url: 'storybook/image3.jpg'
        },
        slug: 'slug-3',
        sys: {
          publishedAt: '2023-08-26T21:50:14.930Z'
        },
        title: 'Title 3'
      },
      {
        coverImage: {
          title: 'Cover Image Title 4',
          url: 'storybook/image4.jpg'
        },
        slug: 'slug-4',
        sys: {
          publishedAt: '2022-08-26T21:50:14.930Z'
        },
        title: 'Title 4'
      }
    ],
    articlesHref: '/articles',
    lang: defaultLocale
  },
  component: ArticlesTemplate,
  title: 'Templates/Articles Template'
} satisfies Meta<typeof ArticlesTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
