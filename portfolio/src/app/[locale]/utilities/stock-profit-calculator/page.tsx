import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Calculator } from '@/components/designSystem/organisms/calculator';
import { MinusIcon } from '@/components/icons/minusIcon';
import { PlusIcon } from '@/components/icons/plusIcon';
import { contentfulType } from '@/constants/contentful';
import { envServer } from '@/constants/env/server';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getFaqs, getMetadata, getUtilityBySlug } from '@/lib/fetch';
import { getEvaluateResult } from '@/lib/next-mdx-remote-client';
import { OG, getMetadataObject } from '@/lib/nextjs';
import { getCount, incrementCount } from '@/lib/nextjs/actions';
import { JsonLd } from '@/lib/nextjs/jsonLd';
import { ViewTracker } from '@/lib/nextjs/viewTracker';
import { getRedisKey } from '@/utils/getRedisKey';
import type { GenerateMetadataType, PageType } from '@/types/components';

const STOCK_PROFIT_CALCULATOR_ID = contentfulType.metadata.stockProfitCalculator;

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, STOCK_PROFIT_CALCULATOR_ID);
  const stockProfitCalculatorPath = `${navigationItems(locale).utilities.href}/${STOCK_PROFIT_CALCULATOR_ID}`;

  return getMetadataObject(
    'website',
    {
      current: stockProfitCalculatorPath,
      en: `${navigationItems('en').utilities.href}/${STOCK_PROFIT_CALCULATOR_ID}`,
      ja: `${navigationItems('ja').utilities.href}/${STOCK_PROFIT_CALCULATOR_ID}`
    },
    locale,
    metadata.description,
    metadata.title,
    `${stockProfitCalculatorPath}${OG.PATH}`,
    new Date(metadata.sys.publishedAt),
    new Date(metadata.sys.firstPublishedAt)
  );
};

const Page: PageType = async (props) => {
  const { locale } = await props.params;
  const utility = await getUtilityBySlug(locale, STOCK_PROFIT_CALCULATOR_ID);
  const navigation = navigationItems(locale);
  const stockProfitCalculatorPath = `${navigation.utilities.href}/${STOCK_PROFIT_CALCULATOR_ID}`;

  const {
    faq: faqLabel,
    navigation: { home: homeLabel, utilities: utilitiesLabel }
  } = dictionaries[locale];

  const utilityViewKey = getRedisKey('utility', 'view', STOCK_PROFIT_CALCULATOR_ID);
  const utilityLikeKey = getRedisKey('utility', 'like', STOCK_PROFIT_CALCULATOR_ID);
  const utilityLikeCount = await getCount(utilityLikeKey);

  const faqs = await Promise.all(
    (await getFaqs(locale, contentfulType.faq.calculator)).map(async (faq) => {
      const { content } = await getEvaluateResult(faq.answer, locale);

      return {
        ...faq,
        answer: content
      };
    })
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'item': `${envServer.SITE_URL}${navigation.home.href}`,
        'name': homeLabel,
        'position': 1
      },
      {
        '@type': 'ListItem',
        'item': `${envServer.SITE_URL}${navigation.utilities.href}`,
        'name': utilitiesLabel,
        'position': 2
      },
      {
        '@type': 'ListItem',
        'name': utility.title,
        'position': 3
      }
    ],
    'name': stockProfitCalculatorPath
  };

  const handleCountLike = async (): Promise<void> => {
    'use server';
    await incrementCount(utilityLikeKey);
  };

  return (
    <>
      <JsonLd jsonLd={jsonLd} />
      <ViewTracker keyName={utilityViewKey} />
      <main className='w-full self-center px-5 py-10 sm:px-10 sm:py-20 md:max-w-4xl'>
        <h1 className='text-primary mb-10 text-center text-3xl font-semibold tracking-tight sm:text-5xl'>{utility.title}</h1>
        <Calculator
          likeCount={utilityLikeCount}
          locale={locale}
          onCountLike={handleCountLike}
          title={utility.title}
          url={`${envServer.SITE_URL}${stockProfitCalculatorPath}`}
        />
        <div className='bg-primary mt-20 divide-y divide-slate-900/10 rounded-lg p-5 sm:p-10 dark:divide-slate-300/10'>
          <h2 className='text-primary pb-5 text-2xl font-semibold sm:text-2xl'>{faqLabel}</h2>
          <dl className='divide-y divide-slate-900/10 dark:divide-slate-300/10'>
            {faqs.map((faq) => {
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
                    <section className='bg-primary prose dark:prose-invert overflow-auto py-5'>{answer}</section>
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
