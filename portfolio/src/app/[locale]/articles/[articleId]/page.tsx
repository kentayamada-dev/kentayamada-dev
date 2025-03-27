import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import type { ArticlesListProps } from '@/components/designSystem/molecules';
import { ArticleTemplate } from '@/components/designSystem/templates';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getArticleBySlug, getArticleSlugs, getArticles } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { getRehypeReactOptions } from '@/lib/rehype-react';
import type { ArticleGenerateMetadataType, ArticleGenerateStaticParamsType, ArticlePageType } from '@/types/components';

const generateStaticParams: ArticleGenerateStaticParamsType = async () => {
  const articleSlugs = await getArticleSlugs();

  return articleSlugs.map((post) => {
    return {
      articleId: post.slug
    };
  });
};

const generateMetadata: ArticleGenerateMetadataType = async (props) => {
  const { articleId, locale } = await props.params;
  const { coverImage, description, sys, title } = await getArticleBySlug(locale, articleId);

  return getMetadataObject(
    'article',
    `${navigationItems.articles.href}/${articleId}`,
    locale,
    description,
    title,
    { alt: coverImage.title, url: coverImage.url },
    new Date(sys.publishedAt),
    new Date(sys.firstPublishedAt)
  );
};

const Page: ArticlePageType = async (props) => {
  const { articleId, locale } = await props.params;
  const { content, sys, title } = await getArticleBySlug(locale, articleId);
  const articlesDict = dictionaries[locale].articles;
  const articlesHref = `/${locale}/${navigationItems.articles.href}`;

  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
  const articleContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeReact, getRehypeReactOptions(locale))
    .use(remarkMath)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      keepBackground: false
    })
    .process(content);
  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */

  const articles: ArticlesListProps['articles'] = (await getArticles(locale)).map((article) => {
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

  return (
    <ArticleTemplate
      articleTitle={title}
      articles={articles}
      articlesHref={articlesHref}
      articlesListTitle={articlesDict.recommend}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      content={articleContent.result}
      createdAt={new Date(sys.firstPublishedAt)}
      locale={locale}
      tocTitle={articlesDict.toc}
      updatedAt={new Date(sys.publishedAt)}
    />
  );
};

export { Page as default, generateMetadata, generateStaticParams };
