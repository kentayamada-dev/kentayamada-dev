import type { ListItemProps } from '@/components/elements';
import type { ReadonlyComponentType, StrictOmitType } from '@/types/components';

type LinkItemProps = StrictOmitType<ListItemProps, 'active'> & {
  href: string;
};

type LinkItemType = ReadonlyComponentType<LinkItemProps>;

export type { LinkItemType };
