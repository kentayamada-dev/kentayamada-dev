import type { IconType } from '@/types/components';

type LocaleOptionType = {
  icon: IconType;
  name: string;
};

type DictionaryType = {
  articles: {
    latest: string;
    recommend: string;
    toc: string;
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
  };
};

type LocaleKeyType = 'en' | 'ja';

type LocaleKeyArrayType = LocaleKeyType[];

type LocaleType = Record<LocaleKeyType, LocaleOptionType>;

type DictionariesType = Record<LocaleKeyType, DictionaryType>;

export type { DictionariesType, LocaleKeyArrayType, LocaleKeyType, LocaleType };
