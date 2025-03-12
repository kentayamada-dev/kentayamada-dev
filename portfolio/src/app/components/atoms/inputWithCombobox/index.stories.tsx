import { fn } from '@storybook/test';
import { InputWithCombobox } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    handleOptionChange: fn(),
    id: 'label',
    label: 'Label',
    optionValue: 'option1',
    options: ['option1', 'option2', 'option3']
  },
  component: InputWithCombobox,
  title: 'Atoms/Input With Combobox'
} satisfies Meta<typeof InputWithCombobox>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
