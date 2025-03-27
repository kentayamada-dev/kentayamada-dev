import type { UtilitiesListProps } from '@/components/designSystem/molecules';
import type { ComponentType } from '@/types/components';

type UtilitiesTemplateProps = UtilitiesListProps & {
  title: string;
};

type UtilitiesTemplateType = ComponentType<UtilitiesTemplateProps>;

export type { UtilitiesTemplateType };
