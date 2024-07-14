import type { ComponentProps } from 'react';

type CustomLinkProps = Readonly<Pick<ComponentProps<'a'>, 'href' | 'onClick'> & { title: string }>;

export type { CustomLinkProps };
