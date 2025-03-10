import type { Metadata } from 'next';
import type { ChangeEventHandler, Dispatch, FC, JSX, PropsWithChildren, ReactNode, SetStateAction } from 'react';
import type { LocaleKeyType } from '@/constants/i18n/types';

type JSXElementType = JSX.Element;

type AsyncJSXElementType = Promise<JSXElementType>;

type AsyncMetadataType = Promise<Metadata>;

type NextLayoutProps = DeepReadonlyType<Required<PageProps & Pick<PropsWithChildren, 'children'>>>;

type IconType = FC;

type StateSetterType<T> = Dispatch<SetStateAction<T>>;

type ReadonlyComponentType<P = object> = (props: DeepReadonlyType<P>) => JSXElementType;

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

type DeepReadonlyType<T> = T extends ReactNode
  ? T
  : T extends Promise<infer U>
    ? Promise<DeepReadonlyType<U>>
    : T extends (infer E)[]
      ? readonly DeepReadonlyType<E>[]
      : T extends Set<infer E>
        ? ReadonlySet<DeepReadonlyType<E>>
        : T extends Map<infer K, infer V>
          ? ReadonlyMap<DeepReadonlyType<K>, DeepReadonlyType<V>>
          : T extends (...args: never[]) => unknown
            ? T
            : T extends object
              ? { readonly [P in keyof T]: DeepReadonlyType<T[P]> }
              : T;

type PageProps = DeepReadonlyType<{
  params: Promise<LayoutGenerateStaticParamsType>;
}>;

type ArticlePageProps = DeepReadonlyType<{
  params: Promise<LayoutGenerateStaticParamsType & PostGenerateStaticParamsType>;
}>;

type LayoutGenerateStaticParamsReturn = LayoutGenerateStaticParamsType[];

type PostGenerateStaticParamsReturn = Promise<PostGenerateStaticParamsType[]>;

type UtilityGenerateStaticParamsReturn = Promise<UtilityGenerateStaticParamsType[]>;

type StrictOmitType<T, K extends keyof T> = Omit<T, K>;

type ChangeEventType<K extends keyof HTMLElementTagNameMap> = ChangeEventHandler<HTMLElementTagNameMap[K]>;

export type {
  ArticlePageProps,
  AsyncJSXElementType,
  AsyncMetadataType,
  ChangeEventType,
  DeepReadonlyType,
  IconType,
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
