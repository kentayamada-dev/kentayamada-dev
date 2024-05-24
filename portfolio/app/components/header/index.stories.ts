import { Header } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Header,
  title: 'Components/Header'
} satisfies Meta<typeof Header>;

export const Primary = {} as const satisfies StoryObj<typeof meta>;

export default meta;
