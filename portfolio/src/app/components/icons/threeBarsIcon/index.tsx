import type { JSXElementType } from '@/types/components';

const ThreeBarsIcon = (): JSXElementType => {
  return (
    <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export { ThreeBarsIcon };
