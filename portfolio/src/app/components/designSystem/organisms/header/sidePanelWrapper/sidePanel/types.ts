import type { CopyRightProps } from '@/components/designSystem/atoms/copyRight/types';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { NavigationItemType } from '@/constants/navigation/types';
import type { ComponentType } from '@/types/components';

type SidePanelProps = CopyRightProps & {
  currentPathname: string;
  isOpened: boolean;
  items: Record<string, NavigationItemType>;
  locale: LocaleKeyType;
  onToggle: VoidFunction;
};

type SidePanelType = ComponentType<SidePanelProps>;

export type { SidePanelProps, SidePanelType };
