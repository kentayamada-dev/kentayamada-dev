import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { UtilityTemplate } from '@/components/designSystem/templates';
import { contentfulType } from '@/constants/contentful';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getFaqs, getUtilityBySlug, getUtilitySlugs } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { getRehypeReactOptions } from '@/lib/rehype-react';
import type { ArticleGenerateMetadataType, ArticlePageType, UtilityGenerateStaticParamsType } from '@/types/components';

const generateStaticParams: UtilityGenerateStaticParamsType = async () => {
  const utilitySlugs = await getUtilitySlugs();

  return utilitySlugs.map((utility) => {
    return {
      utilityId: utility.slug
    };
  });
};

const generateMetadata: ArticleGenerateMetadataType = async (props) => {
  const { articleId, locale } = await props.params;
  const { coverImage, subtitle, sys, title } = await getUtilityBySlug(locale, articleId);

  return getMetadataObject(
    'website',
    `${navigationItems.articles.href}/${articleId}`,
    locale,
    subtitle,
    title,
    { alt: coverImage.title, url: coverImage.url },
    new Date(sys.publishedAt),
    new Date(sys.firstPublishedAt)
  );
};

const Page: ArticlePageType = async (props) => {
  const { articleId, locale } = await props.params;
  const { sys, title } = await getUtilityBySlug(locale, articleId);
  const faqLabel = dictionaries[locale].faq;

  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
  const faqs = await Promise.all(
    (await getFaqs(locale, contentfulType.faq.calculator)).map(async (faq) => {
      const processedContent = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeReact, getRehypeReactOptions(locale))
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
  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */

  return <UtilityTemplate faqLabel={faqLabel} faqs={faqs} locale={locale} publishedAt={new Date(sys.publishedAt)} title={title} />;
};

export { Page as default, generateMetadata, generateStaticParams };
