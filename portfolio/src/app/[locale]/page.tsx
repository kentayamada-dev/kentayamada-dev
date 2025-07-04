import { notFound } from 'next/navigation';
import { CustomImage } from '@/components/designSystem/atoms';
import { HomeArticleList, HomeIntro, WhackMole } from '@/components/designSystem/organisms';
import { contentfulType } from '@/constants/contentful';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getAbout, getArticles, getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { throwColoredError } from '@/utils';
import type { GenerateMetadataType, PageType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.kentaYamada);

  if (metadata === null) {
    return throwColoredError(`metadata <${contentfulType.metadata.kentaYamada}> is empty`, 'red');
  }

  return getMetadataObject(
    'profile',
    navigationItems(locale).home.href,
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
  const about = await getAbout(locale);

  if (about === null) {
    return notFound();
  }

  const { readArticle } = dictionaries[locale];
  const articlesHref = navigationItems(locale).articles.href;

  const articles = (await getArticles(locale, 2)).map((article) => {
    return {
      createdAt: new Date(article.sys.firstPublishedAt),
      href: `${articlesHref}/${article.slug}`,
      subtitle: article.subtitle,
      title: article.title
    };
  });

  return (
    <main className='my-10 grid max-w-7xl gap-x-10 gap-y-10 self-center px-5 sm:my-20 sm:px-10 md:grid-cols-5 md:gap-y-16'>
      <div className='order-2 md:order-1 md:col-span-3'>
        <HomeIntro paragraph={about.paragraph} subtitle={about.subtitle} title={about.title} />
      </div>
      <div className='order-3 md:order-3 md:col-span-3'>
        <HomeArticleList articles={articles} locale={locale} readArticle={readArticle} />
      </div>
      <div className='order-1 self-center md:order-2 md:col-span-2'>
        <div className='h-40 sm:h-56'>
          <CustomImage
            alt={about.coverImage.title}
            priority
            sizes='300px'
            src={about.coverImage.url}
            style={{
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <div className='order-4 md:order-4 md:col-span-2'>
        <WhackMole />
      </div>
    </main>
  );
};

export { Page as default, generateMetadata };
