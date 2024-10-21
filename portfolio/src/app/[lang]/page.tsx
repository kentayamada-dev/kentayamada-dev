import { notFound } from 'next/navigation';
import { navigationItems } from '@/constants/navigation';
import { getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import type { Metadata } from 'next';
import type { JSXElementType, PageProps } from '@/types/components';

async function generateMetadata(props: PageProps): Promise<Metadata> {
  const metadata = await getMetadata(props.params.lang, 'kenta-yamada', notFound);

  return getMetadataObject(
    'profile',
    navigationItems.home.href,
    props.params.lang,
    metadata.description,
    metadata.title,
    { alt: metadata.coverImage.title, url: metadata.coverImage.url },
    new Date(metadata.sys.publishedAt),
    new Date(metadata.sys.firstPublishedAt),
    false
  );
}

function Page(): JSXElementType {
  return (
    <>
      <h1 className='text-center text-5xl text-yellow-500 sm:text-red-700'>
        Rapidly build modern websites without ever leaving your HTML.
        人類社会のすべての構成員の固有の尊厳と平等で譲ることのできない権利とを承認することは
      </h1>
      <p className='mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600 dark:text-slate-400'>
        A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be
        composed to build any design, directly in your markup. A utility-first CSS framework packed with classes like
        flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. A
        utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed
        to build any design, directly in your markup. A utility-first CSS framework packed with classes like flex, pt-4,
        A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be
        composed to build any design, directly in your markup. A utility-first CSS framework packed with classes like
        flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. A
        utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed
        to build any design, directly in your markup. A utility-first CSS framework packed with classes like flex, pt-4,
        A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be
        composed to build any design, directly in your markup. A utility-first CSS framework packed with classes like
        flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. A
        utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed
        to build any design, directly in your markup. A utility-first CSS framework packed with classes like flex, pt-4,
      </p>
    </>
  );
}

export { Page as default, generateMetadata };
