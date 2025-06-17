import type { ComponentType } from '@/types/components';

type TableOfContentsProps = {
  articleClassName: string;
  label: string;
};

type TableOfContentsHeadingType = {
  id: string;
  level: number;
  text: string;
};

type TableOfContentsType = ComponentType<TableOfContentsProps>;

export type { TableOfContentsHeadingType, TableOfContentsType };
