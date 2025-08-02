import { GithubIcon } from '@/components/icons/githubIcon';
import { LinkItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  args: {
    href: '#',
    icon: GithubIcon,
    title: 'GitHub'
  },
  component: LinkItem,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='w-52'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof LinkItem>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
