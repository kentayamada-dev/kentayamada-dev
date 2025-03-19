import type { CopyRightProps } from '@/components/atoms';
import type { NavigationType } from '@/constants/navigation/types';
import type { ComponentType } from '@/types/components';

type SidePanelProps = CopyRightProps & {
  currentPathname: string;
  handleToggle: VoidFunction;
  items: NavigationType;
  open: boolean;
};

type SidePanelType = ComponentType<SidePanelProps>;

export type { SidePanelType };
