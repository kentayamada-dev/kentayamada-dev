import type { ReactNode } from 'react';
import type { ReadonlyComponentType } from '@/types/components';

type ProvidersProps = {
  children: ReactNode;
};

type ProvidersType = ReadonlyComponentType<ProvidersProps>;

export type { ProvidersType };
