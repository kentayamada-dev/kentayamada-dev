import type { ComponentPropsWithoutRef } from 'react';
import type { ComponentType } from '@/types/components';

type SectionProps = ComponentPropsWithoutRef<'section'>;

type SectionType = ComponentType<SectionProps>;

export type { SectionType };
