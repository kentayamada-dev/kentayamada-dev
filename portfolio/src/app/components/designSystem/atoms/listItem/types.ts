import type { ComponentType, IconType } from '@/types/components';

type ListItemProps = {
  icon: IconType;
  title: string;
};

type ListItemType = ComponentType<ListItemProps>;

export type { ListItemProps, ListItemType };
