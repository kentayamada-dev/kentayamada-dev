import type { JSXElementType } from '@/types/components';

const SunIcon = (): JSXElementType => {
  return (
    <svg className='self-center' fill='none' height='100%' stroke='currentColor' viewBox='0 0 24 24' width='100%'>
      <path
        d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export { SunIcon };
