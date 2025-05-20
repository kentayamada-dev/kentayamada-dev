import formStory from './form/index.stories';
import { ContactTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { ...formStory.argTypes },
  args: {
    ...formStory.args,
    subtitle: 'Subtitle',
    title: 'Title'
  },
  component: ContactTemplate
} satisfies Meta<typeof ContactTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
