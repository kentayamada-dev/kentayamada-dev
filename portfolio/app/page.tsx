import Link from 'next/link';
import type { JSXElementType } from '@/types/components';

function Page(): JSXElementType {
  return (
    <>
      <h1 className='text-center text-5xl text-yellow-500 sm:text-red-700 md:text-blue-600'>
        Rapidly build modern websites without ever leaving your HTML.
        人類社会のすべての構成員の固有の尊厳と平等で譲ることのできない権利とを承認することは
      </h1>
      <p className='mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600 dark:text-slate-400'>
        A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be
        composed to build any design, directly in your markup. A utility-first CSS framework packed with classes like
        flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. A
        utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed
        to build any design, directly in your markup. A utility-first CSS framework packed with classes like flex, pt-4,
        A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be
        composed to build any design, directly in your markup. A utility-first CSS framework packed with classes like
        flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. A
        utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed
        to build any design, directly in your markup. A utility-first CSS framework packed with classes like flex, pt-4,
        A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be
        composed to build any design, directly in your markup. A utility-first CSS framework packed with classes like
        flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. A
        utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed
        to build any design, directly in your markup. A utility-first CSS framework packed with classes like flex, pt-4,
      </p>
      <Link href='/dashboard' prefetch>
        Go to Dashboard
      </Link>
    </>
  );
}

export { Page as default };
