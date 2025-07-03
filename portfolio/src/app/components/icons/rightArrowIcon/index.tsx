import type { JSXElementType } from '@/types/components';

const RightArrowIcon = (): JSXElementType => {
  return (
    <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' strokeWidth={3} />
    </svg>
  );
};

export { RightArrowIcon };
