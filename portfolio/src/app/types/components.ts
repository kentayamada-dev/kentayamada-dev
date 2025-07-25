import type { Metadata } from 'next';
import type { ImageResponse } from 'next/og';
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

type AsyncImageType = Promise<ImageResponse>;

type LayoutGenerateStaticParams = {
  locale: LocaleKeyType;
  slug: string[];
};

type ArticleGenerateStaticParams = {
  articleId: string;
};

type PageProps = {
  params: Promise<LayoutGenerateStaticParams>;
};

type ArticlePageProps = {
  params: Promise<LayoutGenerateStaticParams & ArticleGenerateStaticParams>;
};

type NextLayoutProps = PageProps & ConditionalPickType<PropsWithChildren, 'children'>;

type ComponentType<P = object> = (props: DeepReadonlyType<P>) => JSXElementType;

type AsyncMetadataComponentType<P = object> = (props: DeepReadonlyType<P>) => AsyncMetadataType;

type AsyncImageComponentType<P = object> = (props: DeepReadonlyType<P>) => AsyncImageType;

type AsyncComponentType<P = object> = (props: DeepReadonlyType<P>) => AsyncJSXElementType;

type GenerateMetadataType = AsyncMetadataComponentType<PageProps>;

type ArticleImageType = AsyncImageComponentType<ArticlePageProps>;

type UtilityImageType = AsyncImageComponentType<PageProps>;

type ArticlePageType = AsyncComponentType<ArticlePageProps>;

type PageType = AsyncComponentType<PageProps>;

type LayoutPageType = AsyncComponentType<NextLayoutProps>;

type NotFoundPageType = AsyncComponentType;

type ArticleGenerateMetadataType = AsyncMetadataComponentType<ArticlePageProps>;

type LayoutGenerateStaticParamsType = () => LayoutGenerateStaticParams[];

type ArticleGenerateStaticParamsType = () => Promise<ArticleGenerateStaticParams[]>;

export type {
  ArticleGenerateMetadataType,
  ArticleGenerateStaticParamsType,
  ArticleImageType,
  ArticlePageType,
  AsyncComponentType,
  ComponentType,
  ConditionalPickType,
  DeepReadonlyType,
  GenerateMetadataType,
  IconType,
  JSXElementType,
  LayoutGenerateStaticParamsType,
  LayoutPageType,
  NotFoundPageType,
  PageType,
  RequiredCallbackType,
  StrictOmitType,
  UtilityImageType
};
