import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type DesktopTableOfContentsProps = {
  articleClassName: string;
  lang: LocaleKeyType;
};

type DesktopTableOfContentsType = ComponentType<DesktopTableOfContentsProps>;

export type { DesktopTableOfContentsType };
