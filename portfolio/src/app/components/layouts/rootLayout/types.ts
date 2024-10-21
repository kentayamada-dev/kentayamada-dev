import type { FooterProps } from './footer/types';
import type { NextLayoutProps, ReadonlyComponentType } from '@/types/components';

type RootLayoutProps = FooterProps & Pick<NextLayoutProps, 'children'>;

type RootLayoutType = ReadonlyComponentType<RootLayoutProps>;

export type { RootLayoutType };
