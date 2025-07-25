import { fn } from '@storybook/test';
import { likeButtonStory, shareStory } from '@/components/designSystem/molecules';
import { Calculator } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    ...likeButtonStory.argTypes,
    ...shareStory.argTypes
  },
  args: {
    ...likeButtonStory.args,
    ...shareStory.args,
    onCountLike: fn()
  },
  component: Calculator
} satisfies Meta<typeof Calculator>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
