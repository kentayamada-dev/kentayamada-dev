'use client';

import { LikeButton } from '@/components/designSystem/molecules';
import { incrementCount } from '@/lib/nextjs/actions';
import type { ArticleLikeButtonType } from './types';

const ArticleLikeButton: ArticleLikeButtonType = (props) => {
  const onLike = (): void => {
    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      await incrementCount(props.likeKey);
    })();
  };

  return <LikeButton likeCount={props.likeCount} onLike={onLike} />;
};

export { ArticleLikeButton };
