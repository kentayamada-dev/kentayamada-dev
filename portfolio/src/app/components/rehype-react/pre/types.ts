import type { ComponentPropsWithoutRef } from 'react';
import type { ReadonlyComponentType } from '@/types/components';

type PreProps = ComponentPropsWithoutRef<'pre'>;

type PreType = ReadonlyComponentType<PreProps>;

export type { PreType };
