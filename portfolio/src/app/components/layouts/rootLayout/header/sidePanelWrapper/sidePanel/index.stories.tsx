import { fn } from '@storybook/test';
import { arrayOfLocales } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { SidePanel } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    currentPathname: {
      control: {
        labels: navigationItems.reduce<Record<string, string>>((acc, item) => {
          acc[item.href] = item.title;

          return acc;
        }, {}),
        type: 'select'
      },
      options: navigationItems.map((item) => {
        return item.href;
      })
    },
    lang: { control: 'select', options: arrayOfLocales }
  },
  args: {
    currentPathname: '',
    handleToggle: fn(),
    items: navigationItems,
    lang: 'en',
    open: true
  },
  component: SidePanel,
  title: 'Layouts/Root Layout/Header/Side Panel'
} satisfies Meta<typeof SidePanel>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
