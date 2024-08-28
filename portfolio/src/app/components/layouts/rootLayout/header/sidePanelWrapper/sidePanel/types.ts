import type { LocaleKeyType } from '@/constants/i18n/types';
import type { NavigationType } from '@/constants/navigation/types';
import type { ReadonlyComponentType } from '@/types/components';

type SidePanelProps = {
  currentPathname: string;
  handleToggle: VoidFunction;
  items: NavigationType;
  lang: LocaleKeyType;
  open: boolean;
};

type SidePanelType = ReadonlyComponentType<SidePanelProps>;

export type { SidePanelType };
