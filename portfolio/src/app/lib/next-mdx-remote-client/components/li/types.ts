import type { ComponentPropsWithoutRef } from 'react';
import type { ComponentType } from '@/types/components';

type LiProps = ComponentPropsWithoutRef<'li'>;

type LiType = ComponentType<LiProps>;

export type { LiType };
