import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';

type DesktopTableOfContentsProps = {
  articleClassName: string;
  lang: LocaleKeyType;
};

type DesktopTableOfContentsType = ReadonlyComponentType<DesktopTableOfContentsProps>;

export type { DesktopTableOfContentsType };
