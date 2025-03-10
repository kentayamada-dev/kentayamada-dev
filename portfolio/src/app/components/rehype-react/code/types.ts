import type { ComponentPropsWithoutRef } from 'react';
import type { ReadonlyComponentType } from '@/types/components';

type CodeProps = ComponentPropsWithoutRef<'code'>;

type CodeType = ReadonlyComponentType<CodeProps>;

export type { CodeType };
