import { notFound } from 'next/navigation';
import { contentfulType } from '@/constants/contentful';
import { getMetadata } from '@/lib/graphql-request';
import { getNotFoundMetadataObject } from '@/lib/nextjs';
import { throwColoredError } from '@/utils';
import type { GenerateMetadataType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.pageNotFound);

  if (metadata === null) {
    return throwColoredError(`metadata <${contentfulType.metadata.pageNotFound}> is null`, 'red');
  }

  return getNotFoundMetadataObject(locale, metadata.description, metadata.title, metadata.coverImage.url);
};

// eslint-disable-next-line @typescript-eslint/require-await
const CatchAllPage = async (): Promise<void> => {
  notFound();
};

export { CatchAllPage as default, generateMetadata };
