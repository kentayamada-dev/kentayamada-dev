'use client';

import NumberFlow from '@number-flow/react';
import { useRef, useState } from 'react';
import { LikeAnimation } from '@/components/designSystem/atoms';
import { dictionaries } from '@/constants/i18n';
import type { LottieRefCurrentProps } from 'lottie-react';
import type { ComponentPropsWithoutRef } from 'react';
import type { LikeButtonType } from './types';

const LikeButton: LikeButtonType = (props) => {
  const { likeLabel } = dictionaries[props.locale].labels;
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick: ComponentPropsWithoutRef<'button'>['onClick'] = () => {
    if (isDisabled || !lottieRef.current) {
      return;
    }

    lottieRef.current.stop();
    lottieRef.current.play();

    const animationDurationSec = lottieRef.current.getDuration(false) ?? 1;

    setIsDisabled(true);

    props.onLike();

    setTimeout(() => {
      setIsDisabled(false);
    }, animationDurationSec * 1000);
  };

  return (
    <div className='flex items-center gap-3'>
      <button
        aria-label={likeLabel}
        className='bg-primary cursor-pointer items-center justify-center rounded-full disabled:cursor-not-allowed'
        disabled={isDisabled}
        onClick={handleClick}
        title={likeLabel}
        type='button'
      >
        <div className='size-14'>
          <LikeAnimation ref={lottieRef} />
        </div>
      </button>
      <NumberFlow
        className='text-secondary text-lg'
        format={{ maximumFractionDigits: 1, notation: 'compact' }}
        locales={props.locale}
        respectMotionPreference
        value={props.likeCount}
      />
    </div>
  );
};

export { LikeButton };
