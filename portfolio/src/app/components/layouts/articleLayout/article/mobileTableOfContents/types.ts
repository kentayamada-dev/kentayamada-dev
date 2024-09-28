import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';

type MobileTableOfContentsProps = {
  articleClassName: string;
  lang: LocaleKeyType;
};

type MobileTableOfContentsType = ReadonlyComponentType<MobileTableOfContentsProps>;

export type { MobileTableOfContentsType };
