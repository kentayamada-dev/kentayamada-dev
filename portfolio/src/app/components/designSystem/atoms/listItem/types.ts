import type { ComponentType, IconType } from '@/types/components';

type ListItemProps = {
  icon: IconType;
  isActive: boolean;
  title: string;
};

type ListItemType = ComponentType<ListItemProps>;

export type { ListItemProps, ListItemType };
