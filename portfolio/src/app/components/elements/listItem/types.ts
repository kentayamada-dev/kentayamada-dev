import type { IconType, ReadonlyComponentType } from '@/types/components';

type ListItemProps = {
  active: boolean;
  icon: IconType | React.FC;
  title: string;
};

type ListItemType = ReadonlyComponentType<ListItemProps>;

export type { ListItemProps, ListItemType };
