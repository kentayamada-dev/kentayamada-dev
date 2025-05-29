import { notFound } from 'next/navigation';
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
import { throwColoredError } from '@/utils';
import type { UtilityGenerateMetadataType, UtilityGenerateStaticParamsType, UtilityPageType } from '@/types/components';

const generateStaticParams: UtilityGenerateStaticParamsType = async () => {
  const utilitySlugs = await getUtilitySlugs();

  return utilitySlugs.map((utility) => {
    return {
      utilityId: utility.slug
    };
  });
};

const generateMetadata: UtilityGenerateMetadataType = async (props) => {
  const { locale, utilityId } = await props.params;
  const utility = await getUtilityBySlug(locale, utilityId);

  if (utility === null) {
    return throwColoredError(`utility <${utilityId}> is empty`, 'red');
  }

  return getMetadataObject(
    'website',
    `${navigationItems(locale).articles.href}/${utilityId}`,
    locale,
    utility.subtitle,
    utility.title,
    { alt: utility.coverImage.title, url: utility.coverImage.url },
    new Date(utility.sys.publishedAt),
    new Date(utility.sys.firstPublishedAt)
  );
};

const Page: UtilityPageType = async (props) => {
  const { locale, utilityId } = await props.params;
  const utility = await getUtilityBySlug(locale, utilityId);
  const faqLabel = dictionaries[locale].faq;

  if (utility === null) {
    return notFound();
  }

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

  return <UtilityTemplate faqLabel={faqLabel} faqs={faqs} locale={locale} publishedAt={new Date(utility.sys.publishedAt)} title={utility.title} />;
};

export { Page as default, generateMetadata, generateStaticParams };
