import type { JSXElement } from '@/types/components';

type ProvidersPropsType = Readonly<{
  children: JSXElement;
}>;

export type ProvidersType = (props: ProvidersPropsType) => JSXElement;
