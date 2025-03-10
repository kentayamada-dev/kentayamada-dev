import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { UtilitiesList } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    lang: defaultLocale,
    title: 'Utilities',
    utilities: [
      {
        coverImage: {
          title: 'Cover Image Title 1',
          url: 'storybook/image1.jpg'
        },
        slug: 'slug-1',
        subtitle: 'Subtitle 1',
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
        subtitle: 'Subtitle 2',
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
        subtitle: 'Subtitle 3',
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
        subtitle: 'Subtitle 4',
        sys: {
          publishedAt: '2022-08-26T21:50:14.930Z'
        },
        title: 'Title 4'
      }
    ],
    utilitiesHref: '/utilities'
  },
  component: UtilitiesList,
  parameters: {
    viewport: {
      defaultViewport: 'iPadAir'
    }
  },
  title: 'Elements/Utilities List'
} satisfies Meta<typeof UtilitiesList>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
