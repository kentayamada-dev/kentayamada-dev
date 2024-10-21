import type { CopyRightProps } from '@/components/elements';
import type { NavigationType } from '@/constants/navigation/types';
import type { ReadonlyComponentType } from '@/types/components';

type SidePanelProps = CopyRightProps & {
  currentPathname: string;
  handleToggle: VoidFunction;
  items: NavigationType;
  open: boolean;
};

type SidePanelType = ReadonlyComponentType<SidePanelProps>;

export type { SidePanelType };
