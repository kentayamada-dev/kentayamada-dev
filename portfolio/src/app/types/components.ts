/* eslint-disable custom/force-types-in-types-file */
import type { LayoutProps } from '@/components/layouts/rootLayout/types';
import type { SunIcon } from '@heroicons/react/24/outline';
import type { Dispatch, SetStateAction } from 'react';

type JSXElementType = React.JSX.Element;

type NextLayoutProps = Readonly<LayoutProps>;

type IconType = typeof SunIcon;

type StateSetterType<T> = Dispatch<SetStateAction<T>>;

type ReadonlyComponentType<P = object> = (props: Readonly<P>) => JSXElementType;

export type { IconType, JSXElementType, NextLayoutProps, ReadonlyComponentType, StateSetterType };
