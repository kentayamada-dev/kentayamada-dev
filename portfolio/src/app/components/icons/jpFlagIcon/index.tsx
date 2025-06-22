import type { JSXElementType } from '@/types/components';

const JpFlagIcon = (): JSXElementType => {
  return (
    <svg className='border border-gray-300 dark:border-0' viewBox='0 0 513 342'>
      <path d='M0 0h512v342H0z' fill='#FFF' />
      <circle cx='256.5' cy='171' fill='#D80027' r='96' />
    </svg>
  );
};

export { JpFlagIcon };
