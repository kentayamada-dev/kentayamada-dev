import type { JSXElementType } from '@/types/components';

const ChevronDownIcon = (): JSXElementType => {
  return (
    <svg className='self-center' fill='none' height='100%' stroke='currentColor' viewBox='0 0 24 24' width='100%'>
      <path d='m19.5 8.25-7.5 7.5-7.5-7.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export { ChevronDownIcon };
