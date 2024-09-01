import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';

type TableOfContentsProps = {
  lang: LocaleKeyType;
};

type TableOfContentsType = ReadonlyComponentType<TableOfContentsProps>;

export type { TableOfContentsType };
