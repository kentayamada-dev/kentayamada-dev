import type { ComponentPropsWithoutRef } from 'react';
import type { ConditionalPickType, DeepReadonlyType } from '@/types/components';

type CustomLinkProps = DeepReadonlyType<
  ConditionalPickType<ComponentPropsWithoutRef<'a'>, never, 'href' | 'onClick'> & {
    active: boolean;
    title: string;
  }
>;

export type { CustomLinkProps };
