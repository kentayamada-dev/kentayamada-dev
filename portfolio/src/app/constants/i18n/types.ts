import type { IconType } from '@/types/components';

type LocaleOptionType = {
  icon: IconType;
  name: string;
};

type DictionaryType = {
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
  toc: string;
};

type LocaleKeyType = 'en' | 'ja';

type LocaleKeyArrayType = LocaleKeyType[];

type LocaleType = Record<LocaleKeyType, LocaleOptionType>;

export type { DictionaryType, LocaleKeyArrayType, LocaleKeyType, LocaleType };
