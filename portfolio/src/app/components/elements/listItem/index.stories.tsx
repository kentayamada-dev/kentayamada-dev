import { SunIcon } from '@/components/icons';
import { ListItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    active: true,
    icon: SunIcon,
    title: 'Light'
  },
  component: ListItem,
  title: 'Elements/List Item'
} satisfies Meta<typeof ListItem>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
