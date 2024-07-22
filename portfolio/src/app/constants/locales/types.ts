type LocaleOptionType = {
  icon: React.FC;
  name: string;
};

type LocaleKeyType = 'en' | 'ja';

type LocaleType = Record<LocaleKeyType, LocaleOptionType>;

export type { LocaleKeyType, LocaleType };
