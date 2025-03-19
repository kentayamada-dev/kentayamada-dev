import type { ComponentType, IconType } from '@/types/components';

type ListItemProps = {
  active: boolean;
  icon: IconType;
  title: string;
};

type ListItemType = ComponentType<ListItemProps>;

export type { ListItemProps, ListItemType };
