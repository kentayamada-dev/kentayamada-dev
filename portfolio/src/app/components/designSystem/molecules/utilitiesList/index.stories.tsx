import { arrayOfLocales } from '@/constants/i18n';
import { UtilitiesList } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    locale: { control: 'select', options: arrayOfLocales }
  },
  args: {
    locale: 'en',
    utilities: [
      {
        href: '/title-1',
        likeCount: 10,
        subtitle: 'Subtitle 1',
        title: 'Title 1',
        viewCount: 20
      },
      {
        href: '/title-2',
        likeCount: 100,
        subtitle: 'Subtitle 2',
        title: 'Title 2',
        viewCount: 2
      },
      {
        href: '/title-3',
        likeCount: 0,
        subtitle: 'Subtitle 3',
        title: 'Title 3',
        viewCount: 200
      },
      {
        href: '/title-4',
        likeCount: 1000,
        subtitle: 'Subtitle 4',
        title: 'Title 4',
        viewCount: 20
      }
    ]
  },
  component: UtilitiesList
} satisfies Meta<typeof UtilitiesList>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
