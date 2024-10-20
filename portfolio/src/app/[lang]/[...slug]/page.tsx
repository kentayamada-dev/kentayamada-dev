import { notFound } from 'next/navigation';
import { getMetadata } from '@/lib/graphql-request';
import { getNotFoundMetadataObject } from '@/lib/nextjs';
import type { Metadata } from 'next';
import type { PageProps } from '@/types/components';

async function generateMetadata(props: PageProps): Promise<Metadata> {
  const metadata = await getMetadata(props.params.lang, 'page-not-found', notFound);

  return getNotFoundMetadataObject(props.params.lang, metadata.description, metadata.title, {
    alt: metadata.coverImage.title,
    url: metadata.coverImage.url
  });
}

function CatchAllPage(): VoidFunction {
  notFound();
}

export { CatchAllPage as default, generateMetadata };
