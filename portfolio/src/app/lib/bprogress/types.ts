import type { ReactNode } from 'react';
import type { ComponentType } from '@/types/components';

type ProgressProviderProps = {
  children: ReactNode;
};

type ProgressProviderType = ComponentType<ProgressProviderProps>;

export type { ProgressProviderType };
