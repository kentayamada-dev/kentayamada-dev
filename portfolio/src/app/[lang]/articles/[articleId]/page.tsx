import { notFound } from 'next/navigation';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { ArticleTemplate } from '@/components/templates';
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
  const { articleId, lang } = await props.params;
  const { coverImage, description, sys, title } = await getArticleBySlug(lang, articleId, notFound);

  return getMetadataObject(
    'article',
    `${navigationItems.articles.href}/${articleId}`,
    lang,
    description,
    title,
    { alt: coverImage.title, url: coverImage.url },
    new Date(sys.publishedAt),
    new Date(sys.firstPublishedAt)
  );
};

const Page: ArticlePageType = async (props) => {
  const { articleId, lang } = await props.params;
  const articles = await getArticles(lang);
  const { content, sys, title } = await getArticleBySlug(lang, articleId, notFound);

  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
  const articleContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeReact, getRehypeReactOptions(lang))
    .use(remarkMath)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      keepBackground: false
    })
    .process(content);
  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */

  return (
    <ArticleTemplate
      articles={articles}
      articlesHref={navigationItems.articles.href}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      content={articleContent.result}
      lang={lang}
      publishedAt={new Date(sys.publishedAt)}
      title={title}
    />
  );
};

export { Page as default, generateMetadata, generateStaticParams };
