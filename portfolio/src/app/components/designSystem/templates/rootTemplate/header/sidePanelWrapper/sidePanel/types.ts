import type { CopyRightProps } from '@/components/designSystem/atoms';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { NavigationType } from '@/constants/navigation/types';
import type { ComponentType } from '@/types/components';

type SidePanelProps = CopyRightProps & {
  currentPathname: string;
  handleToggle: VoidFunction;
  isOpened: boolean;
  items: NavigationType;
  locale: LocaleKeyType;
};

type SidePanelType = ComponentType<SidePanelProps>;

export type { SidePanelType };
