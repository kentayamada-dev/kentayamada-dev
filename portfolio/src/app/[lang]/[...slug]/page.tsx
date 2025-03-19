import { notFound } from 'next/navigation';
import { contentfulType } from '@/constants/contentful';
import { getMetadata } from '@/lib/graphql-request';
import { getNotFoundMetadataObject } from '@/lib/nextjs';
import type { GenerateMetadataType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { lang } = await props.params;
  const { coverImage, description, title } = await getMetadata(lang, contentfulType.metadata.pageNotFound, notFound);

  return getNotFoundMetadataObject(lang, description, title, {
    alt: coverImage.title,
    url: coverImage.url
  });
};

const CatchAllPage = (): VoidFunction => {
  notFound();
};

export { CatchAllPage as default, generateMetadata };
