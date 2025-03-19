import type { FooterProps } from './footer/types';
import type { ComponentType, ConditionalPickType, NextLayoutProps } from '@/types/components';

type RootTemplateProps = FooterProps & ConditionalPickType<NextLayoutProps, 'children'>;

type RootTemplateType = ComponentType<RootTemplateProps>;

export type { RootTemplateType };
