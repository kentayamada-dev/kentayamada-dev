import type { IconType } from '@/types/components';

type LocaleOptionType = {
  icon: IconType;
  name: string;
};

type DictionaryType = {
  articles: {
    footnotes: string;
    latest: string;
    permalink: string;
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
  form: {
    email: string;
    firstName: string;
    lastName: string;
    message: string;
    phoneNumber: string;
    phoneNumberError: string;
    placeHolder: {
      firstName: string;
      lastName: string;
      message: string;
    };
    recaptchaError: string;
  };
  labels: {
    closeSidePanelLabel: string;
    closeTocLabel: string;
    copyCodeLabel: string;
    githubLinkLabel: string;
    homeLinkLabel: string;
    localeSwitcherLabel: string;
    openSidePanelLabel: string;
    openTocLabel: string;
    storybookLinkLabel: string;
    themeSwitcherLabel: string;
  };
  myName: string;
  navigation: {
    articles: string;
    contact: string;
    home: string;
    projects: string;
    utilities: string;
  };
  projects: string;
  readArticle: string;
  siteName: string;
  theme: {
    dark: string;
    light: string;
    system: string;
  };
  utilities: string;
};

type LocaleKeyType = 'en' | 'ja';

type LocaleType = Record<LocaleKeyType, LocaleOptionType>;

type DictionariesType = Record<LocaleKeyType, DictionaryType>;

export type { DictionariesType, LocaleKeyType, LocaleType };
