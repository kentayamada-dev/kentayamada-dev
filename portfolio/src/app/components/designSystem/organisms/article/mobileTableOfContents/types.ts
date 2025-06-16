import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type MobileTableOfContentsProps = {
  articleClassName: string;
  locale: LocaleKeyType;
  title: string;
};

type MobileTableOfContentsType = ComponentType<MobileTableOfContentsProps>;

export type { MobileTableOfContentsType };
