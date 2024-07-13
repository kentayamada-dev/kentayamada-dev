import type { ListItemProps } from '@/components/ui/listItem/types';
import type { ComponentProps } from 'react';

type NavItemProps = Readonly<ListItemProps & Pick<ComponentProps<'a'>, 'href' | 'onClick'>>;

export type { NavItemProps };
