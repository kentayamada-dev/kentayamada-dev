import type { PropsWithChildren } from 'react';
import type { PageProps, ReadonlyComponentType } from '@/types/components';

type RootLayoutProps = Required<PageProps & Pick<PropsWithChildren, 'children'>>;

type RootLayoutType = ReadonlyComponentType<RootLayoutProps>;

export type { RootLayoutProps, RootLayoutType };
