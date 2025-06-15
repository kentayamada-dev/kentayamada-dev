import type { ComponentPropsWithoutRef } from 'react';
import type { AsyncComponentType } from '@/types/components';

type CodeProps = ComponentPropsWithoutRef<'code'> & {
  'data-language': string | undefined;
  'data-title': string | undefined;
};

type CodeType = AsyncComponentType<CodeProps>;

export type { CodeType };
