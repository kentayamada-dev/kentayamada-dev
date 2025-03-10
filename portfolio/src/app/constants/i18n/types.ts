import type { IconType } from '@/types/components';

type LocaleOptionType = {
  icon: IconType;
  name: string;
};

type DictionaryType = {
  about: {
    career: string;
    present: string;
  };
  articles: {
    footnotes: string;
    latest: string;
    recommend: string;
    toc: string;
  };
  backToHome: string;
  calculator: {
    buyPrice: string;
    buyRate: string;
    forexProfitLoss: string;
    sellPrice: string;
    sellRate: string;
    shares: string;
    stockProfitLoss: string;
    totalProfitLoss: string;
  };
  faq: string;
  myName: string;
  siteName: string;
  utilities: string;
};

type LocaleKeyType = 'en' | 'ja';

type LocaleType = Record<LocaleKeyType, LocaleOptionType>;

type DictionariesType = Record<LocaleKeyType, DictionaryType>;

export type { DictionariesType, LocaleKeyType, LocaleType };
