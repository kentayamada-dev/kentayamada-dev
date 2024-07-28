'use client';

// eslint-disable-next-line import/default, import/no-named-as-default, import/no-named-as-default-member
import Lottie from 'lottie-react';
import notFoundAnimation from './not-found.json';
import type { NotFoundAnimationType } from './types';

const NotFoundAnimation: NotFoundAnimationType = () => {
  // eslint-disable-next-line tailwindcss/no-arbitrary-value
  return <Lottie animationData={notFoundAnimation} className='h-[inherit]' loop />;
};

export { NotFoundAnimation };
