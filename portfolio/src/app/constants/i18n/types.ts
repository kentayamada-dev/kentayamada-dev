import type { IconType } from '@/types/components';

type LocaleOptionType = {
  icon: IconType;
  name: string;
};

type DictionaryType = {
  about: {
    career: string;
    organization: string;
    period: string;
    present: string;
    role: string;
  };
  articles: {
    footnotes: string;
    latest: string;
    recommend: string;
    toc: string;
  };
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
  labels: {
    closeSidePanelLabel: string;
    githubLinkLabel: string;
    homeLinkLabel: string;
    localeSwitcherLabel: string;
    openSidePanelLabel: string;
    storybookLinkLabel: string;
    themeSwitcherLabel: string;
  };
  myName: string;
  projects: string;
  siteName: string;
  utilities: string;
};

type LocaleKeyType = 'en' | 'ja';

type LocaleType = Record<LocaleKeyType, LocaleOptionType>;

type DictionariesType = Record<LocaleKeyType, DictionaryType>;

export type { DictionariesType, LocaleKeyType, LocaleType };
