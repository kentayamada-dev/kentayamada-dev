import type { IconType } from '@/types/components';

type LocaleOptionType = {
  icon: IconType;
  name: string;
};

type DictionaryType = {
  articles: {
    articles: string;
    articlesDescription: string;
    footnotes: string;
    latest: string;
    recommend: string;
    toc: string;
    utilities: string;
    utilitiesDescription: string;
  };
  error: {
    notFound: {
      main: string;
      sub: string;
    };
  };
  myName: string;
  nav: {
    backToHome: string;
    loading: string;
    loadingDescription: string;
  };
};

type LocaleKeyType = 'en' | 'ja';

type LocaleKeyArrayType = LocaleKeyType[];

type LocaleType = Record<LocaleKeyType, LocaleOptionType>;

type DictionariesType = Record<LocaleKeyType, DictionaryType>;

export type { DictionariesType, LocaleKeyArrayType, LocaleKeyType, LocaleType };
