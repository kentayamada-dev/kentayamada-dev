import type { JSXElementType } from '@/types/components';

const CodeWrapIcon = (): JSXElementType => {
  return (
    <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <line x1='3' x2='21' y1='6' y2='6' />
      <path d='M3 12h15a3 3 0 1 1 0 6h-4' />
      <polyline points='16 16 14 18 16 20' />
      <line x1='3' x2='10' y1='18' y2='18' />
    </svg>
  );
};

export { CodeWrapIcon };
