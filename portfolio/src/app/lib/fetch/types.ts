import type { z } from 'zod';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { DeepReadonlyType } from '@/types/components';
import type {
  AboutSchema,
  ArticleSlugSchema,
  ArticleSlugsSchema,
  ArticlesSchema,
  ArticlesTopicSchema,
  ContactSchema,
  FaqsSchema,
  MetadataSchema,
  ProjectsSchema,
  SitemapSchema,
  TopicSchema,
  UtilitiesSchema,
  UtilitySlugSchema
} from './schema';

type GetContentType<T> = () => Promise<DeepReadonlyType<T>>;

type GetContentByLocaleType<T> = (locale: LocaleKeyType) => Promise<DeepReadonlyType<T>>;

type GetContentByLocaleLimitType<T> = (locale: LocaleKeyType, limit?: number) => Promise<DeepReadonlyType<T>>;

type GetContentByLocaleTopicType<T> = (locale: LocaleKeyType, topic: string) => Promise<DeepReadonlyType<T>>;

type GetContentBySlugType<T> = (locale: LocaleKeyType, slug: string) => Promise<DeepReadonlyType<T>>;

type GetArticleSlugsType = GetContentType<z.infer<typeof ArticleSlugsSchema>>;

type GetSitemapType = GetContentType<z.infer<typeof SitemapSchema>>;

type ProjectsType = z.infer<typeof ProjectsSchema>;

type GetProjectsType = GetContentType<ProjectsType>;

type GetContactType = GetContentByLocaleType<z.infer<typeof ContactSchema>>;

type GetArticlesType = GetContentByLocaleLimitType<z.infer<typeof ArticlesSchema>>;

type GetArticlesByTopicType = GetContentByLocaleTopicType<z.infer<typeof ArticlesTopicSchema>>;

type GetUtilitiesType = GetContentByLocaleType<z.infer<typeof UtilitiesSchema>>;

type GetAboutType = GetContentByLocaleType<z.infer<typeof AboutSchema>>;

type GetTopicType = GetContentType<z.infer<typeof TopicSchema>>;

type GetMetadataType = GetContentBySlugType<z.infer<typeof MetadataSchema>>;

type GetArticleBySlugType = GetContentBySlugType<z.infer<typeof ArticleSlugSchema>>;

type GetUtilityBySlugType = GetContentBySlugType<z.infer<typeof UtilitySlugSchema>>;

type GetFaqsType = GetContentBySlugType<z.infer<typeof FaqsSchema>>;

export type {
  GetAboutType,
  GetArticleBySlugType,
  GetArticleSlugsType,
  GetArticlesByTopicType,
  GetArticlesType,
  GetContactType,
  GetFaqsType,
  GetMetadataType,
  GetProjectsType,
  GetSitemapType,
  GetTopicType,
  GetUtilitiesType,
  GetUtilityBySlugType,
  ProjectsType
};
