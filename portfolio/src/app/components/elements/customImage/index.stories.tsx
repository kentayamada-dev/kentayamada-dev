import { z } from 'zod';
import { getStorybookImageUrl } from '@/utils';
import { CustomImage } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const envSchema = z.object({
  STORYBOOK_ENV: z.enum(['development', 'production'])
});

const envClientSchema = envSchema.parse({
  STORYBOOK_ENV: process.env['STORYBOOK_ENV']
});

const storybookEnv = envClientSchema.STORYBOOK_ENV;

const meta = {
  args: {
    alt: 'Alt',
    sizes: '100px',
    src: getStorybookImageUrl(storybookEnv, 'image1.jpg')
  },
  component: CustomImage,
  title: 'Elements/Custom Image'
} satisfies Meta<typeof CustomImage>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
