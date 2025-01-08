import Link from 'next/link';
import { YoutubeEmbed } from '@/components/elements';
import { isString } from '@/typeGuards';
import { getYouTubeVideoId } from '@/utils';
import type { AType } from './types';

// eslint-disable-next-line id-length
const A: AType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { children, ...rest } = props;

  if (!isString(rest.href)) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  const videoId = getYouTubeVideoId(rest.href);

  if (videoId) {
    return <YoutubeEmbed videoId={videoId} />;
  }

  if (rest.href.includes('#user-content-fnref-')) {
    return (
      <Link className='text-sky-500 no-underline hover:underline' href={rest.href}>
        {children}
      </Link>
    );
  }

  if (rest.href.includes('#user-content-fn-')) {
    return (
      <Link className='text-sky-500 no-underline hover:underline' href={rest.href} id={rest.id}>
        {/* eslint-disable-next-line @typescript-eslint/no-base-to-string */}
        {`[${children?.toString()}]`}
      </Link>
    );
  }

  return (
    <Link className='text-sky-500' href={rest.href} target='_blank'>
      {children}
    </Link>
  );
};

export { A };
