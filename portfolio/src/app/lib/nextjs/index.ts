import { dictionaries } from '@/constants/i18n';
import type { Metadata } from 'next';
import type { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types';
import type { LocaleKeyType } from '@/constants/i18n/types';

const getMetadataObject = (
  type: OpenGraphType,
  path: string,
  lang: LocaleKeyType,
  description: string,
  title: string,
  coverImage: {
    alt: string;
    url: string;
  },
  modifiedTime: Date,
  publishedTime: Date
): Metadata => {
  const dict = dictionaries[lang];

  return {
    description,
    openGraph: {
      authors: [dict.myName],
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
      modifiedTime: modifiedTime.toISOString(),
      publishedTime: publishedTime.toISOString(),
      siteName: dict.siteName,
      title,
      type,
      url: `${lang}/${path}`
    },
    title,
    twitter: {
      card: 'summary_large_image',
      creator: dict.myName,
      description,
      images: {
        alt: coverImage.alt,
        url: coverImage.url
      },
      site: dict.siteName,
      title
    }
  };
};

const getNotFoundMetadataObject = (
  lang: LocaleKeyType,
  description: string,
  title: string,
  coverImage: {
    alt: string;
    url: string;
  }
): Metadata => {
  const dict = dictionaries[lang];

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
      siteName: dict.siteName,
      title,
      type: 'website'
    },
    title,
    twitter: {
      card: 'summary_large_image',
      creator: dict.myName,
      description,
      images: {
        alt: coverImage.alt,
        url: coverImage.url
      },
      site: dict.siteName,
      title
    }
  };
};

export { getMetadataObject, getNotFoundMetadataObject };
