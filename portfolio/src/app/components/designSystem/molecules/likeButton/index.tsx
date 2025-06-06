'use client';

import { useRef, useState } from 'react';
import { LikeAnimation } from '@/components/designSystem/atoms';
import { formatNumber } from '@/utils';
import type { LottieRefCurrentProps } from 'lottie-react';
import type { ComponentPropsWithoutRef } from 'react';
import type { LikeButtonType } from './types';

const LikeButton: LikeButtonType = (props) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick: ComponentPropsWithoutRef<'button'>['onClick'] = () => {
    if (isDisabled || !lottieRef.current) {
      return;
    }

    lottieRef.current.stop();
    lottieRef.current.play();

    const animationDurationSec = lottieRef.current.getDuration(false) ?? 1;

    setIsDisabled(true);

    props.onLike();

    timeoutIdRef.current = setTimeout(() => {
      setIsDisabled(false);
    }, animationDurationSec * 1000);

    // eslint-disable-next-line @typescript-eslint/consistent-return
    return (): void => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  };

  return (
    <button
      className='bg-primary flex w-fit cursor-pointer items-center justify-center rounded-full py-2 pr-6 pl-3 disabled:cursor-not-allowed'
      disabled={isDisabled}
      onClick={handleClick}
      type='button'
    >
      <div className='size-10'>
        <LikeAnimation ref={lottieRef} />
      </div>
      <span className='text-secondary'>{formatNumber(props.likeCount, props.locale)}</span>
    </button>
  );
};

export { LikeButton };
