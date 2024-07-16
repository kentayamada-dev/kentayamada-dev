import type { PropsWithChildren } from 'react';
import type { ReadonlyComponentType } from '@/types/components';

type LayoutProps = Required<Pick<PropsWithChildren, 'children'>>;

type LayoutType = ReadonlyComponentType<LayoutProps>;

export type { LayoutProps, LayoutType };
