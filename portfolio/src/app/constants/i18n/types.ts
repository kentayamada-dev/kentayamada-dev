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
    calculate: string;
    forexProfitLoss: string;
    sellPrice: string;
    sellRate: string;
    shares: string;
    stockProfitLoss: string;
    totalProfitLoss: string;
  };
  contact: {
    email: string;
    locationLabel: string;
    locationValue: string;
  };
  faq: string;
  form: {
    email: string;
    firstName: string;
    lastName: string;
    message: string;
    optional: string;
    phoneNumber: string;
    phoneNumberError: string;
    placeHolder: {
      firstName: string;
      lastName: string;
      message: string;
    };
    recaptchaError: string;
    sending: string;
    submit: string;
  };
  labels: {
    closeSidePanelLabel: string;
    closeTocLabel: string;
    copyCodeLabel: string;
    githubLinkLabel: string;
    globalNavLabel: string;
    homeLinkLabel: string;
    likeLabel: string;
    localeSwitcherLabel: string;
    openSidePanelLabel: string;
    openTocLabel: string;
    selectCountryCodeLabel: string;
    selectCurrencyPairLabel: string;
    shareFbLabel: string;
    shareXLabel: string;
    storybookLinkLabel: string;
    themeSwitcherLabel: string;
    urlCopyLabel: string;
    wordWrapLabel: string;
  };
  myName: string;
  navigation: {
    articles: string;
    contact: string;
    home: string;
    projects: string;
    topics: string;
    utilities: string;
  };
  popularTopics: string;
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
