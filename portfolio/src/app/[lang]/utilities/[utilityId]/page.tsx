import { notFound } from 'next/navigation';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { UtilityLayout } from '@/components/layouts/utilityLayout';
import { navigationItems } from '@/constants/navigation';
import { getFaqs, getUtilityBySlug, getUtilitySlugs } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { getRehypeReactOptions } from '@/lib/rehype-react';
import type {
  ArticlePageProps,
  AsyncJSXElementType,
  AsyncMetadataType,
  UtilityGenerateStaticParamsReturn
} from '@/types/components';
// eslint-disable-next-line import/order
import 'katex/dist/katex.min.css';

async function generateStaticParams(): UtilityGenerateStaticParamsReturn {
  const utilitySlugs = await getUtilitySlugs();

  return utilitySlugs.map((utility) => {
    return {
      utilityId: utility.slug
    };
  });
}

async function generateMetadata(props: ArticlePageProps): AsyncMetadataType {
  const { articleId, lang } = await props.params;
  const { coverImage, subtitle, sys, title } = await getUtilityBySlug(lang, articleId, notFound);

  return getMetadataObject(
    'website',
    `${navigationItems.articles.href}/${articleId}`,
    lang,
    subtitle,
    title,
    { alt: coverImage.title, url: coverImage.url },
    new Date(sys.publishedAt),
    new Date(sys.firstPublishedAt)
  );
}

async function Page(props: ArticlePageProps): AsyncJSXElementType {
  const { articleId, lang } = await props.params;
  const { sys, title } = await getUtilityBySlug(lang, articleId, notFound);

  const faqs = await getFaqs(lang, 'calculator');

  const processedFaqs = await Promise.all(
    faqs.map(async (faq) => {
      const processedContent = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeReact, getRehypeReactOptions(lang))
        .use(remarkMath)
        .use(rehypeKatex)
        .use(rehypePrettyCode, { keepBackground: false })
        .process(faq.answer);

      return {
        ...faq,
        answer: processedContent.result
      };
    })
  );

  return <UtilityLayout faqs={processedFaqs} lang={lang} publishedAt={new Date(sys.publishedAt)} title={title} />;
}

export { Page as default, generateMetadata, generateStaticParams };
