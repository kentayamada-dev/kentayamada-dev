import type { NextLayoutProps, ReadonlyComponentType } from '@/types/components';

type RootLayoutProps = Pick<NextLayoutProps, 'children'> & Pick<NextLayoutProps['params'], 'lang'>;

type RootLayoutType = ReadonlyComponentType<RootLayoutProps>;

export type { RootLayoutType };
