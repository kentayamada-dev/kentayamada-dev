import type { ComponentType } from '@/types/components';

type CopyRightProps = {
  author: string;
  copyrightYear: number;
  homepageUrl: string;
};

type CopyRightType = ComponentType<CopyRightProps>;

export type { CopyRightProps, CopyRightType };
