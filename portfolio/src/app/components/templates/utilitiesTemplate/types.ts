import type { UtilitiesListProps } from '@/components/molecules';
import type { ReadonlyComponentType, StrictOmitType } from '@/types/components';

type UtilitiesTemplateProps = StrictOmitType<UtilitiesListProps, 'title'>;

type UtilitiesTemplateType = ReadonlyComponentType<UtilitiesTemplateProps>;

export type { UtilitiesTemplateType };
