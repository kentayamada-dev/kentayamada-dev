import type { JSXElement, ReactNode } from '@/types/components';

type ProvidersPropsType = Readonly<{
  children: ReactNode;
}>;

export type ProvidersType = (props: ProvidersPropsType) => JSXElement;
