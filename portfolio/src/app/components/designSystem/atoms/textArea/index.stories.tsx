import { TextArea } from '.';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  args: {
    label: 'Label'
  },
  component: TextArea
} satisfies Meta<typeof TextArea>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
