import { WhackMole } from '.';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: WhackMole
} satisfies Meta<typeof WhackMole>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
