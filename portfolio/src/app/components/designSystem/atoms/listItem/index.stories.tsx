import { SunIcon } from '@/components/icons/sunIcon';
import { ListItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    icon: SunIcon,
    title: 'Light'
  },
  component: ListItem
} satisfies Meta<typeof ListItem>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
