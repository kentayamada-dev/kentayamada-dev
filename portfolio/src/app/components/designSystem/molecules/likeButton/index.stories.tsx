import { fn } from '@storybook/test';
import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { LikeButton } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    locale: { control: 'select', options: arrayOfLocales }
  },
  args: {
    likeCount: 100,
    locale: defaultLocale,
    onLike: fn()
  },
  component: LikeButton
} satisfies Meta<typeof LikeButton>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
