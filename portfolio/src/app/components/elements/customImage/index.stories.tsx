import { CustomImage } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    alt: 'Alt',
    sizes: '100px',
    src: 'storybook/image1.jpg'
  },
  component: CustomImage,
  title: 'Elements/Custom Image'
} satisfies Meta<typeof CustomImage>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
