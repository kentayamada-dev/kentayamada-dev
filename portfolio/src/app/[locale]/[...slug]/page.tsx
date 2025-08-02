import { notFound } from 'next/navigation';
import { contentfulType } from '@/constants/contentful';
import { getMetadata } from '@/lib/fetch';
import { getNotFoundMetadataObject } from '@/lib/nextjs';
import type { GenerateMetadataType, PageType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.pageNotFound);

  return getNotFoundMetadataObject(locale, metadata.description, metadata.title, metadata.coverImage.url);
};

const CatchAllPage: PageType = () => {
  notFound();
};

export { CatchAllPage as default, generateMetadata };
