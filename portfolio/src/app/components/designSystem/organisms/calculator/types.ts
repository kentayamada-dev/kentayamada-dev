import type { ShareProps } from '@/components/designSystem/molecules';
import type { ComponentType, ConditionalPickType } from '@/types/components';
import type { LikeButtonWrapperProps } from '../likeButtonWrapper/types';

type CalculatorInputsType = {
  buyPrice: number;
  buyRate: number;
  sellPrice: number;
  sellRate: number;
  shares: number;
};

type CalculatorProps = ConditionalPickType<LikeButtonWrapperProps, 'onCountLike' | 'likeCount'> & ShareProps;

type CalculatorType = ComponentType<CalculatorProps>;

export type { CalculatorInputsType, CalculatorType };
