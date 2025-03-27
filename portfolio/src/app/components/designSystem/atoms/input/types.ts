import type { ComponentPropsWithoutRef } from 'react';
import type { ComponentType, StrictOmitType } from '@/types/components';

type InputProps = StrictOmitType<ComponentPropsWithoutRef<'input'>, 'className' | 'id'> & {
  id: string;
  label: string;
};

type InputType = ComponentType<InputProps>;

export type { InputType };
