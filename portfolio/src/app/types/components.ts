/* eslint-disable custom/force-types-in-types-file, line-comment-position, no-inline-comments */
import type { Metadata } from 'next';
import type { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react';
import type { LocaleKeyType } from '@/constants/i18n/types';

type JSXElementType = React.JSX.Element;

type AsyncJSXElementType = Promise<JSXElementType>;

type AsyncMetadataType = Promise<Metadata>;

type NextLayoutProps = DeepReadonlyType<Required<PageProps & Pick<PropsWithChildren, 'children'>>>;

type IconType = React.FC;

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

type DeepReadonlyType<T> =
  // Handle ReactNode specifically
  T extends ReactNode
    ? T
    : // Handle Promise
      T extends Promise<infer U>
      ? Promise<DeepReadonlyType<U>>
      : // Handle Array
        T extends (infer E)[]
        ? readonly DeepReadonlyType<E>[]
        : // Handle Set
          T extends Set<infer E>
          ? ReadonlySet<DeepReadonlyType<E>>
          : // Handle Map
            T extends Map<infer K, infer V>
            ? ReadonlyMap<DeepReadonlyType<K>, DeepReadonlyType<V>>
            : // Handle Function
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              T extends (...args: any) => any
              ? T
              : // Handle Object
                T extends object
                ? DeepReadonlyObjectType<T>
                : // Handle Primitive Types
                  T;

type DeepReadonlyObjectType<T> = {
  readonly [K in keyof T]: DeepReadonlyType<T[K]>;
};

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

type ChangeEventType<K extends keyof HTMLElementTagNameMap> = React.ChangeEventHandler<HTMLElementTagNameMap[K]>;

/* eslint-enable custom/force-types-in-types-file, line-comment-position, no-inline-comments */

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
