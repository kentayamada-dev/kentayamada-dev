import { copyRightStory } from '@/components/designSystem/atoms';
import { Header } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    locale: 'en',
    ...copyRightStory.args
  },
  component: Header
} satisfies Meta<typeof Header>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
