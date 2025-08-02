import { navigationItems } from '@/constants/navigation';
import { mapObjectByKeyValue } from '@/utils/mapObjectByKeyValue';
import { NavItems } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const navigation = navigationItems('en');

const meta = {
  argTypes: {
    currentPathname: {
      control: {
        labels: mapObjectByKeyValue(navigation, 'href', 'title'),
        type: 'select'
      },
      options: Object.values(navigation).map((item) => {
        return item.href;
      })
    }
  },
  args: {
    currentPathname: navigation.home.href,
    items: navigation,
    navLabel: 'Global'
  },
  component: NavItems
} satisfies Meta<typeof NavItems>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
