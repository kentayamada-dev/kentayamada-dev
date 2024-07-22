import type { PropsWithChildren } from 'react';
import type { GenerateStaticParamsType, ReadonlyComponentType } from '@/types/components';

type RootLayoutProps = Required<
  Pick<PropsWithChildren, 'children'> & {
    params: GenerateStaticParamsType;
  }
>;

type RootLayoutType = ReadonlyComponentType<RootLayoutProps>;

export type { RootLayoutProps, RootLayoutType };
