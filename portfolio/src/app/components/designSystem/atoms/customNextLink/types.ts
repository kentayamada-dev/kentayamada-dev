import type Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import type { ComponentType, StrictOmitType } from '@/types/components';

type CustomNextLinkProps = StrictOmitType<ComponentPropsWithoutRef<typeof Link>, 'prefetch'>;

type CustomNextLinkType = ComponentType<CustomNextLinkProps>;

export type { CustomNextLinkType };
