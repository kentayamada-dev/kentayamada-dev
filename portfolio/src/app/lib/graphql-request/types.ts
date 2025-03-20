import type { LocaleKeyType } from '@/constants/i18n/types';
import type { DeepReadonlyType } from '@/types/components';
import type {
  AboutType,
  ArticleType,
  ArticlesType,
  CareersType,
  FaqsType,
  MetadataType,
  ProjectItemsType,
  SitemapType,
  SlugsType,
  UtilitiesType,
  UtilityType
} from '@/types/contentful';

type GetContentByLocaleType<T> = (locale: LocaleKeyType) => Promise<DeepReadonlyType<T>>;

type GetContentBySlugType<T> = (locale: LocaleKeyType, slug: string, onNotFound: () => never) => Promise<DeepReadonlyType<T>>;

type GetSlugsType = () => Promise<DeepReadonlyType<SlugsType>>;

type GetSitemapType = () => Promise<DeepReadonlyType<SitemapType>>;

type GetProjectsType = () => Promise<DeepReadonlyType<ProjectItemsType>>;

type GetMetadataType = (locale: LocaleKeyType, id: string, onNotFound: () => never) => Promise<DeepReadonlyType<MetadataType>>;

type GetArticlesType = GetContentByLocaleType<ArticlesType>;

type GetCareersType = GetContentByLocaleType<CareersType>;

type GetUtilitiesType = GetContentByLocaleType<UtilitiesType>;

type GetAboutType = (locale: LocaleKeyType, onNotFound: () => never) => Promise<DeepReadonlyType<AboutType>>;

type GetArticleBySlugType = GetContentBySlugType<ArticleType>;

type GetUtilityBySlugType = GetContentBySlugType<UtilityType>;

type GetFaqsType = (locale: LocaleKeyType, id: string) => Promise<DeepReadonlyType<FaqsType>>;

export type {
  GetAboutType,
  GetArticleBySlugType,
  GetArticlesType,
  GetCareersType,
  GetFaqsType,
  GetMetadataType,
  GetProjectsType,
  GetSitemapType,
  GetSlugsType,
  GetUtilitiesType,
  GetUtilityBySlugType
};
