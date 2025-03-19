import type { ComponentPropsWithoutRef } from 'react';
import type { ComponentType } from '@/types/components';

type PreProps = ComponentPropsWithoutRef<'pre'>;

type PreType = ComponentType<PreProps>;

export type { PreType };
