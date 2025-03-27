import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { UtilitiesList } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { locale: { control: 'select', options: arrayOfLocales } },
  args: {
    locale: defaultLocale,
    utilities: [
      {
        coverImage: {
          title: 'Cover Image Title 1',
          url: 'storybook/image1.jpg'
        },
        slug: 'slug-1',
        subtitle: 'Subtitle 1',
        title: 'Title 1'
      },
      {
        coverImage: {
          title: 'Cover Image Title 2',
          url: 'storybook/image2.jpg'
        },
        slug: 'slug-2',
        subtitle: 'Subtitle 2',
        title: 'Title 2'
      },
      {
        coverImage: {
          title: 'Cover Image Title 3',
          url: 'storybook/image3.jpg'
        },
        slug: 'slug-3',
        subtitle: 'Subtitle 3',
        title: 'Title 3'
      },
      {
        coverImage: {
          title: 'Cover Image Title 4',
          url: 'storybook/image4.jpg'
        },
        slug: 'slug-4',
        subtitle: 'Subtitle 4',
        title: 'Title 4'
      }
    ],
    utilitiesHref: '/utilities'
  },
  component: UtilitiesList
} satisfies Meta<typeof UtilitiesList>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
