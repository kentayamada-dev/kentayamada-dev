import type { JSXElementType } from '@/types/components';

const ClockIcon = (): JSXElementType => {
  return (
    <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path d='M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
    </svg>
  );
};

export { ClockIcon };
