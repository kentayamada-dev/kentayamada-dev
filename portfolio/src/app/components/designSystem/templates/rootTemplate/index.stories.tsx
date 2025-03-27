import footerStory from './footer/index.stories';
import headerStory from './header/index.stories';
import { RootTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  argTypes: { ...headerStory.argTypes },
  args: {
    ...footerStory.args,
    ...headerStory.args,
    children: <div />
  },
  component: RootTemplate,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='flex min-h-screen flex-col'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof RootTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
