import type { ComponentPropsWithoutRef } from 'react';
import type { ComponentType, ElementChangeEventType, StrictOmitType } from '@/types/components';

type InputWithComboboxProps = StrictOmitType<ComponentPropsWithoutRef<'input'>, 'className' | 'id'> & {
  handleOptionChange: ElementChangeEventType<'select'>;
  id: string;
  label: string;
  optionValue: ComponentPropsWithoutRef<'select'>['value'];
  options: readonly string[];
};

type InputWithComboboxType = ComponentType<InputWithComboboxProps>;

export type { InputWithComboboxType };
