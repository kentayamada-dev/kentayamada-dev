import { Header } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Header,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  title: 'Layouts/Root Layout/Header'
} satisfies Meta<typeof Header>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
