import type { JSXElementType } from '@/types/components';

const CrossIcon = (): JSXElementType => {
  return (
    <svg className='self-center' fill='none' height='inherit' stroke='currentColor' viewBox='0 0 24 24' width='inherit'>
      <path d='M6 18 18 6M6 6l12 12' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export { CrossIcon };
