import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';

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

type CalculatorType = ReadonlyComponentType<CalculatorProps>;

export type { CalculatorInputsType, CalculatorType };
