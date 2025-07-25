import type { CopyRightProps } from '@/components/designSystem/atoms';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { NavigationType } from '@/constants/navigation/types';
import type { ComponentType } from '@/types/components';

type SidePanelProps = CopyRightProps & {
  currentPathname: string;
  isOpened: boolean;
  items: NavigationType;
  locale: LocaleKeyType;
  onToggle: VoidFunction;
};

type SidePanelType = ComponentType<SidePanelProps>;

export type { SidePanelProps, SidePanelType };
