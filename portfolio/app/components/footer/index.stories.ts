import { Footer } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Footer,
  title: 'Components/Footer'
} satisfies Meta<typeof Footer>;

export const Primary = {} as const satisfies StoryObj<typeof meta>;

export default meta;
