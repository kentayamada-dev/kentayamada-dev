import type { ComponentPropsWithoutRef } from 'react';
import type { ReadonlyComponentType } from '@/types/components';

type LiProps = ComponentPropsWithoutRef<'li'>;

type LiType = ReadonlyComponentType<LiProps>;

export type { LiType };
