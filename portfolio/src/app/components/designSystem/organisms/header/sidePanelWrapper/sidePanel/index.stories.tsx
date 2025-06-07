import { fn } from '@storybook/test';
import { copyRightStory } from '@/components/designSystem/atoms';
import { navigationItems } from '@/constants/navigation';
import { mapObjectByKeyValue } from '@/utils';
import { SidePanel } from '.';
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
    handleToggle: fn(),
    isOpened: true,
    items: navigation,
    locale: 'en',
    ...copyRightStory.args
  },
  component: SidePanel
} satisfies Meta<typeof SidePanel>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
