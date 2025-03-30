import type { ComponentType } from '@/types/components';

type CopyRightProps = {
  authorName: string;
  href: string;
  year: number;
};

type CopyRightType = ComponentType<CopyRightProps>;

export type { CopyRightProps, CopyRightType };
