import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';

type SidePanelWrapperProps = {
  lang: LocaleKeyType;
};

type SidePanelWrapperType = ReadonlyComponentType<SidePanelWrapperProps>;

export type { SidePanelWrapperType };
