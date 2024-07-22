/* eslint-disable custom/force-types-in-types-file */
import type { RootLayoutProps } from '@/components/layouts/rootLayout/types';
import type { Dispatch, SetStateAction } from 'react';
import type { LocaleKeyType } from '@/constants/locales/types';

type JSXElementType = React.JSX.Element;

type NextLayoutProps = Readonly<RootLayoutProps>;

type IconType = React.FC;

type StateSetterType<T> = Dispatch<SetStateAction<T>>;

type ReadonlyComponentType<P = object> = (props: Readonly<P>) => JSXElementType;

type GenerateStaticParamsType = {
  lang: LocaleKeyType;
};

type GenerateStaticParamsReturn = GenerateStaticParamsType[];

export type {
  GenerateStaticParamsReturn,
  GenerateStaticParamsType,
  IconType,
  JSXElementType,
  NextLayoutProps,
  ReadonlyComponentType,
  StateSetterType
};
