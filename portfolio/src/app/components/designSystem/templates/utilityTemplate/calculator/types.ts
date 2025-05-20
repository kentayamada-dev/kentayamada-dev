import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type CalculatorInputsType = {
  buyPrice: number;
  buyRate: number;
  sellPrice: number;
  sellRate: number;
  shares: number;
};

type CalculatorProps = {
  locale: LocaleKeyType;
};

type CalculatorType = ComponentType<CalculatorProps>;

export type { CalculatorInputsType, CalculatorType };
