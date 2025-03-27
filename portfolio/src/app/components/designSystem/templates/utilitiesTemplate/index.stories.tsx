import { utilitiesListStory } from '@/components/designSystem/molecules';
import { UtilitiesTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { ...utilitiesListStory.argTypes },
  args: { ...utilitiesListStory.args, title: 'Utilities' },
  component: UtilitiesTemplate
} satisfies Meta<typeof UtilitiesTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
