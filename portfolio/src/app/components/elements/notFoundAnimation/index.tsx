'use client';

import Lottie from 'lottie-react';
import notFoundAnimation from './not-found.json';
import type { NotFoundAnimationType } from './types';

const NotFoundAnimation: NotFoundAnimationType = () => {
  return <Lottie animationData={notFoundAnimation} className='h-[inherit]' loop />;
};

export { NotFoundAnimation };
