import type { ComponentPropsWithoutRef } from 'react';
import type { ComponentType } from '@/types/components';

type CodeProps = ComponentPropsWithoutRef<'code'>;

type CodeType = ComponentType<CodeProps>;

export type { CodeType };
