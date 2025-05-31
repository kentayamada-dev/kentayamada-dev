import { size } from 'app/[locale]/articles/[articleId]/opengraph-image';
import { envServer } from '@/constants/env';
import { dictionaries } from '@/constants/i18n';
import type { Metadata } from 'next';
import type { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types';
import type { LocaleKeyType } from '@/constants/i18n/types';

const OPENGRAPH_IMAGE_PATH = '/opengraph-image';

const getCommonMetadata = (myName: string, siteName: string, description: string, title: string, coverImageUrl: string): Metadata => {
  return {
    description,
    metadataBase: new URL(envServer.SITE_URL),
    openGraph: {
      description,
      images: [
        {
          height: size.height,
          secureUrl: coverImageUrl,
          url: coverImageUrl,
          width: size.width
        }
      ],
      siteName,
      title
    },
    title,
    twitter: {
      card: 'summary_large_image',
      creator: myName,
      description,
      images: {
        url: coverImageUrl
      },
      site: siteName,
      title
    }
  };
};

const getMetadataObject = (
  type: OpenGraphType,
  path: string,
  locale: LocaleKeyType,
  description: string,
  title: string,
  coverImageUrl: string,
  modifiedTime: Date,
  publishedTime: Date
): Metadata => {
  const { myName, siteName } = dictionaries[locale];
  const commonMetadata = getCommonMetadata(myName, siteName, description, title, coverImageUrl);

  return {
    ...commonMetadata,
    openGraph: {
      ...commonMetadata.openGraph,
      authors: [myName],
      modifiedTime: modifiedTime.toISOString(),
      publishedTime: publishedTime.toISOString(),
      type,
      url: `${envServer.SITE_URL}${path}`
    }
  };
};

const getNotFoundMetadataObject = (locale: LocaleKeyType, description: string, title: string, coverImageUrl: string): Metadata => {
  const { myName, siteName } = dictionaries[locale];

  return getCommonMetadata(myName, siteName, description, title, coverImageUrl);
};

export { OPENGRAPH_IMAGE_PATH, getMetadataObject, getNotFoundMetadataObject };
