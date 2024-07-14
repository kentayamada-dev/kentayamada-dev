import type { IconType, ReadonlyComponentType } from '@/types/components';

type ListItemProps = {
  active: boolean;
  icon: IconType;
  title: string;
};

type ListItemType = ReadonlyComponentType<ListItemProps>;

export type { ListItemProps, ListItemType };
