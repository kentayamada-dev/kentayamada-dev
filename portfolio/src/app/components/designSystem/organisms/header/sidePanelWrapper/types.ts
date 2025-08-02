import type { CopyRightProps } from '@/components/designSystem/atoms/copyRight/types';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type SidePanelWrapperProps = CopyRightProps & {
  locale: LocaleKeyType;
};

type SidePanelWrapperType = ComponentType<SidePanelWrapperProps>;

export type { SidePanelWrapperProps, SidePanelWrapperType };
