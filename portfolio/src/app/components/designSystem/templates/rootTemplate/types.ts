import type { FooterProps } from './footer/types';
import type { HeaderProps } from './header/types';
import type { ComponentType, ConditionalPickType, NextLayoutProps } from '@/types/components';

type RootTemplateProps = HeaderProps & FooterProps & ConditionalPickType<NextLayoutProps, 'children'>;

type RootTemplateType = ComponentType<RootTemplateProps>;

export type { RootTemplateType };
