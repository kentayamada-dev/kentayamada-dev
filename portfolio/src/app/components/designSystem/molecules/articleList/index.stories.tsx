import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { ArticleList } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    locale: { control: 'select', options: arrayOfLocales }
  },
  args: {
    articles: [
      {
        createdAt: new Date('2025-07-20T10:15:30.000Z'),
        href: '/articles/react-for-beginners',
        likeCount: 0,
        subtitle: 'Learn the basics of React',
        title: 'React for Beginners',
        viewCount: 120
      },
      {
        createdAt: new Date('2025-07-18T14:45:00.000Z'),
        href: '/articles/mastering-typescript',
        likeCount: 30,
        subtitle: 'Advanced TypeScript techniques',
        title: 'Mastering TypeScript',
        viewCount: 0
      },
      {
        createdAt: new Date('2025-07-15T08:30:45.000Z'),
        href: '/articles/scalable-react-apps',
        likeCount: 0,
        subtitle: 'Building scalable applications',
        title: 'Scalable React Apps',
        viewCount: 0
      },
      {
        createdAt: new Date('2025-07-10T16:20:10.000Z'),
        href: '/articles/javascript-closures-explained',
        likeCount: 15,
        subtitle: 'Understanding JavaScript closures',
        title: 'JavaScript Closures Explained',
        viewCount: 50
      }
    ],
    locale: defaultLocale
  },
  component: ArticleList
} satisfies Meta<typeof ArticleList>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
