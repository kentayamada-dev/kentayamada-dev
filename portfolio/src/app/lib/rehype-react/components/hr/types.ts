import type { ComponentPropsWithoutRef } from 'react';
import type { ReadonlyComponentType } from '@/types/components';

type HrProps = ComponentPropsWithoutRef<'hr'>;

type HrType = ReadonlyComponentType<HrProps>;

export type { HrType };
