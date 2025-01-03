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
    lang: { control: 'select', options: arrayOfLocales }
  },
  args: {
    authorName: 'John Doe',
    currentPathname: navigationItems.home.href,
    handleToggle: fn(),
    items: navigationItems,
    lang: defaultLocale,
    open: true,
    year: 2024
  },
  component: SidePanel,
  title: 'Layouts/Root Layout/Header/Side Panel'
} satisfies Meta<typeof SidePanel>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
