import type { ListItemProps } from '@/components/atoms';
import type { ComponentType, StrictOmitType } from '@/types/components';

type LinkItemProps = StrictOmitType<ListItemProps, 'active'> & {
  href: string;
};

type LinkItemType = ComponentType<LinkItemProps>;

export type { LinkItemType };
