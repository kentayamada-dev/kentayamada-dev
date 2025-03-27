import type { ListItemProps } from '@/components/designSystem/atoms';
import type { ComponentType, StrictOmitType } from '@/types/components';

type LinkItemProps = StrictOmitType<ListItemProps, 'isActive'> & {
  href: string;
};

type LinkItemType = ComponentType<LinkItemProps>;

export type { LinkItemType };
