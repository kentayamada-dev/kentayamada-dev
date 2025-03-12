import type { FooterProps } from './footer/types';
import type { NextLayoutProps, ReadonlyComponentType } from '@/types/components';

type RootTemplateProps = FooterProps & Pick<NextLayoutProps, 'children'>;

type RootTemplateType = ReadonlyComponentType<RootTemplateProps>;

export type { RootTemplateType };
