import type { ComponentPropsWithoutRef } from 'react';
import type { ReadonlyComponentType } from '@/types/components';

type SectionProps = ComponentPropsWithoutRef<'section'>;

type SectionType = ReadonlyComponentType<SectionProps>;

export type { SectionType };
