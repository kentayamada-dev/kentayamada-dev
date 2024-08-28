import type { ComponentProps } from 'react';

type CustomLinkProps = Readonly<
  Pick<ComponentProps<'a'>, 'href' | 'onClick'> & {
    active: boolean;
    title: string;
  }
>;

export type { CustomLinkProps };
