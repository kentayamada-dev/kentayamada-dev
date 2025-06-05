import { ArticleLink } from '@/components/designSystem/molecules';
import { contentfulType } from '@/constants/contentful';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getArticles, getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { getCount } from '@/lib/nextjs/actions';
import { getRedisKey, throwColoredError } from '@/utils';
import type { GenerateMetadataType, PageType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.articles);

  if (metadata === null) {
    return throwColoredError(`metadata <${contentfulType.metadata.articles}> is empty`, 'red');
  }

  return getMetadataObject(
    'website',
    navigationItems(locale).articles.href,
    locale,
    metadata.description,
    metadata.title,
    metadata.coverImage.url,
    new Date(metadata.sys.publishedAt),
    new Date(metadata.sys.firstPublishedAt)
  );
};

const Page: PageType = async (props) => {
  const { locale } = await props.params;
  const title = dictionaries[locale].articles.latest;
  const articlesHref = navigationItems(locale).articles.href;

  const articles = await Promise.all(
    (await getArticles(locale)).map(async (article) => {
      const viewCount = await getCount(getRedisKey('article', 'view', article.slug));
      const likeCount = await getCount(getRedisKey('article', 'like', article.slug));

      return {
        createdAt: new Date(article.sys.firstPublishedAt),
        description: article.description,
        href: `${articlesHref}/${article.slug}`,
        likeCount,
        title: article.title,
        topics: article.topics,
        viewCount
      };
    })
  );

  return (
    <main className='w-full self-center px-5 py-10 sm:max-w-7xl sm:px-10 sm:py-20'>
      <h1 className='text-primary mb-8 text-3xl font-semibold sm:text-4xl'>{title}</h1>
      <div className='grid h-[inherit] grid-cols-1 gap-10 self-center sm:grid-cols-2 md:grid-cols-3'>
        {articles.map((article) => {
          return (
            <ArticleLink
              createdAt={article.createdAt}
              description={article.description}
              href={article.href}
              key={article.href}
              likeCount={article.likeCount}
              locale={locale}
              title={article.title}
              topics={article.topics}
              viewCount={article.viewCount}
            />
          );
        })}
      </div>
    </main>
  );
};

export { Page as default, generateMetadata };
