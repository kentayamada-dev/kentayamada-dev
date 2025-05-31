import type { LocaleKeyType } from '@/constants/i18n/types';
import type { DeepReadonlyType } from '@/types/components';
import type {
  AboutType,
  ArticleType,
  ArticlesType,
  ContactType,
  FaqsType,
  MetadataType,
  ProjectItemsType,
  SitemapType,
  SlugsType,
  UtilitiesType,
  UtilityType
} from '@/types/contentful';

type GetContentType<T> = () => Promise<DeepReadonlyType<T>>;

type GetContentByLocaleType<T> = (locale: LocaleKeyType) => Promise<DeepReadonlyType<T>>;

type GetContentBySlugType<T> = (locale: LocaleKeyType, slug: string) => Promise<DeepReadonlyType<T>>;

type GetSlugsType = GetContentType<SlugsType>;

type GetSitemapType = GetContentType<SitemapType>;

type GetProjectsType = GetContentType<ProjectItemsType>;

type GetContactType = GetContentByLocaleType<ContactType | null>;

type GetArticlesType = GetContentByLocaleType<ArticlesType>;

type GetUtilitiesType = GetContentByLocaleType<UtilitiesType>;

type GetAboutType = GetContentByLocaleType<AboutType | null>;

type GetMetadataType = GetContentBySlugType<MetadataType | null>;

type GetArticleBySlugType = GetContentBySlugType<ArticleType | null>;

type GetUtilityBySlugType = GetContentBySlugType<UtilityType | null>;

type GetFaqsType = GetContentBySlugType<FaqsType>;

export type {
  GetAboutType,
  GetArticleBySlugType,
  GetArticlesType,
  GetContactType,
  GetFaqsType,
  GetMetadataType,
  GetProjectsType,
  GetSitemapType,
  GetSlugsType,
  GetUtilitiesType,
  GetUtilityBySlugType
};
