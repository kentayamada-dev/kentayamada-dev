import type { JSXElementType } from '@/types/components';

// eslint-disable-next-line react/destructuring-assignment, no-restricted-syntax, react/require-default-props
const HashTagIcon = ({ isBold = false }: { readonly isBold?: boolean }): JSXElementType => {
  return (
    <svg stroke='currentColor' viewBox='0 0 24 24'>
      {/* eslint-disable-next-line no-undefined */}
      <g strokeWidth={isBold ? 3 : undefined}>
        <path d='M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5' />
      </g>
    </svg>
  );
};

export { HashTagIcon };
