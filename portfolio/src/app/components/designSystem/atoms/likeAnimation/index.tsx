'use client';

import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
import likeAnimation from './like.json';
import type { LottieRefCurrentProps } from 'lottie-react';

const Lottie = dynamic(
  async () => {
    return import('lottie-react');
  },
  {
    ssr: false
  }
);

const LikeAnimation = forwardRef<LottieRefCurrentProps>((_, ref) => {
  // @ts-expect-error type error
  return <Lottie animationData={likeAnimation} autoplay loop={false} lottieRef={ref} />;
});

LikeAnimation.displayName = 'LikeAnimation';

export { LikeAnimation };
