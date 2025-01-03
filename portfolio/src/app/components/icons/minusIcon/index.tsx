import type { JSXElementType } from '@/types/components';

const MinusIcon = (): JSXElementType => {
  return (
    <svg className='self-center' fill='none' height='100%' stroke='currentColor' viewBox='0 0 24 24' width='100%'>
      <path d='M5 12h14' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export { MinusIcon };
