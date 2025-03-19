import type { UtilitiesListProps } from '@/components/molecules';
import type { ComponentType, StrictOmitType } from '@/types/components';

type UtilitiesTemplateProps = StrictOmitType<UtilitiesListProps, 'title'>;

type UtilitiesTemplateType = ComponentType<UtilitiesTemplateProps>;

export type { UtilitiesTemplateType };
