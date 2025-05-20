import type { ComponentPropsWithoutRef } from 'react';
import type { ComponentType, StrictOmitType } from '@/types/components';

type TextAreaProps = StrictOmitType<ComponentPropsWithoutRef<'textarea'>, 'className' | 'id'> & {
  label: string;
};

type TextAreaType = ComponentType<TextAreaProps>;

export type { TextAreaType };
