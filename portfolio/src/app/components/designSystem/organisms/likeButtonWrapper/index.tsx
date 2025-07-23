'use client';

import { startTransition, useOptimistic } from 'react';
import { LikeButton } from '@/components/designSystem/molecules';
import { incrementCount } from '@/lib/nextjs/actions';
import type { LikeButtonWrapperType } from './types';

type OptimisticStateType = {
  likes: number;
};

const LikeButtonWrapper: LikeButtonWrapperType = (props) => {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic<OptimisticStateType, number>({ likes: props.likeCount }, (state, newLikes) => {
    return {
      ...state,
      likes: newLikes
    };
  });

  const onLike = (): void => {
    startTransition(() => {
      setOptimisticLikes(optimisticLikes.likes + 1);
    });

    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      await incrementCount(props.likeKey);
    })();
  };

  return <LikeButton likeCount={optimisticLikes.likes} locale={props.locale} onLike={onLike} />;
};

export { LikeButtonWrapper };
