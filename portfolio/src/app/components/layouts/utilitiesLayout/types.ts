import type { UtilitiesListProps } from '@/components/elements';
import type { ReadonlyComponentType, StrictOmitType } from '@/types/components';

type UtilitiesLayoutProps = StrictOmitType<UtilitiesListProps, 'title'>;

type UtilitiesLayoutType = ReadonlyComponentType<UtilitiesLayoutProps>;

export type { UtilitiesLayoutType };
