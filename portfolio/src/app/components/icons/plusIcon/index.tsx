import type { JSXElementType } from '@/types/components';

const PlusIcon = (): JSXElementType => {
  return (
    <svg className='self-center' fill='none' height='100%' stroke='currentColor' viewBox='0 0 24 24' width='100%'>
      <path d='M12 4.5v15m7.5-7.5h-15' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export { PlusIcon };
