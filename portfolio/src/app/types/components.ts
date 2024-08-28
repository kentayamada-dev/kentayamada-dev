/* eslint-disable custom/force-types-in-types-file */
import type { RootLayoutProps } from '@/components/layouts/rootLayout/types';
import type { Dispatch, SetStateAction } from 'react';
import type { LocaleKeyType } from '@/constants/i18n/types';

type JSXElementType = React.JSX.Element;

type JSXAsyncElementType = Promise<JSXElementType>;

type NextLayoutProps = Readonly<RootLayoutProps>;

type IconType = React.FC;

type StateSetterType<T> = Dispatch<SetStateAction<T>>;

type ReadonlyComponentType<P = object> = (props: Readonly<P>) => JSXElementType;

type LayoutGenerateStaticParamsType = {
  lang: LocaleKeyType;
};

type PostGenerateStaticParamsType = {
  articleId: string;
};

type DeepReadonlyType<T> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown> ? DeepReadonlyType<T[P]> : T[P];
};

type PageProps = DeepReadonlyType<{
  params: LayoutGenerateStaticParamsType;
}>;

type ArticlePageProps = DeepReadonlyType<{
  params: LayoutGenerateStaticParamsType & PostGenerateStaticParamsType;
}>;

type LayoutGenerateStaticParamsReturn = LayoutGenerateStaticParamsType[];

type PostGenerateStaticParamsReturn = Promise<PostGenerateStaticParamsType[]>;

type StrictOmitType<T, K extends keyof T> = Omit<T, K>;

export type {
  ArticlePageProps,
  IconType,
  JSXAsyncElementType,
  JSXElementType,
  LayoutGenerateStaticParamsReturn,
  NextLayoutProps,
  PageProps,
  PostGenerateStaticParamsReturn,
  ReadonlyComponentType,
  StateSetterType,
  StrictOmitType
};
