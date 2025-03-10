import type { ComponentPropsWithoutRef } from 'react';
import type { ReadonlyComponentType } from '@/types/components';

type AProps = ComponentPropsWithoutRef<'a'>;

type AType = ReadonlyComponentType<AProps>;

export type { AType };
