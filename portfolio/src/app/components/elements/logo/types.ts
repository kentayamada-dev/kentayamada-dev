import type { ComponentProps } from 'react';
import type { ReadonlyComponentType } from '@/types/components';

type LogoProps = Pick<ComponentProps<'svg'>, 'color'>;

type LogoType = ReadonlyComponentType<LogoProps>;

export type { LogoType };
