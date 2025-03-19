import type { RefObject } from 'react';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type TableOfContentsProps = {
  articleClassName: string;
  lang: LocaleKeyType;
  tocContainerRef: RefObject<HTMLElement | null>;
};

type TableOfContentsHeadingType = {
  id: string;
  level: number;
  text: string;
};

type TableOfContentsType = ComponentType<TableOfContentsProps>;

export type { TableOfContentsHeadingType, TableOfContentsType };
