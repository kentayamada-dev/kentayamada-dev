import type { ComponentPropsWithoutRef } from 'react';
import type { ComponentType } from '@/types/components';

type AProps = ComponentPropsWithoutRef<'a'>;

type AType = ComponentType<AProps>;

export type { AType };
