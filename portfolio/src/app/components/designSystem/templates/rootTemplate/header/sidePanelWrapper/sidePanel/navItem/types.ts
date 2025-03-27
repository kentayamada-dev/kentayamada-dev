import type { ListItemProps } from '@/components/designSystem/atoms';
import type { ComponentPropsWithoutRef } from 'react';
import type { ConditionalPickType, DeepReadonlyType } from '@/types/components';

type NavItemProps = DeepReadonlyType<ListItemProps & ConditionalPickType<ComponentPropsWithoutRef<'a'>, never, 'href' | 'onClick'>>;

export type { NavItemProps };
