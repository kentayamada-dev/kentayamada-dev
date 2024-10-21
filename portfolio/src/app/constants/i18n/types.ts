import type { IconType } from '@/types/components';

type LocaleOptionType = {
  icon: IconType;
  name: string;
};

type DictionaryType = {
  articles: {
    footnotes: string;
    latest: string;
    recommend: string;
    toc: string;
  };
  myName: string;
  nav: {
    backToHome: string;
  };
  siteName: string;
};

type LocaleKeyType = 'en' | 'ja';

type LocaleKeyArrayType = LocaleKeyType[];

type LocaleType = Record<LocaleKeyType, LocaleOptionType>;

type DictionariesType = Record<LocaleKeyType, DictionaryType>;

export type { DictionariesType, LocaleKeyArrayType, LocaleKeyType, LocaleType };
