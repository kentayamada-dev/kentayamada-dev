import type { ReactNode } from 'react';
import type { ComponentType } from '@/types/components';

type ProvidersProps = {
  children: ReactNode;
};

type ProvidersType = ComponentType<ProvidersProps>;

export type { ProvidersType };
