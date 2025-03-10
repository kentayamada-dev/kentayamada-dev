import type { ComponentPropsWithoutRef } from 'react';
import type { ReadonlyComponentType } from '@/types/components';

type UlProps = ComponentPropsWithoutRef<'ul'>;

type UlType = ReadonlyComponentType<UlProps>;

export type { UlType };
