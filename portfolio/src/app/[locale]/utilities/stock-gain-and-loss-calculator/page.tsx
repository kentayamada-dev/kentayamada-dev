import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { Calculator, LikeButtonWrapper } from '@/components/designSystem/organisms';
import { MinusIcon, PlusIcon } from '@/components/icons';
import { contentfulType } from '@/constants/contentful';
import { dictionaries } from '@/constants/i18n';
import { REQUEST_URL_HEADER, navigationItems } from '@/constants/navigation';
import { getFaqs, getUtilityBySlug } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { getCount } from '@/lib/nextjs/actions';
import { ViewTracker } from '@/lib/nextjs/viewTracker';
import { getRehypeReactOptions } from '@/lib/rehype-react';
import { getRedisKey, getSlugFromUrl, throwColoredError } from '@/utils';
import type { GenerateMetadataType, PageType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const utilityId = getSlugFromUrl(new URL((await headers()).get(REQUEST_URL_HEADER) ?? ''));
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
    utility.coverImage.url,
    new Date(utility.sys.publishedAt),
    new Date(utility.sys.firstPublishedAt)
  );
};

const Page: PageType = async (props) => {
  const { locale } = await props.params;
  const utilityId = getSlugFromUrl(new URL((await headers()).get(REQUEST_URL_HEADER) ?? ''));
  const utility = await getUtilityBySlug(locale, utilityId);

  if (utility === null) {
    return notFound();
  }

  const faqLabel = dictionaries[locale].faq;
  const utilityViewKey = getRedisKey('utility', 'view', utilityId);
  const utilityLikeKey = getRedisKey('utility', 'like', utilityId);
  const utilityLikeCount = await getCount(utilityLikeKey);

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

  return (
    <>
      <ViewTracker keyName={utilityViewKey} />
      <main className='w-full self-center px-5 py-10 sm:px-10 sm:py-20 md:max-w-4xl'>
        <h1 className='text-primary mb-10 text-center text-3xl font-semibold sm:text-4xl'>{utility.title}</h1>
        <Calculator locale={locale} />
        <div className='mt-5 flex flex-row-reverse'>
          <LikeButtonWrapper likeCount={utilityLikeCount} likeKey={utilityLikeKey} locale={locale} />
        </div>
        <div className='bg-primary mt-20 divide-y divide-slate-900/10 rounded-lg p-5 sm:p-10 dark:divide-slate-300/10'>
          <h2 className='text-primary pb-5 text-2xl font-semibold sm:text-2xl'>{faqLabel}</h2>
          <dl className='divide-y divide-slate-900/10 dark:divide-slate-300/10'>
            {faqs.map((faq) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const { answer, question } = faq;

              return (
                <Disclosure as='div' key={question}>
                  <dt>
                    <DisclosureButton className='group w-full hover:cursor-pointer'>
                      <div className='flex w-full items-center justify-between pt-5 text-left group-data-[open]:pb-0 [.group:not([data-open])_&]:pb-5'>
                        <span className='text-primary text-base font-semibold sm:text-lg'>{question}</span>
                        <span className='ml-6 flex h-7 items-center group-hover:text-slate-600 group-hover:dark:text-slate-300'>
                          <span className='size-6 group-data-[open]:hidden'>
                            <PlusIcon />
                          </span>
                          <span className='size-6 [.group:not([data-open])_&]:hidden'>
                            <MinusIcon />
                          </span>
                        </span>
                      </div>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as='dd' className='mt-2 grid'>
                    <section className='bg-primary prose dark:prose-invert prose-figcaption:max-w-fit prose-figcaption:rounded-t-lg prose-figcaption:bg-slate-800 prose-figcaption:p-2 prose-figcaption:text-slate-300 prose-pre:rounded-lg prose-pre:rounded-tl-none prose-pre:bg-slate-800 prose-figcaption:dark:bg-slate-900 prose-figcaption:dark:text-slate-400 prose-pre:dark:bg-slate-900 max-w-none overflow-auto py-5'>
                      {answer}
                    </section>
                  </DisclosurePanel>
                </Disclosure>
              );
            })}
          </dl>
        </div>
      </main>
    </>
  );
};

export { Page as default, generateMetadata };
