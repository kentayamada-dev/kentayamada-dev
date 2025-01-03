import type { ComponentPropsWithoutRef } from 'react';
import type { DeepReadonlyType } from '@/types/components';

type CustomLinkProps = DeepReadonlyType<
  Pick<ComponentPropsWithoutRef<'a'>, 'href' | 'onClick'> & {
    active: boolean;
    title: string;
  }
>;

export type { CustomLinkProps };
