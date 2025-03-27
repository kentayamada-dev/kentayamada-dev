import { fn } from '@storybook/test';
import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { mapObjectByKeyValue } from '@/utils';
import { SidePanel } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    currentPathname: {
      control: {
        labels: mapObjectByKeyValue(navigationItems, 'href', 'title'),
        type: 'select'
      },
      options: Object.values(navigationItems).map((item) => {
        return item.href;
      })
    },
    locale: { control: 'select', options: arrayOfLocales }
  },
  args: {
    authorName: 'John Doe',
    currentPathname: navigationItems.home.href,
    handleToggle: fn(),
    isOpened: true,
    items: navigationItems,
    locale: defaultLocale,
    year: 2024
  },
  component: SidePanel
} satisfies Meta<typeof SidePanel>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
