import { envServer } from '@/constants/env';
import { dictionaries } from '@/constants/i18n';
import type { Metadata } from 'next';
import type { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types';
import type { LocaleKeyType } from '@/constants/i18n/types';

const getCommonMetadata = (
  myName: string,
  siteName: string,
  description: string,
  title: string,
  coverImage: { alt: string; url: string }
): Metadata => {
  return {
    description,
    openGraph: {
      description,
      images: [
        {
          alt: coverImage.alt,
          height: 630,
          secureUrl: coverImage.url,
          url: coverImage.url,
          width: 1200
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
        alt: coverImage.alt,
        url: coverImage.url
      },
      site: siteName,
      title
    }
  };
};

const getTitle = (title: string, myName: string, enableAutoTitlePrefix = true): string => {
  return enableAutoTitlePrefix ? `${title} / ${myName}` : title;
};

const getMetadataObject = (
  type: OpenGraphType,
  path: string,
  locale: LocaleKeyType,
  description: string,
  title: string,
  coverImage: {
    alt: string;
    url: string;
  },
  modifiedTime: Date,
  publishedTime: Date,
  enableAutoTitlePrefix = true
): Metadata => {
  const dict = dictionaries[locale];
  const commonMetadata = getCommonMetadata(dict.myName, dict.siteName, description, getTitle(title, dict.myName, enableAutoTitlePrefix), coverImage);

  return {
    ...commonMetadata,
    openGraph: {
      ...commonMetadata.openGraph,
      authors: [dictionaries[locale].myName],
      modifiedTime: modifiedTime.toISOString(),
      publishedTime: publishedTime.toISOString(),
      type,
      url: `${envServer.SITE_URL}/${locale}${path}`
    }
  };
};

const getNotFoundMetadataObject = (
  locale: LocaleKeyType,
  description: string,
  title: string,
  coverImage: {
    alt: string;
    url: string;
  }
): Metadata => {
  const dict = dictionaries[locale];

  return getCommonMetadata(dict.myName, dict.siteName, description, getTitle(title, dict.myName), coverImage);
};

export { getMetadataObject, getNotFoundMetadataObject };
