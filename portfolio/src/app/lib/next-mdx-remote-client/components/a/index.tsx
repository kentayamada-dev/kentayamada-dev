import Link from 'next/link';
import { YoutubeEmbed } from '@/components/designSystem/atoms/youtubeEmbed';
import { isDefined } from '@/typeGuards/isDefined';
import { throwColoredError } from '@/utils/throwColoredError';
import type { AType } from './types';

const isYouTubeUrl = (url: string): boolean => {
  const pattern = /^(?<temp3>https?:\/\/)?(?<temp2>www\.)?(?<temp1>youtube\.com|youtu\.be)/u;

  return pattern.test(url);
};

const getYouTubeVideoId = (url: string): string => {
  // prettier-ignore
  const videoId = (/(?:youtube\.com\/.*v=|youtu\.be\/)(?<temp1>[a-zA-Z0-9_-]{11})/u).exec(url)?.[1];

  if (isDefined(videoId)) {
    return videoId;
  }

  return throwColoredError('Unable to get YouTube video id', 'red');
};

// eslint-disable-next-line id-length
const A: AType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { children, ...rest } = props;

  if (typeof rest.href !== 'string') {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  if (isYouTubeUrl(rest.href)) {
    const videoId = getYouTubeVideoId(rest.href);

    if (isDefined(rest.title)) {
      return <YoutubeEmbed title={rest.title} videoId={videoId} />;
    }

    return throwColoredError('YouTube video title is missing', 'red');
  }

  if (rest.href.includes('#user-content-fnref-')) {
    return (
      <Link className='text-blue-500 no-underline hover:underline' href={rest.href}>
        {children}
      </Link>
    );
  }

  if (rest.href.includes('#user-content-fn-')) {
    return (
      <Link className='text-blue-500 no-underline hover:underline' href={rest.href} id={rest.id}>
        {/* eslint-disable-next-line @typescript-eslint/no-base-to-string */}
        {`[${children?.toString()}]`}
      </Link>
    );
  }

  return (
    <Link className='text-blue-500' href={rest.href} target='_blank'>
      {children}
    </Link>
  );
};

export { A };
