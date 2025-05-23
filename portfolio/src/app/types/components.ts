import type { Metadata } from 'next';
import type { FC, JSX, PropsWithChildren, ReactNode } from 'react';
import type { LocaleKeyType } from '@/constants/i18n/types';

type StrictOmitType<T, K extends keyof T> = Omit<T, K>;

type RequiredCallbackType<T> = Exclude<T, undefined>;

type ConditionalPickType<T, RequiredKeys extends keyof T, OptionalKeys extends keyof T = never> = Required<Pick<T, RequiredKeys>> &
  Partial<Pick<T, OptionalKeys>>;

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

type IconType = FC;

type JSXElementType = JSX.Element;

type AsyncJSXElementType = Promise<JSXElementType>;

type AsyncMetadataType = Promise<Metadata>;

type LayoutGenerateStaticParams = {
  locale: LocaleKeyType;
  slug: string[];
};

type ArticleGenerateStaticParams = {
  articleId: string;
};

type UtilityGenerateStaticParams = {
  utilityId: string;
};

type PageProps = {
  params: Promise<LayoutGenerateStaticParams>;
};

type ArticlePageProps = {
  params: Promise<LayoutGenerateStaticParams & ArticleGenerateStaticParams>;
};

type UtilityPageProps = {
  params: Promise<LayoutGenerateStaticParams & UtilityGenerateStaticParams>;
};

type NextLayoutProps = PageProps & ConditionalPickType<PropsWithChildren, 'children'>;

type ComponentType<P = object> = (props: DeepReadonlyType<P>) => JSXElementType;

type AsyncMetadataComponentType<P = object> = (props: DeepReadonlyType<P>) => AsyncMetadataType;

type AsyncPageComponentType<P = object> = (props: DeepReadonlyType<P>) => AsyncJSXElementType;

type GenerateMetadataType = AsyncMetadataComponentType<PageProps>;

type ArticlePageType = AsyncPageComponentType<ArticlePageProps>;

type UtilityPageType = AsyncPageComponentType<UtilityPageProps>;

type PageType = AsyncPageComponentType<PageProps>;

type LayoutPageType = AsyncPageComponentType<NextLayoutProps>;

type NotFoundPageType = AsyncPageComponentType;

type ArticleGenerateMetadataType = AsyncMetadataComponentType<ArticlePageProps>;

type UtilityGenerateMetadataType = AsyncMetadataComponentType<UtilityPageProps>;

type LayoutGenerateStaticParamsType = () => LayoutGenerateStaticParams[];

type ArticleGenerateStaticParamsType = () => Promise<ArticleGenerateStaticParams[]>;

type UtilityGenerateStaticParamsType = () => Promise<UtilityGenerateStaticParams[]>;

export type {
  ArticleGenerateMetadataType,
  ArticleGenerateStaticParamsType,
  ArticlePageType,
  ComponentType,
  ConditionalPickType,
  DeepReadonlyType,
  GenerateMetadataType,
  IconType,
  JSXElementType,
  LayoutGenerateStaticParamsType,
  LayoutPageType,
  NextLayoutProps,
  NotFoundPageType,
  PageType,
  RequiredCallbackType,
  StrictOmitType,
  UtilityGenerateMetadataType,
  UtilityGenerateStaticParamsType,
  UtilityPageType
};
