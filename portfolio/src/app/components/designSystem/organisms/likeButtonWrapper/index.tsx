'use client';

import { LikeButton } from '@/components/designSystem/molecules';
import { incrementCount } from '@/lib/nextjs/actions';
import type { LikeButtonWrapperType } from './types';

const LikeButtonWrapper: LikeButtonWrapperType = (props) => {
  const onLike = (): void => {
    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      await incrementCount(props.likeKey);
    })();
  };

  return <LikeButton likeCount={props.likeCount} locale={props.locale} onLike={onLike} />;
};

export { LikeButtonWrapper };
