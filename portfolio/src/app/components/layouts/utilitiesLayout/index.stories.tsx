import { z } from 'zod';
import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { getStorybookImageUrl } from '@/utils';
import { UtilitiesLayout } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const envSchema = z.object({
  STORYBOOK_ENV: z.enum(['development', 'production'])
});

const envClientSchema = envSchema.parse({
  STORYBOOK_ENV: process.env['STORYBOOK_ENV']
});

const storybookEnv = envClientSchema.STORYBOOK_ENV;

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    lang: defaultLocale,
    utilities: [
      {
        coverImage: {
          title: 'Cover Image Title 1',
          url: getStorybookImageUrl(storybookEnv, 'image1.jpg')
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
          url: getStorybookImageUrl(storybookEnv, 'image2.jpg')
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
          url: getStorybookImageUrl(storybookEnv, 'image3.jpg')
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
          url: getStorybookImageUrl(storybookEnv, 'image4.jpg')
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
  component: UtilitiesLayout,
  title: 'Layouts/Utilities Layout'
} satisfies Meta<typeof UtilitiesLayout>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
