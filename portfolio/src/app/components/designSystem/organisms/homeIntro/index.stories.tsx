import { HomeIntro } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  args: {
    paragraph:
      'Solar power is one of the fastest-growing ' +
      'renewable energy technologies. By capturing ' +
      'sunlight with photovoltaic cells, we can ' +
      'reduce fossil-fuel dependence and cut greenhouse ' +
      'gas emissions.',
    subtitle: 'A Sustainable Power Source',
    title: 'Harnessing Solar Energy'
  },
  component: HomeIntro,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='flex min-h-screen flex-col'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof HomeIntro>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
