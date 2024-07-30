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
};

type LocaleKeyType = 'en' | 'ja';

type LocaleType = Record<LocaleKeyType, LocaleOptionType>;

export type { DictionaryType, LocaleKeyType, LocaleType };
