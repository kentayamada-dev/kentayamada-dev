import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { UtilitiesList } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { locale: { control: 'select', options: arrayOfLocales } },
  args: {
    locale: defaultLocale,
    utilities: [
      {
        href: '/title-1',
        subtitle: 'Subtitle 1',
        title: 'Title 1'
      },
      {
        href: '/title-2',
        subtitle: 'Subtitle 2',
        title: 'Title 2'
      },
      {
        href: '/title-3',
        subtitle: 'Subtitle 3',
        title: 'Title 3'
      },
      {
        href: '/title-4',
        subtitle: 'Subtitle 4',
        title: 'Title 4'
      }
    ]
  },
  component: UtilitiesList
} satisfies Meta<typeof UtilitiesList>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
