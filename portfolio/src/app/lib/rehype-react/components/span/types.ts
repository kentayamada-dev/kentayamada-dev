import type { ComponentPropsWithoutRef } from 'react';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';

type SpanProps = ComponentPropsWithoutRef<'span'> & {
  locale: LocaleKeyType;
};

type SpanType = ReadonlyComponentType<SpanProps>;

export type { SpanType };
