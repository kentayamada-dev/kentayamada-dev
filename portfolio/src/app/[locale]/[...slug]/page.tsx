import { notFound } from 'next/navigation';
import { contentfulType } from '@/constants/contentful';
import { getMetadata } from '@/lib/graphql-request';
import { getNotFoundMetadataObject } from '@/lib/nextjs';
import type { GenerateMetadataType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const { coverImage, description, title } = await getMetadata(locale, contentfulType.metadata.pageNotFound);

  return getNotFoundMetadataObject(locale, description, title, {
    alt: coverImage.title,
    url: coverImage.url
  });
};

const CatchAllPage = (): VoidFunction => {
  notFound();
};

export { CatchAllPage as default, generateMetadata };
