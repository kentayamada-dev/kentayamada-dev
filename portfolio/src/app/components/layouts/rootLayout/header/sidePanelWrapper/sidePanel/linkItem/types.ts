import type { IconType, ReadonlyComponentType } from '@/types/components';

type LinkItemProps = {
  href: string;
  icon: IconType;
  title: string;
};

type LinkItemType = ReadonlyComponentType<LinkItemProps>;

export type { LinkItemType };
