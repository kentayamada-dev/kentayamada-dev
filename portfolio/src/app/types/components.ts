/* eslint-disable custom/force-types-in-types-file */
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import type { LocaleKeyType } from '@/constants/i18n/types';

type JSXElementType = React.JSX.Element;

type JSXAsyncElementType = Promise<JSXElementType>;

type NextLayoutProps = Readonly<Required<PageProps & Pick<PropsWithChildren, 'children'>>>;

type IconType = React.FC;

type StateSetterType<T> = Dispatch<SetStateAction<T>>;

type ReadonlyComponentType<P = object> = (props: Readonly<P>) => JSXElementType;

type LayoutGenerateStaticParamsType = {
  lang: LocaleKeyType;
  slug: string[];
};

type PostGenerateStaticParamsType = {
  articleId: string;
};

type UtilityGenerateStaticParamsType = {
  utilityId: string;
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

type UtilityGenerateStaticParamsReturn = Promise<UtilityGenerateStaticParamsType[]>;

type StrictOmitType<T, K extends keyof T> = Omit<T, K>;

/* eslint-enable custom/force-types-in-types-file */

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
  StrictOmitType,
  UtilityGenerateStaticParamsReturn
};
