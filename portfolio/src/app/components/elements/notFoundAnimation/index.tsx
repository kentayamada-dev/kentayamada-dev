'use client';

import dynamic from 'next/dynamic';
import notFoundAnimation from './not-found.json';
import type { NotFoundAnimationType } from './types';

const Lottie = dynamic(async () => {
  // eslint-disable-next-line import/dynamic-import-chunkname
  return import('lottie-react');
});

const NotFoundAnimation: NotFoundAnimationType = () => {
  return <Lottie animationData={notFoundAnimation} className='h-[inherit]' loop />;
};

export { NotFoundAnimation };
