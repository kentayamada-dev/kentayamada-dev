import type { ListboxButtonProps, ListboxProps } from '@headlessui/react';
import type { ComponentPropsWithoutRef } from 'react';
import type { ComponentType, RequiredCallbackType, StrictOmitType } from '@/types/components';

type InputWithComboboxProps = StrictOmitType<ComponentPropsWithoutRef<'input'>, 'className' | 'id' | 'title'> & {
  handleOptionChange: RequiredCallbackType<ListboxProps['onChange']>;
  label: string;
  optionValue: ListboxButtonProps['value'];
  options: readonly string[];
  title: string;
};

type InputWithComboboxType = ComponentType<InputWithComboboxProps>;

export type { InputWithComboboxProps, InputWithComboboxType };
