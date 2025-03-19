import type { ComponentPropsWithoutRef } from 'react';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type SpanProps = ComponentPropsWithoutRef<'span'> & {
  locale: LocaleKeyType;
};

type SpanType = ComponentType<SpanProps>;

export type { SpanType };
