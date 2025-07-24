import type { ComponentPropsWithoutRef } from 'react';
import type { ComponentType } from '@/types/components';

type TableProps = ComponentPropsWithoutRef<'table'>;

type TableType = ComponentType<TableProps>;

export type { TableType };
