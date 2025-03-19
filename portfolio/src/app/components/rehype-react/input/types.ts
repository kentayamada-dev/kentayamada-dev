import type { ComponentPropsWithoutRef } from 'react';
import type { ComponentType } from '@/types/components';

type InputProps = ComponentPropsWithoutRef<'input'>;

type InputType = ComponentType<InputProps>;

export type { InputType };
