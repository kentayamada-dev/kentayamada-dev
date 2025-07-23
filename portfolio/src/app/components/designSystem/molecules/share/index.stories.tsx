import { arrayOfLocales } from '@/constants/i18n';
import { Share } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    locale: { control: 'select', options: arrayOfLocales }
  },
  args: {
    locale: 'en',
    url: '#'
  },
  component: Share
} satisfies Meta<typeof Share>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
