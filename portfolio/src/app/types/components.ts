/* eslint-disable custom/force-types-in-types-file */
import type { RootLayoutProps } from '@/components/layouts/rootLayout/types';
import type { Dispatch, SetStateAction } from 'react';
import type { LocaleKeyType } from '@/constants/i18n/types';

type JSXElementType = React.JSX.Element;

type NextLayoutProps = Readonly<RootLayoutProps>;

type IconType = React.FC;

type StateSetterType<T> = Dispatch<SetStateAction<T>>;

type ReadonlyComponentType<P = object> = (props: Readonly<P>) => JSXElementType;

type GenerateStaticParamsType = {
  lang: LocaleKeyType;
};

type DeepReadonlyType<T> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown> ? DeepReadonlyType<T[P]> : T[P];
};

type PageProps = DeepReadonlyType<{
  params: GenerateStaticParamsType;
}>;

type GenerateStaticParamsReturn = GenerateStaticParamsType[];

export type {
  GenerateStaticParamsReturn,
  IconType,
  JSXElementType,
  NextLayoutProps,
  PageProps,
  ReadonlyComponentType,
  StateSetterType
};
