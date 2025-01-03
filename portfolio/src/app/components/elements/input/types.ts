import type { ComponentPropsWithoutRef } from 'react';
import type { ReadonlyComponentType, StrictOmitType } from '@/types/components';

type InputProps = StrictOmitType<ComponentPropsWithoutRef<'input'>, 'className' | 'id'> & {
  id: string;
  label: string;
};

type InputType = ReadonlyComponentType<InputProps>;

export type { InputType };
