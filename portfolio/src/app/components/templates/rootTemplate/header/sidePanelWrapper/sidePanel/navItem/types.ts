import type { ListItemProps } from '@/components/atoms';
import type { ComponentPropsWithoutRef } from 'react';
import type { DeepReadonlyType } from '@/types/components';

type NavItemProps = DeepReadonlyType<ListItemProps & Pick<ComponentPropsWithoutRef<'a'>, 'href' | 'onClick'>>;

export type { NavItemProps };
