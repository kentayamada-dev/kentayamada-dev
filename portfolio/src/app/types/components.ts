import type { Metadata } from 'next';
import type { ChangeEventHandler, Dispatch, FC, JSX, PropsWithChildren, ReactNode, SetStateAction } from 'react';
import type { LocaleKeyType } from '@/constants/i18n/types';

type StrictOmitType<T, K extends keyof T> = Omit<T, K>;

type ElementChangeEventType<K extends keyof HTMLElementTagNameMap> = ChangeEventHandler<HTMLElementTagNameMap[K]>;

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

type NextLayoutProps = PageProps & ConditionalPickType<PropsWithChildren, 'children'>;

type StateSetterType<T> = Dispatch<SetStateAction<T>>;

type ComponentType<P = object> = (props: DeepReadonlyType<P>) => JSXElementType;

type AsyncMetadataComponentType<P = object> = (props: DeepReadonlyType<P>) => AsyncMetadataType;

type AsyncArticlePageComponentType<P = object> = (props: DeepReadonlyType<P>) => AsyncJSXElementType;

type GenerateMetadataType = AsyncMetadataComponentType<PageProps>;

type ArticlePageType = AsyncArticlePageComponentType<ArticlePageProps>;

type ArticlesPageType = AsyncArticlePageComponentType<PageProps>;

type LayoutPageType = AsyncArticlePageComponentType<NextLayoutProps>;

type NotFoundPageType = AsyncArticlePageComponentType;

type ArticleGenerateMetadataType = AsyncMetadataComponentType<ArticlePageProps>;

type LayoutGenerateStaticParamsType = () => LayoutGenerateStaticParams[];

type ArticleGenerateStaticParamsType = () => Promise<ArticleGenerateStaticParams[]>;

type UtilityGenerateStaticParamsType = () => Promise<UtilityGenerateStaticParams[]>;

export type {
  ArticleGenerateMetadataType,
  ArticleGenerateStaticParamsType,
  ArticlePageType,
  ArticlesPageType,
  ComponentType,
  ConditionalPickType,
  DeepReadonlyType,
  ElementChangeEventType,
  GenerateMetadataType,
  IconType,
  JSXElementType,
  LayoutGenerateStaticParamsType,
  LayoutPageType,
  NextLayoutProps,
  NotFoundPageType,
  StateSetterType,
  StrictOmitType,
  UtilityGenerateStaticParamsType
};
