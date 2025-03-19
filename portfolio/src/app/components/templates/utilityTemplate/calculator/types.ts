import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type CalculatorInputsType = {
  buyPrice: string;
  buyRate: string;
  sellPrice: string;
  sellRate: string;
  shares: string;
};

type CalculatorProps = {
  lang: LocaleKeyType;
};

type CalculatorType = ComponentType<CalculatorProps>;

export type { CalculatorInputsType, CalculatorType };
