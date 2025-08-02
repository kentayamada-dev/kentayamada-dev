'use client';

import { startTransition, useOptimistic } from 'react';
import { LikeButton } from '@/components/designSystem/molecules/likeButton';
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

  const handleLike = (): void => {
    startTransition(() => {
      setOptimisticLikes(optimisticLikes.likes + 1);
    });

    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      await props.onCountLike();
    })();
  };

  return <LikeButton likeCount={optimisticLikes.likes} locale={props.locale} onLike={handleLike} />;
};

export { LikeButtonWrapper };
