import { SunIcon } from '@/components/icons';
import { ListItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    icon: SunIcon,
    isActive: true,
    title: 'Light'
  },
  component: ListItem
} satisfies Meta<typeof ListItem>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
