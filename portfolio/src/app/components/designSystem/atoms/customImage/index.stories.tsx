import { CustomImage } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  args: {
    alt: 'Alt',
    sizes: '100px',
    src: 'storybook/image1.jpg',
    style: {
      objectFit: 'cover'
    }
  },
  component: CustomImage,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='size-96'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof CustomImage>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
