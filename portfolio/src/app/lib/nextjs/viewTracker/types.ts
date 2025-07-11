import type { ReactNode } from 'react';
import type { DeepReadonlyType } from '@/types/components';

type ViewTrackerProps = {
  keyName: string;
};

type ViewTrackerType = (props: DeepReadonlyType<ViewTrackerProps>) => ReactNode;

export type { ViewTrackerType };
