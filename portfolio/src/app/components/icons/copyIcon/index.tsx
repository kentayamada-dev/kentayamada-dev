import type { JSXElementType } from '@/types/components';

const CopyIcon = (): JSXElementType => {
  return (
    <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <rect height='14' rx='2' ry='2' width='14' x='8' y='8' />
      <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
    </svg>
  );
};

export { CopyIcon };
