import type { ComponentType, ConditionalPickType, NextLayoutProps } from '@/types/components';
import type { FooterProps } from './footer/types';
import type { HeaderProps } from './header/types';

type RootTemplateProps = HeaderProps & FooterProps & ConditionalPickType<NextLayoutProps, 'children'>;

type RootTemplateType = ComponentType<RootTemplateProps>;

export type { RootTemplateType };
