import { ArticlesTemplate } from '@/components/designSystem/templates';
import { contentfulType } from '@/constants/contentful';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getArticles, getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import type { ArticlesPageType, GenerateMetadataType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const { coverImage, description, sys, title } = await getMetadata(locale, contentfulType.metadata.articles);

  return getMetadataObject(
    'website',
    navigationItems.articles.href,
    locale,
    description,
    title,
    { alt: coverImage.title, url: coverImage.url },
    new Date(sys.publishedAt),
    new Date(sys.firstPublishedAt)
  );
};

const Page: ArticlesPageType = async (props) => {
  const { locale } = await props.params;
  const title = dictionaries[locale].articles.latest;
  const articlesHref = `/${locale}/${navigationItems.articles.href}`;

  const articles = (await getArticles(locale)).map((article) => {
    return {
      coverImage: {
        title: article.coverImage.title,
        url: article.coverImage.url
      },
      createdAt: new Date(article.sys.firstPublishedAt),
      slug: article.slug,
      title: article.title
    };
  });

  return <ArticlesTemplate articles={articles} articlesHref={articlesHref} locale={locale} title={title} />;
};

export { Page as default, generateMetadata };
