import type { ComponentPropsWithoutRef } from 'react';
import type { ChangeEventType, ReadonlyComponentType, StrictOmitType } from '@/types/components';

type InputWithComboboxProps = StrictOmitType<ComponentPropsWithoutRef<'input'>, 'className' | 'id'> & {
  handleOptionChange: ChangeEventType<'select'>;
  id: string;
  label: string;
  optionValue: ComponentPropsWithoutRef<'select'>['value'];
  options: readonly string[];
};

type InputWithComboboxType = ReadonlyComponentType<InputWithComboboxProps>;

export type { InputWithComboboxType };
