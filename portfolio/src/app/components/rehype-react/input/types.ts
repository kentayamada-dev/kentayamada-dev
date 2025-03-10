import type { ComponentPropsWithoutRef } from 'react';
import type { ReadonlyComponentType } from '@/types/components';

type InputProps = ComponentPropsWithoutRef<'input'>;

type InputType = ReadonlyComponentType<InputProps>;

export type { InputType };
