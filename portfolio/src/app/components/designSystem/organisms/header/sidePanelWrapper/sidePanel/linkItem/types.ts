import type { ListItemProps } from '@/components/designSystem/atoms/listItem/types';
import type { ComponentType } from '@/types/components';

type LinkItemProps = ListItemProps & {
  href: string;
};

type LinkItemType = ComponentType<LinkItemProps>;

export type { LinkItemType };
