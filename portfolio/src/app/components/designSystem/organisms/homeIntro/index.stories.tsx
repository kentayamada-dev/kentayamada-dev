import { HomeIntro } from '.';
import type { Meta, StoryObj } from '@storybook/react';

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
  component: HomeIntro
} satisfies Meta<typeof HomeIntro>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
