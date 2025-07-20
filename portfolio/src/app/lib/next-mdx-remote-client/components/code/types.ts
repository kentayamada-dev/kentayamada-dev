import type { ComponentPropsWithoutRef } from 'react';
import type { AsyncComponentType, ConditionalPickType, StrictOmitType } from '@/types/components';
import type { CodeBlockProps } from './codeBlock/types';

type CodeProps = StrictOmitType<ComponentPropsWithoutRef<'code'>, 'children'> &
  ConditionalPickType<CodeBlockProps, 'copyCodeLabel' | 'wordWrapLabel'> & {
    'children': string;
    'data-language': string | undefined;
    'data-title': string | undefined;
  };

type CodeType = AsyncComponentType<CodeProps>;

export type { CodeType };
